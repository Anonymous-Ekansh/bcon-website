import Head from "next/head";
import { Box } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import Navbar from "./navbar";
import Footer from "./footer";
import ScrollBackground from "./scroll-background";

interface LayoutProps {
  title: string;
  children: React.ReactNode;
  childrenHaveNavbar?: boolean;
}

function Layout({ title, children, childrenHaveNavbar }: LayoutProps) {
  const pathname = usePathname();
  const isShortPage = pathname ? ["/login", "/register", "/contact-us"].includes(pathname) : false;

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
      
      {!isShortPage && <ScrollBackground />}
      <Box className="grain-overlay" />
      
      {/* On short pages, we apply a static gradient to the main container so it physically scrolls with the document */}
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
