import { defineConfig, defaultConfig, createSystem } from "@chakra-ui/react";
import { colors } from "./tokens/colors";

export const config = defineConfig({
  theme: {
    breakpoints: { 
      sm: "320px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },

    tokens: {
      colors, 
      fonts: {
        heading: { value: "Poppins, sans-serif" },
        body: { value: "Inter, sans-serif" },
      },
    },

    semanticTokens: {
      colors: {
        background: { value: "{colors.barber.900}" },
        text: { value: "{colors.barber.100}" },
        cta: { value: "{colors.button.cta}" },
        danger: { value: "{colors.button.danger}" },
      },
    },

    keyframes: {
      spin: {
        from: { transform: "rotate(0deg)" },
        to: { transform: "rotate(360deg)" },
      },
    },
  },
});

export const system = createSystem(defaultConfig, config);
