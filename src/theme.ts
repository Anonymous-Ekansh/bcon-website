import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles: {
    global: {
      "html, body": {
        backgroundColor: "#232323", // Background color for the entire site
        color: "#ffffff", // Text color for better readability
      },
    },
  },
});

export default theme;
