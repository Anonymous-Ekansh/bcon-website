import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "https://forms.rishabhj.in/bcon",
      permanent: false,
    },
  };
};

export default function RegisterPage() {
  return null;
}

