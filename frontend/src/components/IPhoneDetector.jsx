"use client";
import { useEffect } from "react";

export default function IPhoneDetector() {
  useEffect(() => {
    if (/iPhone/.test(navigator.userAgent)) {
      document.documentElement.classList.add("is-iphone");
    }
  }, []);

  return null;
}
