import { getAnimeById } from "@/services/api/anime";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import AnimeStat from "./AnimeStat";
import Container from "./Container";
import { formatWithCommas } from "@/utils/number";
import { BookmarkCheck, Calendar, Clock } from "lucide-react";
import RelatedAnimeList from "./RelatedAnimeList";

interface IAnimeDetails {
  animeId?: string;
}

const AnimeDetails: React.FC<IAnimeDetails> = ({ animeId }) => {
  const detailQuery = useQuery({
    queryKey: ["animeDetail", animeId],
    queryFn: async () => {
      return await getAnimeById(animeId || "");
    },
    select: (res) => res.data,
  });

  const renderContent = () => {
    if (detailQuery.isLoading) {
      return (
        <div className="flex flex-col md:flex-row gap-2 py-4 items-center">
          <div className="bg-gray-200 h-[400px] w-[300px] rounded-lg animate-pulse" />

          <div>
            <div className="bg-gray-200 h-10 w-[300px] rounded-md animate-pulse mb-2" />
            <div className="bg-gray-200 h-4 w-[500px] rounded-md animate-pulse mb-2" />
            <div className="bg-gray-200 h-4 w-[500px] rounded-md animate-pulse mb-2" />
            <div className="bg-gray-200 h-4 w-[500px] rounded-md animate-pulse mb-2" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="bg-gray-200 h-[80px] rounded-md animate-pulse" />
              <div className="bg-gray-200 h-[80px] rounded-md animate-pulse" />
              <div className="bg-gray-200 h-[80px] rounded-md animate-pulse" />
              <div className="bg-gray-200 h-[80px] rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      );
    }

    if (detailQuery.isError || !detailQuery.data) {
      return (
        <div className="flex items-center justify-center mt-5">
          No anime found at this moment
        </div>
      );
    }

    return (
      <div className="flex flex-col md:flex-row gap-4 py-4 items-center">
        <img
          src={detailQuery?.data?.images?.jpg?.image_url}
          alt={detailQuery?.data?.title}
          className="object-fit rounded-lg shadow-md"
          width={300}
        />

        <div className="mt-4 md:mt-0">
          <h1 className="font-bold text-3xl">{detailQuery.data.title}</h1>

          <div className="flex flex-row gap-3 my-2 flex-wrap">
            <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm text-nowrap">
              <Calendar size={16} className="text-blue-500" />
              <span className="font-medium">
                {detailQuery?.data?.year || "Unknown"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm text-nowrap">
              <BookmarkCheck size={16} className="text-green-500" />
              <span className="font-medium">
                {detailQuery?.data?.status || "Unknown"}
              </span>
            </div>
            <div className="flex items-center gap-1.5 bg-gray-100 px-3 py-1.5 rounded-full text-sm text-nowrap">
              <Clock size={16} className="text-indigo-500" />
              <span className="font-medium">
                {detailQuery?.data?.duration || "Unknown"}
              </span>
            </div>
          </div>

          <p className="text-gray-500 mt-2">{detailQuery.data.synopsis}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
            <AnimeStat
              title={detailQuery?.data?.score}
              subTitle={`${formatWithCommas(
                detailQuery?.data?.scored_by
              )} USERS`}
              color="blue"
            />
            <AnimeStat
              title={detailQuery?.data?.rank}
              subTitle="RANKED"
              color="purple"
            />
            <AnimeStat
              title={detailQuery?.data?.popularity}
              subTitle="POPULARITY"
              color="red"
            />
            <AnimeStat
              title={formatWithCommas(detailQuery?.data?.members)}
              subTitle="MEMBERS"
              color="green"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <Container>
      {renderContent()} 
      <RelatedAnimeList animeId={animeId} />
    </Container>
  );
};

export default AnimeDetails;
