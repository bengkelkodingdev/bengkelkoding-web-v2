import React from "react";
import Header from "../component/general/Header";
import Footer from "../component/general/Footer";

const FAQPage = () => {
  return (
    <div className="bg-[#f7f9fa] z-50">
      <Header />

      <section
        id="FAQ"
        className="max-w-5xl min-h-screen mx-auto px-2 lg:px-4 py-4"
      >
        <div className="w-full mx-auto pt-6 pb-10 lg:pt-10 lg:pb-20">
          <h2 className="font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
            FAQ
          </h2>
          <p className="text-neutral2">Apa yang Anda pertanyakan?</p>
        </div>

        <div>
          Next Feature
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;
