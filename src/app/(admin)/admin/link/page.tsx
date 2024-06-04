import { nextGetServerSession } from "@/lib/next-auth";
import { LinkWithCountAndUser } from "@/types/entityRelations";
import { findAllLinks } from "@/utils/database/linkShortener.query.ts";
import { PaginatedResult } from "@/utils/paginator";

import LinkForm from "./_components/LinkForm";
import Links from "./_components/Links";
import PageNav from "./_components/part/PageNav";

export default async function Shortener({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const session = await nextGetServerSession();
  const { user } = session!;
  const links = (await findAllLinks(
    {
      user_id: user?.role == "SuperAdmin" ? undefined : user?.id,
    },
    parseInt(searchParams.page ?? "1"),
  )) as PaginatedResult<LinkWithCountAndUser>;

  return (
    <>
      <LinkForm />
      <div className="flex flex-col gap-5 mt-8">
        <Links links={links.data} />
        <PageNav
          currentPage={links.meta.currentPage}
          totalPage={links.meta.lastPage}
        />
      </div>
    </>
  );
}
