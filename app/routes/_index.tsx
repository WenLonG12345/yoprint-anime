import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { debounce } from "@/utils/debounce";
import AnimeCardList from "@/components/AnimeCardList";
import { useSearchParams } from "react-router";

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
    if (searchParams?.get("q") !== searchValue) {
      setSearchValue(searchParams?.get("q") ?? "");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 bg-indigo-800 z-10 shadow-sm">
        <header className="py-4 container mx-auto">
          <h1 className="text-3xl font-bold text-white mb-4">YoPrint Anime</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Search anime..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[1px] focus:ring-gray-600 placeholder:text-white text-white"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
            {searchValue && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchValue("")}
                aria-label="Clear search"
              >
                <X size={24} />
              </button>
            )}
          </div>
        </header>
      </div>
      <AnimeCardList searchValue={debouncedSearchValue} />
    </div>
  );
}
