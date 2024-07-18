"use client";

import { aspirationType, submitAspiration } from "@/actions/aspirasi";
import Editor from "@/app/(admin)/admin/components/MdEditor";
import { TextField } from "@/app/_components/global/Input";
import SubmitButton from "@/app/_components/global/SubmitButton";
import { H3 } from "@/app/_components/global/Text";
import { SectionWrapper } from "@/app/_components/global/Wrapper";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AspirationForm({
  recipient,
  session,
  type,
  eventName,
}: {
  recipient: string;
  session: Session;
  type: aspirationType;
  eventName: string;
}) {
  const [aspiration, setAspiration] = useState<string>("");
  const ref = useRef<HTMLFormElement>(null);
  async function submitForm(data: FormData) {
    const toastId = toast.loading("Mengirim Aspirasi...");
    const result = await submitAspiration(
      data,
      session.user?.id!,
      aspiration,
      type,
      recipient,
    );

    if (!result.success) {
      return toast.error(result.message, { id: toastId });
    }
    ref.current?.reset();
    setAspiration("");
    return toast.success(result.message, { id: toastId });
  }

  return (
    <div id="form" className="mt-2">
      {recipient && type && (
        <>
          <H3>
            Tuliskan aspirasimu untuk {type !== "EVENT" ? recipient : eventName}
          </H3>
          <form action={submitForm} ref={ref} className="mt-4">
            <div className="flex flex-col gap-5 mb-5">
              <TextField
                type="text"
                name="judulAspirasi"
                required
                label="Judul Aspirasi"
                placeholder="Organisasi X Kinerjanya Kurang"
              />
              <Editor
                onChange={(e) => {
                  setAspiration(e || "");
                }}
                value={aspiration}
                label="Isi Aspirasi"
              />
            </div>
            <div className="w-full flex justify-end">
              <SubmitButton />
            </div>
          </form>
        </>
      )}
    </div>
  );
}
