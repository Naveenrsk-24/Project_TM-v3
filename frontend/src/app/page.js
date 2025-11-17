export const metadata = {
  title: "Website Under Construction | TM Studios",
  description: "TM Studios Photography — New website launching soon.",
  robots: "noindex, nofollow",
};

export default function ComingSoon() {
  return (
    <div
      className="
        min-h-screen w-full bg-no-repeat bg-contain bg-black bg-center
        bg-[url('/comingsoon/phone.avif')]
        sm:bg-[url('/comingsoon/laptop.avif')]
      "
    />
  );
}

