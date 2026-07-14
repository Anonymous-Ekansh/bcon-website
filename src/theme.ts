import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    baseDark: "#2C1B47",
    baseLight: "#3A2159",
    gold: "#C9A467",
    goldLight: "#D8B87A",
    white: "#F5F2F0",
    isoPurple: "#9B6FCB",
    gradientStart: "#8A4FC7",
    gradientMid: "#B98CE0",
    gradientEnd: "#E8D4F5",
  },
};

const fonts = {
  heading: `'Playfair Display', serif`,
  body: `'Inter', sans-serif`,
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  styles: {
    global: {
      "html, body": {
        backgroundColor: "brand.baseDark",
        color: "brand.white",
      },
    },
  },
});

export default theme;
