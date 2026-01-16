"use client";

import { FaWhatsapp } from "react-icons/fa";

export default function WhatsAppButton({
  phone = "917358279252",
  message = "Hi! I’d like to know more about your wedding photography services.",
}) {
  const whatsappLink = `https://wa.me/${phone}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="
        fixed bottom-6 right-6 z-50 
        bg-green-500 text-white p-4 rounded-full shadow-xl 
        flex items-center justify-center
        transition-all duration-300 
        hover:scale-110 hover:bg-green-600
        animate-pulse
      "
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}
