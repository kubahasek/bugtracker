import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const session = useSession({ required: true });

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
      <main></main>
    </>
  );
};

export default Home;
