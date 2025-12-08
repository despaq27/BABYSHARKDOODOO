"use client";

import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/components/home/HeroSection";
import { IndexGrid } from "@/components/home/IndexGrid";
import { useThemeStore } from "@/store/themeStore";

export default function Home() {
  const theme = useThemeStore((state) => state.theme);
  const isWomen = theme === "light";

  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <IndexGrid />

        {/* Featured Products Section */}
        <section className="px-6 md:px-12 py-20 bg-foreground text-background transition-colors duration-500">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
              {isWomen ? "New Arrivals" : "Latest Drops"}
            </h2>
            <p className="font-body text-background/60 max-w-md mx-auto mb-12">
              {isWomen
                ? "Fresh drops. Fluid fits. Retitle your wardrobe."
                : "New season. Bold statements. Upgrade your rotation."
              }
            </p>

            {/* Product Grid Placeholder */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-[3/4] bg-background/10 rounded-lg mb-4 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-background/5 to-background/20 group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h4 className="font-display text-sm uppercase tracking-wide">
                    {isWomen ? `Look ${i}` : `Style ${i}`}
                  </h4>
                  <p className="font-body text-background/60 text-sm">$XX.00</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 md:px-12 py-12 border-t border-foreground/10 transition-colors duration-500">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="font-display text-lg font-bold">RETITLED</div>
            <div className="flex items-center gap-8 font-body text-sm text-foreground/60">
              <a href="#" className="hover:text-foreground transition-colors">
                Instagram
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                TikTok
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
            <p className="font-body text-sm text-foreground/40">
              © 2024 RETITLED. All rights reserved.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
