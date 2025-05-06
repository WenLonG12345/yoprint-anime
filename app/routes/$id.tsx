import AnimeDetails from "@/components/AnimeDetails";
import Container from "@/components/Container";
import Header from "@/components/Header";
import { ArrowLeft, Home } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router";

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Header />

      <Container>
        <div className="my-2 flex flex-row gap-2">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft size={16} className="text-gray-500" />
            <span>Back</span>
          </button>
          <button
            onClick={() => navigate("/", { replace: true })}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 transition-colors bg-white border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Home size={16} className="text-gray-500" />
            <span>Home</span>
          </button>
        </div>
      </Container>
      <AnimeDetails animeId={id} />
    </div>
  );
};

export default DetailPage;
