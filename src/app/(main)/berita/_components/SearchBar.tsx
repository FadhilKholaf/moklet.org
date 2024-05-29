"use client";

import { TextField } from "@/app/_components/global/Input";
import { SmallSectionWrapper } from "@/app/_components/global/Wrapper";
import { useRouter } from "next-nprogress-bar";
import { useState } from "react";
import Search from "./icons/Search";
import { SearchButton, SmallSearchButton } from "./parts/Button";

export function SearchBar({ query: q }: Readonly<{ query?: string }>) {
  const router = useRouter();
  const [query, setQuery] = useState<string>(q ?? "");

  function handleSearch(query: string) {
    setQuery(query);
  }

  return (
    <SmallSectionWrapper id="SearchBar">
      <div className="flex gap-[12px] items-center justify-between w-full mt-[30px] lg:mt-0">
        <TextField
          placeholder="Cari berita di moklet.org..."
          className="w-[90%]"
          value={query}
          handleChange={(e) => {
            handleSearch(e.target.value);
          }}
          type={""}
          name={""}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/berita/search?q=${query}`);
            }
          }}
        />
        <SmallSearchButton
          onClick={() => {
            router.push(`/berita/search?q=${query}`);
          }}
        >
          <Search />
        </SmallSearchButton>
        <SearchButton
          onClick={() => {
            router.push(`/berita/search?q=${query}`);
          }}
        >
          Cari berita
        </SearchButton>
      </div>
    </SmallSectionWrapper>
  );
}
