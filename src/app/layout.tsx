import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "RETITLED | Retitle Your Look",
  description: "Fashion redefined. Fluid fits for everyone. Shop the collection that rewrites the rules.",
  keywords: ["fashion", "women's clothing", "fluid fashion", "streetwear", "unisex", "RETITLED"],
  openGraph: {
    title: "RETITLED | Retitle Your Look",
    description: "Fashion redefined. Fluid fits for everyone.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-background text-foreground transition-colors duration-500">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
