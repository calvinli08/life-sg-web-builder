import "@/src/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Builder SG - Prototype Engine",
  description: "AI-driven component generator utilizing structural specifications mappings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Directly pulling validated LifeSG Design System CSS stylesheets assets context */}
        <link 
          rel="stylesheet" 
          href="https://assets.life.gov.sg/react-design-system/v3/css/main.css" 
          crossOrigin="anonymous" 
        />
      </head>
      <body>{children}</body>
    </html>
  );
}