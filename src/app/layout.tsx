import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Happy Deploy Day",
  description: "Carte d'anniversaire interactive one-screen pour developpeur web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full overflow-hidden antialiased" suppressHydrationWarning>
      <body className="flex min-h-full overflow-hidden" suppressHydrationWarning>{children}</body>
    </html>
  );
}
