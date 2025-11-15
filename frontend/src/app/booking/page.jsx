import BookingPage from "@/components/BookingPage/BookingPage";

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