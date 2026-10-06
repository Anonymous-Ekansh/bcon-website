import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import Navbar from "./navbar";
import Footer from "./footer";
import ScrollBackground from "./scroll-background";

import { type PropsWithChildren } from "react";

type LayoutProps = PropsWithChildren<{
  title?: string;
  childrenHaveNavbar?: boolean;
}>;

function Layout({ title, children, childrenHaveNavbar }: LayoutProps) {
  const pathname = usePathname();
  const isShortPage = pathname ? ["/login", "/register", "/contact-us"].includes(pathname) : false;
  const canonicalUrl = new URL(pathname || "/", "https://www.businessconclave.in").toString();
  const pageTitle = title
    ? `${title} | Business Conclave SNIoE 2026`
    : "Business Conclave SNIoE 2026";

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <link rel="icon" href="/logo.png" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content="Business Conclave SNIoE 2026" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="/logo.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="/logo.png" />
      </Head>

      {!childrenHaveNavbar ? <Navbar /> : null}
      
      {!isShortPage && <ScrollBackground />}
      <Box className="grain-overlay" />
      <Box 
        as="main" 
        position="relative" 
        zIndex={1} 
        minH="100vh"
        bg={isShortPage ? "linear-gradient(to bottom, #4A1E75 0%, #2D1147 40%, #1A0A29 100%)" : "transparent"}
      >
        {children}
      </Box>
      
      <Footer />
    </>
  );
}

export default Layout;
