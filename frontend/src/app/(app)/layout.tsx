import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Dextracker",
  description: "A modern Pokémon tracking application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brand-black flex justify-between items-center px-8 py-4">
        <h1>dextracker</h1>
        <div>vincefearing</div>
      </header>
      <main className="flex flex-grow bg-brand-black">
        {children}
      </main>
      <footer className="bg-brand-black flex justify-center items-center gap-6 px-8 py-4">
        <a href="#">DONATE</a>
        <a href="#">BLUESKY</a>
        <a href="#">GITHUB</a>
      </footer>
    </div>
  );
}