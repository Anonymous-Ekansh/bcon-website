import { ChakraProvider } from "@chakra-ui/react";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import theme from "../theme"; // Import custom theme

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        {/* <ColorModeScript initialColorMode={theme.config.initialColorMode} /> */}

        {/* Rendering the component */}
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
