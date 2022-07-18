import { Project } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  project: Project;
};

function addLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, "0");
}

const ProjectCard = ({ project }: Props) => {
  return (
    <Link href={`/projects/${project.id}`}>
      <div className="w-full border-2 border-gray-500 p-5 rounded-lg mt-4 hover:border-gray-50 hover:cursor-pointer transition-all">
        <div className="flex flex-row items-center justify-between">
          <h1>#{addLeadingZeros(project.id, 3)}</h1>
          <div className="text-left w-4/5 ml-4">
            <h1 className=" dark:text-white">{project.name}</h1>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
