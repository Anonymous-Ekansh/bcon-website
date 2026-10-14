import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const colors = {
  brand: {
    baseDark: "#2D1147",
    baseLight: "#3A2159",
    gold: "#CFAF89",
    goldLight: "#E8D8C3",
    white: "#FFFFFF",
    softMauve: "#816493",
    isoPurple: "#9B6FCB",
    gradientStart: "#C664DB", // Orchid Purple
    gradientMid: "#BA27CE",   // Magenta Purple
    gradientEnd: "#2D1147",
  },
};

const fonts = {
  heading: `'Tan Vivre Libre', 'Playfair Display', 'Cormorant Garamond', Georgia, serif`,
  body: `'Proxima Nova', 'Inter', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif`,
  accent: `'Cinzel', serif`,
  sketch: `'Cabin Sketch', cursive, sans-serif`,
  display: `'Tan Vivre Libre', 'Playfair Display', serif`,
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
