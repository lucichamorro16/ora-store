"use client";

import { usePathname } from "next/navigation";
import { WHATSAPP_NUMBER } from "../lib/constants";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-ink flex items-center justify-center shadow-[0_10px_30px_-8px_rgba(20,20,20,0.5)] hover:brightness-110 transition"
    >
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path
          d="M17.6 6.3A8.9 8.9 0 0 0 3.2 16.5L2 21l4.6-1.2A8.9 8.9 0 0 0 17.6 6.3Z"
          stroke="#f6f1e4"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.5 9.3c0 3.7 2.9 6.4 6.4 6.4.5 0 .8-.4.7-.9l-.2-1a.7.7 0 0 0-.6-.5l-1.4-.2a.7.7 0 0 0-.6.2l-.4.4a5.6 5.6 0 0 1-2.6-2.6l.4-.4a.7.7 0 0 0 .2-.6l-.2-1.4a.7.7 0 0 0-.5-.6l-1-.2c-.5-.1-.9.2-.9.7Z"
          fill="#f6f1e4"
        />
      </svg>
    </a>
  );
}
