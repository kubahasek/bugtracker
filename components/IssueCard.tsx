import { Issue, Project } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  issue: Issue & { Project: Project };
};

function addLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, "0");
}

const IssueCard = ({ issue }: Props) => {
  return (
    <Link href={`/issue/${issue.id}`}>
      <div className="w-full border-2 border-gray-500 p-5 rounded-lg mt-4 hover:border-gray-50 hover:cursor-pointer transition-all">
        <div className="flex flex-row items-center justify-between">
          <h1>#{addLeadingZeros(issue.id, 3)}</h1>
          <div className="text-left w-4/5 ml-4">
            <h1 className=" dark:text-white">{issue.title}</h1>
            <p className="dark:text-gray-500">{issue.Project.name}</p>
          </div>
          {!issue.done ? (
            <div className="badge badge-error gap-2 p-4">Open</div>
          ) : (
            <div className="badge badge-success gap-2">Closed</div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default IssueCard;
