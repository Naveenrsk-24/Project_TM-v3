import localFont from "next/font/local";

export const albegos = localFont({
  src: [
    {
      path: "./Albegos.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-albegos",
  display: "swap",
});
