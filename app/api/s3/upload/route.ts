import { NextResponse } from "next/server";
import { z } from "zod";
import { v4 as uuid4 } from "uuid";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/s3-client";

const uploadFileSschema = z.object({
  fileName: z.string(),
  contentType: z.string(),
  size: z.number(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedBody = uploadFileSschema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { fileName, contentType, size } = parsedBody.data;
    const fileKey = `${uuid4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileKey,
      ContentType: contentType,
      ContentLength: size,
    });

    const presinedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // 6 min
    });

    const response = {
      presinedUrl,
      key: fileKey,
    };
    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
