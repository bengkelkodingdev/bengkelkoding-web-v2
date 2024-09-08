import React from "react";
import Header from "../component/general/Header";
import Footer from "../component/general/Footer";
import Input from "../component/general/Input";
import Button from "../component/general/Button";
import Image from "next/image";

const ContactPage = () => {
  return (
    <div className="z-50">
      <Header />

      <section
        id="Contact"
        className="max-w-5xl min-h-screen mx-auto px-2 lg:px-4 py-4"
      >
        <div className="w-full mx-auto pt-6 pb-10 lg:pt-10 lg:pb-20 text-center">
          <h2 className="font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent">
            Hubungi Kami
          </h2>
          <p className="text-neutral2">Bantuan & Dukungan</p>
        </div>
        <div className="lg:flex gap-10">
          <form action="" className="max-w-96 mx-auto lg:max-w-full lg:min-w-[50%]">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Email Anda"
              required
            />
            <Input
              label="Subject"
              type="text"
              name="title"
              placeholder="Judul"
              required
            />
            <textarea
              name="description"
              rows={5}
              className="w-full px-3 py-2 border border-neutral4 rounded-md text-neutral1 focus:outline-none focus:ring-4 focus:ring-primary5 focus:border-primary1 sm:text-sm"
              placeholder="Deskripsi"
              required
            ></textarea>
            <Button text="Kirim" className="mt-6 w-full" />
          </form>
          <div className="max-h-[357px] w-full overflow-hidden rounded-xl hidden lg:block">
            <Image src={"/img/h6-3.png"} alt="Contact Us" width={400} height={400} className="w-full" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
