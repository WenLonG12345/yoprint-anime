import clsx from "clsx";
import React from "react";

interface IContainer {
  children: React.ReactNode;
  className?: string;
}

const Container: React.FC<IContainer> = ({ children, className }) => {
  return (
    <div className={clsx("container mx-auto px-2 md:px-0", className)}>
      {children}
    </div>
  );
};

export default Container;
