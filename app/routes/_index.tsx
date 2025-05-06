import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { debounce } from "@/utils/debounce";
import AnimeCardList from "@/components/AnimeCardList";
import { useSearchParams } from "react-router";
import Header from "@/components/Header";

export function meta({}) {
  return [
    { title: "YoPrint Anime" },
    { name: "description", content: "YoPrint Anime Demo" },
  ];
}

export default function Home() {
  const [searchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = debounce(searchValue, 250);

  useEffect(() => {
    if (searchParams?.get("q")) {
      setSearchValue(searchParams?.get("q") ?? "");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <Header
        showSearch
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <AnimeCardList searchValue={debouncedSearchValue} />
    </div>
  );
}
