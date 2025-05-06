import type {
  AnimeDetailsResponse,
  AnimeListRequest,
  AnimeListResponse,
} from "@/types/anime";
import axiosUtils from "@/utils/axiosUtils";

export const getAllAnime = async (
  payload: AnimeListRequest
): Promise<AnimeListResponse> => {
  return await axiosUtils.get("/v4/top/anime", { params: payload });
};

export const getAnimeById = async (
  id: string
): Promise<AnimeDetailsResponse> => {
  return await axiosUtils.get(`/v4/anime/${id}/full`);
};
