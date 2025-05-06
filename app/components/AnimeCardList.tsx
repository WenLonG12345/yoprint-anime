import { getAllAnime } from "@/services/api/anime";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import AnimeCard from "./AnimeCard";
import { useNavigate, useSearchParams } from "react-router";
import Container from "./Container";
import Pagination from "./Pagination";

interface IAnimeCardList {
  searchValue: string;
}

const AnimeCardList: React.FC<IAnimeCardList> = ({ searchValue }) => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
    limit: "10",
  });
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
  });

  useEffect(() => {
    searchParams.set("q", searchValue);
    setSearchParams(searchParams);
  }, [searchValue]);

  const renderContent = () => {
    if (listQuery.isLoading) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          {Array(8)
            .fill(null)
            .map((_, index) => (
              <AnimeCard key={index} isLoading />
            ))}
        </div>
      );
    }

    if (listQuery.isError || listQuery.data?.data?.length === 0) {
      return (
        <div className="flex items-center justify-center mt-5">
          No anime found at this moment
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
        {listQuery.data?.data?.map((item) => (
          <AnimeCard
            key={item.mal_id}
            anime={item}
            onClick={() => navigate(`/${item.mal_id}`)}
          />
        ))}
      </div>
    );
  };

  return (
    <Container>
      <Pagination
        currentPage={parseInt(searchParams?.get("page") ?? "1")}
        itemsPerPage={parseInt(searchParams?.get("limit") ?? "20")}
        totalItems={listQuery?.data?.pagination?.items?.total || 0}
        onPageChange={(page) => {
          searchParams.set("page", page.toString());
          setSearchParams(searchParams);
        }}
        onLimitChange={(limit) => {
          searchParams.set("limit", limit.toString());
          setSearchParams(searchParams);
        }}
      />{" "}
      {renderContent()}
    </Container>
  );
};

export default AnimeCardList;
