import "./globals.css";

export const metadata = {
  title: "TM Photography",
  description: "Main site layout",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}
      >
        <NavBarMain/>
        {/* <PremiumNavbar/> */}

        {children}
      </body>
    </html>
  );
}
