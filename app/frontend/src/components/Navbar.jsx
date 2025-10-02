import React, { useState } from "react";

const NavLink = ({ children, href = "#" }) => (
  <a href={href} className="text-white/90 hover:text-white text-sm md:text-[15px] transition-colors">
    {children}
  </a>
);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-brand-dark/90 backdrop-blur">
      <div className="container-app flex items-center justify-between h-16">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded bg-brand-gold"></div>
          <span className="text-white font-semibold tracking-wide">TIMI Contractors</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <NavLink>Accueil</NavLink>
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#realisations">Réalisations</NavLink>
          <NavLink href="#references">Références</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden inline-flex items-center justify-center p-2 rounded text-white/90 hover:text-white"
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-brand-dark/95">
          <div className="container-app py-3 flex flex-col gap-3">
            <NavLink>Accueil</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#realisations">Réalisations</NavLink>
            <NavLink href="#references">Références</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
