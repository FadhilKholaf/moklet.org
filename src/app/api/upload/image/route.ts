import { NextRequest } from "next/server";

import { imageUploader } from "@/actions/fileUploader";
import { nextGetServerSession } from "@/lib/next-auth";
import {
  badRequest,
  created,
  internalServerError,
  unauthorized,
} from "@/utils/apiResponse";

export async function POST(req: NextRequest) {
  const session = await nextGetServerSession();
  if (!session) return unauthorized();

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return badRequest([
        {
          message: "file is required",
        },
      ]);
    }

    const fileArrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(new Uint8Array(fileArrayBuffer));

    const uploader = await imageUploader(fileBuffer);

    if (!uploader || uploader.error) {
      if (uploader.message.includes("not allowed"))
        return badRequest([uploader]);
      return internalServerError([]);
    }
    return created(uploader.data, uploader.message);
  } catch (error) {
    return internalServerError([]);
  }
}
