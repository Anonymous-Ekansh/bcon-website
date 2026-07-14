import Head from "next/head";
import { Box } from "@chakra-ui/react";

import Navbar from "./navbar";
import Footer from "./footer";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  childrenHaveNavbar?: boolean;
}

function Layout({ title, children, childrenHaveNavbar }: LayoutProps) {
  return (
    <>
      <Head>
        <title>
          {title
            ? `${title} | Business Conclave SNIoE 2026`
            : "Business Conclave SNIoE 2026"}
        </title>
      </Head>

      {!childrenHaveNavbar ? <Navbar /> : null}
      <Box as="main">{children}</Box>
      <Footer />
    </>
  );
}

export default Layout;
