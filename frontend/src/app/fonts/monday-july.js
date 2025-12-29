import localFont from "next/font/local";

export const mondayjuly = localFont({
  src: [
    {
      path: "./Monday July.otf",
      weight: "400",
      style: "normal",
    },
  ],
   variable: "--font-monday-july",
  display: "swap",
});
