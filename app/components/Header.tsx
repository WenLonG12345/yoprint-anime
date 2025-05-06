import React from "react";
import { X } from "lucide-react";

interface IHeader {
  searchValue?: string;
  setSearchValue?: React.Dispatch<React.SetStateAction<string>>;
  showSearch?: boolean;
}

const Header: React.FC<IHeader> = ({
  searchValue,
  setSearchValue,
  showSearch = false,
}) => {
  return (
    <div className="sticky top-0 bg-indigo-800 z-10 shadow-sm px-2 md:px-0">
      <header className="py-4 container mx-auto">
        <h1 className="text-3xl font-bold text-white">YoPrint Anime</h1>
        {showSearch && (
          <div className="relative mt-4">
            <input
              type="text"
              placeholder="Search anime..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-[1px] focus:ring-gray-600 placeholder:text-white text-white"
              value={searchValue}
              onChange={(e) => {
                setSearchValue && setSearchValue(e.target.value);
              }}
            />
            {searchValue && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setSearchValue && setSearchValue("")}
                aria-label="Clear search"
              >
                <X size={24} color="white" />
              </button>
            )}
          </div>
        )}
      </header>
    </div>
  );
};

export default Header;
