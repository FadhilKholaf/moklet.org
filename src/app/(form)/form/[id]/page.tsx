import { Metadata } from "next";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect, RedirectType, notFound } from "next/navigation";
import React from "react";

import { H2, P } from "@/app/_components/global/Text";
import { nextGetServerSession } from "@/lib/next-auth";
import { findForm } from "@/utils/database/form.query";
import { findSubmission } from "@/utils/database/submission.query";

import ForbiddenForm from "../_components/ForbiddenForm";
import Form from "../_components/Form";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const form = await findForm({ id: params.id });

  return {
    title: form?.title ?? "Not Found",
    description: form?.description,
  };
}

const page = async ({ params }: Props) => {
  const session = await nextGetServerSession();
  const headersList = headers();
  const userAgent = headersList.get("User-Agent");

  if (userAgent?.toLocaleLowerCase()?.includes("whatsapp")) return <></>;
  if (!session)
    return redirect(
      "/api/auth/signin?callbackUrl=/form/" + params.id,
      RedirectType.replace,
    );

  const form = await findForm({ id: params.id });

  if (!form) return notFound();
  if (!form.is_open) return <ForbiddenForm />;
  if (
    (form.open_at && new Date(form.open_at).getTime() > new Date().getTime()) ||
    (form.close_at && new Date(form.close_at).getTime() < new Date().getTime())
  )
    return <ForbiddenForm />;

  if (form.submit_once) {
    const submission = await findSubmission({
      user_id: session.user?.id,
      form_id: params.id,
    });
    if (submission && form.allow_edit)
      return redirect(params.id + "/" + submission?.id);
    else if (submission)
      return <ForbiddenForm message="Anda sudah menjawab formulir ini." />;
  }

  return (
    <div className="items-start justify-between mx-auto max-w-[90vw] w-[640px] bg-white rounded-md">
      <div className="w-full p-6 border-b border-black box-border">
        <H2>{form.title}</H2>
        <P>{form.description}</P>
        <P className="mt-4 font-medium">{session.user?.name}</P>{" "}
        <Link
          className="hover:cursor-pointer text-info-500 hover:text-info-700 transition-all"
          href={"/api/auth/signout?callbackUrl=/form/" + params.id}
        >
          Ganti akun
        </Link>
        <P className="text-red-500 text-sm mt-4">
          * Menunjukkan pertanyaan yang wajib diisi
        </P>
      </div>
      <Form form={form} a={session.user?.id as string} b={params.id} />
    </div>
  );
};

export default page;
