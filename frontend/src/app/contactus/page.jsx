import { ChemicalContactForm } from "@/components/Contact/ChemicalContactForm";
import { pageMeta } from "@/lib/meta-data";


export const metadata = pageMeta({
title: "Contact TM Studios",
description: "Get in touch with TM Studios for bookings, inquiries, and availability.",
path: "/contactus",
image: "/og-contact.jpg",
});

export default function ContactUs() {
  return (
   <>
   <ChemicalContactForm/>
   </>

  );
}