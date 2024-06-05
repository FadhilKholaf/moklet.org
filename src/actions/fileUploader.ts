"use server";

import { UploadApiResponse } from "cloudinary";

import cloudinary from "@/lib/cloudinary";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function imageUploader(file: Buffer | any) {
  try {
    const upload: UploadApiResponse | undefined = await new Promise(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { upload_preset: "blog_content" },
            (error, uploadResult) => {
              if (error) reject(error);
              return resolve(uploadResult);
            },
          )
          .end(file?.data ? file.data : file);
      },
    );

    if (!upload) return { error: true, message: "Terjadi kesalahan" };

    const data = {
      format: upload.format,
      url: upload.secure_url,
    };

    return { error: false, message: "Upload sukses", data };
  } catch (e) {
    console.error(e);
    const error = e as Error;
    return {
      error: true,
      message: error.message.includes("not allowed")
        ? error.message
        : "Terjadi kesalahan",
    };
  }
}
