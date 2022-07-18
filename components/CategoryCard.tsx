import { Category } from "@prisma/client";
import React from "react";

type Props = {
  category: Category;
};

function addLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, "0");
}

const ProjectCard = ({ category }: Props) => {
  return (
    <div className="w-full border-2 border-gray-500 p-5 rounded-lg mt-4 hover:border-gray-50 hover:cursor-pointer transition-all">
      <div className="flex flex-row items-center justify-between">
        <h1>#{addLeadingZeros(category.id, 3)}</h1>
        <div className="text-left w-4/5 ml-4">
          <h1 className=" dark:text-white">{category.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
