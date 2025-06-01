"use client";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
export function Uploader() {
  const onDrop = useCallback((files: File[]) => {
    console.log(files);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <Card
      {...getRootProps()}
      className={cn(
        `relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64`
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
  );
}
