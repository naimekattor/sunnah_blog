// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}", // This might already be here
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // 👇 ADD THIS LINE to include the new Tiptap components
    "./src/components/tiptap-ui-primitive/**/*.tsx",
  ],
  theme: {
    extend: {
      // ...
    },
  },
  plugins: [
    require("@tailwindcss/typography"), // Highly recommended for editor content
  ],
};
export default config;
