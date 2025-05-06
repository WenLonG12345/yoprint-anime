import React from "react";
import type { Anime } from "@/types/anime";
import clsx from "clsx";

interface IAnimeCard {
  anime?: Anime;
  isLoading?: boolean;
}

const AnimeCard: React.FC<IAnimeCard> = ({ anime, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="bg-gray-200 h-48 rounded-lg animate-pulse"></div>
        <div className="p-4">
          <div className="bg-gray-200 h-6 w-3/4 rounded-md animate-pulse"></div>
          <div className="bg-gray-200 h-4 w-1/2 mt-2 rounded-md animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!anime) return null;

  return (
    <div
      className={clsx(
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      )}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={anime.images?.jpg?.image_url || "/placeholder.jpg"}
          alt={anime.title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
          {anime.title}
        </h3>
        <p className="text-sm text-gray-600 font-medium">
          {anime.title_japanese}
        </p>
      </div>
    </div>
  );
};

export default AnimeCard;
