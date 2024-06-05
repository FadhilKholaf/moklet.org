"use client";

import { Submission_Field } from "@prisma/client";
import { useRouter } from "next-nprogress-bar";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";

import { submitForm } from "@/actions/formAspirasi";
import { PrimaryButton } from "@/app/_components/global/Button";
import {
  CheckboxField,
  RadioField,
  TextArea,
  TextField,
} from "@/app/_components/global/Input";
import { FormWithFields } from "@/types/entityRelations";
import { formToJSON } from "@/utils/atomics";

type FormProps = {
  form: FormWithFields;
  a: string;
  b: string;
  answers?: Submission_Field[];
};

export default function Form({ form, a, b, answers }: FormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const form = document.querySelector("#formApp");
    const checkboxes = form?.querySelectorAll(
      "input[type=checkbox][data-required=true]",
    );
    const checkboxLength = checkboxes?.length || 0;
    const firstCheckbox = checkboxLength > 0 ? checkboxes?.[0] : null;

    function init() {
      if (firstCheckbox) {
        for (let i = 0; i < checkboxLength; i++) {
          checkboxes?.[i].addEventListener("change", checkValidity);
        }

        checkValidity();
      }
    }

    function isChecked() {
      for (let i = 0; i < checkboxLength; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((checkboxes?.[i] as any).checked) return true;
      }

      return false;
    }

    function checkValidity() {
      const errorMessage = !isChecked()
        ? "At least one checkbox must be selected."
        : "";
      (firstCheckbox as HTMLInputElement).setCustomValidity(errorMessage);
    }

    init();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const toastId = toast.loading("Loading...");
    setLoading(true);
    try {
      const jsonForm = formToJSON(e.target as HTMLFormElement);
      const arrayAnswers = Object.entries(jsonForm).flatMap(([key, value]) => {
        return typeof value == "object"
          ? value.map((item) => ({ name: key, value: item }))
          : [{ name: key, value: value }];
      });

      const submission = await submitForm(
        a,
        b,
        arrayAnswers,
        answers?.[0].submission_id,
      );
      if (submission.success) {
        toast.success("Jawaban terkirim!", {
          id: toastId,
        });
        router.push(`/form/${b}/alreadysubmit`);
      } else
        toast.error("Terjadi kesalahan", {
          id: toastId,
        });
    } catch (e) {
      setLoading(false);
      toast.error((e as Error).message, {
        id: toastId,
      });
    }
  }

  return (
    <form className="block mx-auto p-6" onSubmit={handleSubmit} id="formApp">
      {form.fields &&
        form.fields.map((field) => (
          <div key={field.id}>
            {["email", "text", "password", "number"].includes(field.type) && (
              <TextField
                type={field.type as string}
                label={field.label}
                name={field.id.toString()}
                placeholder={"Jawaban Anda"}
                className="mb-6 w-full"
                required={field.required}
                value={
                  answers?.find((item) => item.field_id == field.id)?.value
                }
              />
            )}
            {field.type === "longtext" && (
              <TextArea
                label={field.label}
                name={field.id.toString()}
                placeholder={"Jawaban Anda"}
                className="mb-6 w-full"
                required={field.required}
                value={
                  answers?.find((item) => item.field_id == field.id)?.value
                }
              />
            )}
            {field.type === "radio" && (
              <RadioField
                label={field.label}
                name={field.id.toString()}
                options={field.options.map((item) => ({
                  id: item.field_id + "_" + item.id,
                  value: item.value,
                }))}
                className="mb-6 w-full"
                required={field.required}
                value={
                  answers?.find((item) => item.field_id === field.id)?.value
                }
              />
            )}
            {field.type === "checkbox" && (
              <CheckboxField
                label={field.label}
                name={field.id.toString()}
                options={field.options.map((item) => ({
                  id: item.field_id + "_" + item.id,
                  value: item.value,
                }))}
                className="mb-6 w-full"
                required={field.required}
                value={
                  answers?.find((item) => item.field_id == field.id)?.value
                }
              />
            )}
          </div>
        ))}
      <div className="flex justify-between">
        <PrimaryButton type="submit" isDisabled={loading}>
          Kirim
        </PrimaryButton>
        <button
          type="reset"
          className="cursor-pointer text-neutral-500 hover:text-primary-500 transition-all"
        >
          Hapus jawaban
        </button>
      </div>
    </form>
  );
}
