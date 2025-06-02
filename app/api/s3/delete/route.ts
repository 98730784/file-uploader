import { NextRequest } from "next/server";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { S3 } from "@/lib/s3-client";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { z } from "zod";

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const key = body.get("key");
    if (!key) {
      return new Response("Key is required", { status: 400 });
    }

    const deleteCommand = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: key,
    });
    await S3.send(deleteCommand);
    return new Response("File deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting file:", error);
    return new Response("Failed to delete file", { status: 500 });
  }
}
