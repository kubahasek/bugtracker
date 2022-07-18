import { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { z } from "zod";
import Navbar from "../../../components/Navbar";
import { trpc } from "../../utils/trpc";

function addLeadingZeros(num: number, totalLength: number) {
  return String(num).padStart(totalLength, "0");
}

const IssueDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) {
    return <div>No id</div>;
  }
  const solveMutation = trpc.useMutation(["app.solveIssue"]);

  const issue = trpc.useQuery(["app.getIssue", parseInt(id.toString())]);
  const issueId = parseInt(id.toString());

  const markSolved = (issueId: number) => {
    solveMutation.mutate({ id: issueId });
    router.reload();
  };

  return (
    <>
      <Head>
        <title>Bugtracker</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main>
        {issue.data && !issue.isLoading ? (
          <>
            <div className="mt-4 flex flex-row items-center justify-between w-4/5 mx-auto">
              <h1 className="text-center text-2xl">
                #{addLeadingZeros(issue.data.id, 3)}
              </h1>
              <h1 className="text-center dark:text-white text-2xl">
                {issue.data.title}
              </h1>
              <div className="flex justify-center">
                {!issue.data.done ? (
                  <div className="badge badge-error gap-2 p-4">Open</div>
                ) : (
                  <div className="badge badge-success gap-2">Closed</div>
                )}
              </div>
            </div>
            <div className="mt-2">
              <p className="text-center">
                Created by{" "}
                <span className="dark:text-white">
                  {issue.data.author.name}
                </span>{" "}
                at{" "}
                <span className="dark:text-white">
                  {issue.data.createdAt.toLocaleDateString()}
                </span>
              </p>
            </div>
            <div className="border pb-2 w-4/5 mx-auto rounded-lg mt-4">
              <div className="flex text-center justify-center border-b w-full pt-2 pb-2">
                <p className="text-center">{issue.data.Project.name}</p>/
                <p className="text-center">{issue.data.Category.name}</p>
              </div>
              <div className="mt-2 p-4 break-words dark:text-white">
                <p className="">{issue.data.content}</p>
              </div>
            </div>
            <div
              className="btn btn-success flex items-center w-4/5 mx-auto mt-4"
              onClick={() => markSolved(issueId)}
              {...(issue.data.done ? { disabled: true } : {})}
            >
              Mark as solved
            </div>
          </>
        ) : (
          <div className="text-center mt-4 dark:text-white">
            No issue with id: {id} was found
          </div>
        )}
      </main>
    </>
  );
};

export default IssueDetail;
