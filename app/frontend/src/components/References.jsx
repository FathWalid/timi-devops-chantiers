import React from "react";

function RefLogo({ name }) {
  return (
    <div className="bg-white rounded-xl shadow-soft p-4 flex items-center justify-center text-brand-dark font-semibold">
      {name}
    </div>
  );
}

export default function References() {
  return (
    <section id="references" className="py-16 bg-brand-light">
      <div className="container-app text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">Nos références</h2>
        <p className="text-brand-dark/70 mt-2">Ils nous ont fait confiance.</p>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
          <RefLogo name="OCP" />
          <RefLogo name="Maroc Telecom" />
          <RefLogo name="BMCE Bank" />
          <RefLogo name="Lydec" />
          <RefLogo name="CDG" />
          <RefLogo name="ONEE" />
        </div>
      </div>
    </section>
  );
}
