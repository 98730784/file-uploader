"use client";
import { useDropzone, FileRejection } from "react-dropzone";
import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useState } from "react";
import { toNamespacedPath } from "path";

export type FileUpload = {
  id: string;
  file: File;
  uploading: boolean;
  progress: number;
  key: string;
  isDeleted: boolean;
  error: boolean;
  objectUrl?: string;
};
export function Uploader() {
  const [files, setFiles] = useState<Array<FileUpload>>([]);
  const onDrop = useCallback((files: File[]) => {
    setFiles((prevFiles) => [
      ...prevFiles,
      ...files.map((file) => ({
        id: crypto.randomUUID(),
        file,
        uploading: false,
        progress: 0,
        key: "",
        isDeleted: false,
        error: false,
        objectUrl: URL.createObjectURL(file),
      })),
    ]);

    files.forEach(uploadFile);
  }, []);

  const onDropRejection = useCallback((Rejectedfiles: FileRejection[]) => {
    if (Rejectedfiles.length > 0) {
      const tooManyFiles = Rejectedfiles.find(
        (fileRej) => fileRej.errors[0].code === "too-many-files"
      );

      const fileTooLarge = Rejectedfiles.find(
        (fileRej) => fileRej.errors[0].code === "file-too-large"
      );

      if (tooManyFiles) {
        toast.error(`You can only upload a maximum of 5 files at a time.`);
      }
      if (fileTooLarge) {
        toast.error(
          `The file ${fileTooLarge.file.name} is too large. Maximum size is 10 MB.`
        );
      }
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected: onDropRejection,
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10 MB
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
  });

  const uploadFile = async (file: File) => {
    setFiles((prevFiles) =>
      prevFiles.map((f) => (f.file === file ? { ...f, uploading: true } : f))
    );

    try {
      const presignedUrlResponse = await fetch("/api/s3/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          size: file.size,
        }),
      });
      if (!presignedUrlResponse.ok) {
        toast.error(
          `Failed to get presigned URL for ${file.name}. Please try again.`
        );
        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            f.file === file
              ? { ...f, uploading: false, progress: 0, error: true }
              : f
          )
        );
        return;
      }

      const { presinedUrl, key } = await presignedUrlResponse.json();
      await new Promise<void>((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentage = (event.loaded / event.total) * 100;
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file === file
                  ? { ...f, progress: Math.round(percentage), key: key }
                  : f
              )
            );
          }
        };
        xhr.onload = () => {
          if (xhr.status === 200 || xhr.status === 204) {
            setFiles((prevFiles) =>
              prevFiles.map((f) =>
                f.file === file
                  ? { ...f, progress: 100, uploading: false, error: false }
                  : f
              )
            );
            toast.success(`File ${file.name} uploaded successfully.`);
            resolve();
          } else {
            reject(
              new Error(
                `Failed to upload file ${file.name}. Status: ${xhr.status}`
              )
            );
          }
        };

        xhr.onerror = () => {
          reject(new Error(`Network error while uploading file ${file.name}.`));
        };
        xhr.open("PUT", presinedUrl);
        xhr.setRequestHeader("Content-Type", file.type);
        xhr.send(file);
      });
    } catch (error) {
      toast.error(
        `Error uploading file ${file.name}: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          f.file === file
            ? { ...f, uploading: false, progress: 0, error: true }
            : f
        )
      );
    }
  };

  return (
    <>
      <Card
        {...getRootProps()}
        className={cn(
          `relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64`,
          isDragActive
            ? "border-primary bg-primary/10 border-solid"
            : "border-border hover:border-primary"
        )}
      >
        <CardContent className="flex flex-col items-center justify-center h-full w-full">
          <input {...getInputProps()} />
          {isDragActive ? (
            <p className="text-blue-600">Drop the files here ...</p>
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full gap-y-3">
              <p className="text-center">
                Drag 'n' drop some files here, or click to select files
              </p>
              <Button>Select files</Button>
            </div>
          )}
        </CardContent>
      </Card>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 mt-6">
        {files.map((file) => (
          <Card key={file.id} className="relative">
            <CardContent className="flex flex-col items-center justify-center h-full w-full">
              <img
                src={file.objectUrl}
                alt={file.file.name}
                className="w-full h-32 object-cover"
              />
              <p className="text-sm mt-2">{file.file.name}</p>
              {file.uploading && (
                <div className="w-full mt-2">
                  <div
                    className="bg-blue-500 h-1 rounded"
                    style={{ width: `${file.progress}%` }}
                  ></div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
