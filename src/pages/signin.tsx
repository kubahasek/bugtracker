import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { getProviders, getSession, signIn, useSession } from "next-auth/react";
import { Provider } from "next-auth/providers";
import { useRouter } from "next/router";

type SignInProps = {
  providers: Provider[];
};

const SignIn: NextPage<SignInProps> = ({ providers }) => {
  const router = useRouter();
  const { error } = router.query;

  return (
    <>
      <Head>
        <title>Bugtracker | Sign In</title>
      </Head>
      <div className="flex flex-col justify-center items-center h-[100vh]">
        <h1 className="dark:text-white font-bold uppercase text-2xl mb-4">
          Welcome to bugtracker!
        </h1>
        {error && error === "SessionRequired" && (
          <p className="mb-4 text-red-500">Please sign in to view the page</p>
        )}
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="btn btn-outline"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (session && session !== null) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;
