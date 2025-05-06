import { getAllAnime } from "@/services/api/anime";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import AnimeCard from "./AnimeCard";

interface IRelatedAnimeList {
  animeId?: string;
}

const RelatedAnimeList: React.FC<IRelatedAnimeList> = ({ animeId }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const listQuery = useQuery({
    queryKey: [
      "animeList",
      searchParams?.get("q"),
      searchParams?.get("page"),
      searchParams?.get("limit"),
    ],
    queryFn: async () => {
      return await getAllAnime({
        q: searchParams?.get("q") ?? undefined,
        page: parseInt(searchParams?.get("page") ?? "1"),
        limit: parseInt(searchParams?.get("limit") ?? "10"),
      });
    },
    select: (res) => {
      if (!animeId) return res?.data;
      const filteredData = res?.data?.filter((anime) => {
        return anime.mal_id !== parseInt(animeId);
      });

      return filteredData;
    },
  });

  return (
    <div className="mt-5">
      <div className="font-bold text-2xl">You May Also Like</div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {listQuery?.isLoading
          ? Array(4)
              .fill(null)
              .map((_, index) => <AnimeCard key={index} isLoading />)
          : listQuery?.data
              ?.slice(0, 4)
              ?.map((item) => (
                <AnimeCard
                  key={item.mal_id}
                  anime={item}
                  onClick={() => navigate(`/${item.mal_id}`)}
                />
              ))}
      </div>
    </div>
  );
};

export default RelatedAnimeList;
