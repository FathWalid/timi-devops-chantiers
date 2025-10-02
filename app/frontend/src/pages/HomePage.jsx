import React from "react";
import { Navbar, Hero, Services, Realisations, References, Footer, Chantiers } from "../components";

export default function HomePage() {
  return (
    <div className="min-h-full">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Chantiers />
        <Realisations />
        <References />
      </main>
      <Footer />
    </div>
  );
}
