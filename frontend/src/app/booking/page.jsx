import BookingPage from "@/components/BookingPage/BookingPage";
import { pageMeta } from "@/lib/meta-data";


export const metadata = pageMeta({
title: "Book a Session",
description: "Book your photography session with TM Studios.",
path: "/booking",
});

export default function Booking() {
  return (
   <>
   <BookingPage />
   </>

  );
}