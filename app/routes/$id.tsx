import React from "react";
import { useParams } from "react-router";

const DetailPage = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};

export default DetailPage;
