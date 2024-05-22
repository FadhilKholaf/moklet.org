"use client";
import { toast } from "sonner";
import { upload } from "../../action";
import FormButton from "./SubmitButton";
import { Dispatch, SetStateAction } from "react";

export default function Form({
  setIsOpenModal,
}: {
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <form
      action={async (formdata: FormData) => {
        const toastId = toast.loading("Loading...");
        const result = await upload(formdata);
        if (result.error) {
          return toast.error(result.message, { id: toastId });
        }
        toast.success(result.message, { id: toastId });
        navigator.clipboard.writeText(`![](${result.url!})`);
        setIsOpenModal(false);
      }}
    >
      <div className="p-4 md:p-5 space-y-4">
        <input
          type="file"
          accept="image/*"
          className="border border-dotted rounded-lg border-neutral-500 py-3 px-4"
          name="image"
          required={true}
        />
      </div>
      <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b justify-end">
        <FormButton />
      </div>
    </form>
  );
}
