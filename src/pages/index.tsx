import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import IssueCard from "../../components/IssueCard";
import Navbar from "../../components/Navbar";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const session = useSession({ required: true });
  const issues = trpc.useQuery(["app.getIssues"]);
  const [displayClosed, setDisplayClosed] = useState(false);

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
        <div className="w-9/12 mx-auto mt-4">
          <h1 className="dark:text-white text-3xl text-center uppercase">
            Issues
          </h1>
          <div className="text-center mx-auto mt-4 mb-4">
            <div className="btn">
              <Link href="/issue/new">Add issue</Link>
            </div>
          </div>
          <div className="text-center mb-4">
            <label htmlFor="" className="flex flex-col items-center">
              Display closed issues
              <input
                type="checkbox"
                name="displayClosed"
                className="mt-2"
                id=""
                onClick={() => setDisplayClosed(!displayClosed)}
              />
            </label>
          </div>
          {issues.data ? (
            <ul>
              {issues.data
                .filter((issue) => {
                  return issue.done === displayClosed || issue.done === false;
                })
                .map((issue) => (
                  <IssueCard key={issue.id} issue={issue} />
                ))}
            </ul>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
