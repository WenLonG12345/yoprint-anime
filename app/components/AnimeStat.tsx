import React from "react";

interface IAnimeStat {
  color: "blue" | "purple" | "red" | "green";
  title: string | number;
  subTitle: string;
}

const AnimeStat: React.FC<IAnimeStat> = ({ color, title, subTitle }) => {
  const colorSchemes = {
    blue: {
      bg: "bg-blue-100",
      border: "border-blue-500",
      title: "text-blue-800",
      subtitle: "text-blue-500",
    },
    purple: {
      bg: "bg-purple-100",
      border: "border-purple-500",
      title: "text-purple-800",
      subtitle: "text-purple-500",
    },
    red: {
      bg: "bg-red-100",
      border: "border-red-500",
      title: "text-red-800",
      subtitle: "text-red-500",
    },
    green: {
      bg: "bg-green-100",
      border: "border-green-500",
      title: "text-green-800",
      subtitle: "text-green-500",
    },
  };

  const scheme = colorSchemes[color];

  return (
    <div
      className={`${scheme.bg} min-w-[150px] w-full text-center border rounded-md p-3 ${scheme.border}`}
    >
      <div className={`${scheme.title} font-medium text-xl`}>{title}</div>
      <div className={`${scheme.subtitle}`}>{subTitle}</div>
    </div>
  );
};

export default AnimeStat;
