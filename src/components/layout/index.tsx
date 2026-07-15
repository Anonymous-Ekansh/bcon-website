import Head from "next/head";
import { Box } from "@chakra-ui/react";

import Navbar from "./navbar";
import Footer from "./footer";
import ScrollBackground from "./scroll-background";

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
      <ScrollBackground />
      <Box className="grain-overlay" />
      <Box as="main" position="relative" zIndex={1}>{children}</Box>
      <Footer />
    </>
  );
}

export default Layout;
