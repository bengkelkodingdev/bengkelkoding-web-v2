"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

const useSmoothScroll = (initialDirection: "right" | "left") => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollDirection, setScrollDirection] = useState<"right" | "left">(
    initialDirection
  );

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    if (scrollContainer) {
      const smoothScroll = () => {
        if (scrollDirection === "right") {
          if (
            scrollContainer.scrollLeft >=
            scrollContainer.scrollWidth - scrollContainer.clientWidth
          ) {
            setScrollDirection("left");
          } else {
            scrollContainer.scrollBy({ left: 1, behavior: "smooth" });
          }
        } else {
          if (scrollContainer.scrollLeft <= 0) {
            setScrollDirection("right");
          } else {
            scrollContainer.scrollBy({ left: -1, behavior: "smooth" });
          }
        }
      };

      const interval = setInterval(smoothScroll, 30);
      return () => clearInterval(interval);
    }
  }, [scrollDirection, initialDirection]);

  return scrollContainerRef;
};

const HomePage = () => {
  const login = false;
  const user = "superadmin";

  const scrollContainerRef = useSmoothScroll("right");
  const scrollContainerRefTwo = useSmoothScroll("left");

  useEffect(() => {
    // Set initial scroll position for the second container
    if (scrollContainerRefTwo.current) {
      scrollContainerRefTwo.current.scrollLeft =
        scrollContainerRefTwo.current.scrollWidth -
        scrollContainerRefTwo.current.clientWidth;
    }
  }, [scrollContainerRefTwo]);

  return (
    <div className="bg-[#f7f9fa] z-50">
      <header className="bg-[#f7f9fa] bg-opacity-80 backdrop-blur-md w-full sticky top-0">
        <div className="max-w-7xl mx-auto px-2 lg:px-4 py-4 flex items-center justify-between">
          <Image
            src={"/logo/bengkelkoding-text.png"}
            alt={"Bengkel Koding"}
            width={110}
            height={110}
          />
          <div className="flex gap-10">
            <Link href={"/"} className="font-semibold text-primary1">
              Home
            </Link>
            <Link
              href={"/kelas"}
              className="text-neutral1 hover:text-primary1 font-semibold"
            >
              Kelas
            </Link>
          </div>
          {login ? (
            <Link
              href={`/dashboard/${user}`}
              className="font-medium hover:text-primary1"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href={"/masuk"}
              className="bg-primary1 text-white hover:bg-primary2 focus:ring-primary5 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
            >
              Masuk
            </Link>
          )}
        </div>
      </header>

      <main className="w-full px-2 lg:px-4 py-4 min-h-screen">
        <article className="max-w-5xl mx-auto my-2 lg:my-10 2xl:my-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-4 lg:gap-6">
            <h1 className="font-bold bg-gradient-to-r from-blue-700 to-cyan-400 bg-clip-text text-transparent">
              Mari Belajar Mengubah Ide Menjadi Kode
            </h1>
            <p className="text-neutral1">
              Ayo mulai petualangan belajarmu bersama kami!
            </p>
            <Link
              href={"/gabung-discord"}
              className="w-max mt-4 bg-primary1 text-white hover:bg-primary2 focus:ring-primary5 px-4 py-2 lg:px-5 lg:py-2.5 font-medium rounded-lg focus:ring-4 focus:outline-none transition-all ease-in-out duration-300"
            >
              Gabung Discord
            </Link>
          </div>
          <Image
            src={"/img/bengkod.png"}
            alt={"Home Image"}
            width={400}
            height={400}
            className="w-full lg:w-[80%]"
          />
        </article>

        <article className="max-w-4xl mx-auto my-2 lg:my-10 2xl:my-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="flex items-center gap-4">
            {/*  */}
            <div className="bg-blue-100 fill-blue-600 p-4 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
              >
                <path d="M242-249q-20-11-31-29.5T200-320v-192l-96-53q-11-6-16-15t-5-20q0-11 5-20t16-15l338-184q9-5 18.5-7.5T480-829q10 0 19.5 2.5T518-819l381 208q10 5 15.5 14.5T920-576v256q0 17-11.5 28.5T880-280q-17 0-28.5-11.5T840-320v-236l-80 44v192q0 23-11 41.5T718-249L518-141q-9 5-18.5 7.5T480-131q-10 0-19.5-2.5T442-141L242-249Zm238-203 274-148-274-148-274 148 274 148Zm0 241 200-108v-151l-161 89q-9 5-19 7.5t-20 2.5q-10 0-20-2.5t-19-7.5l-161-89v151l200 108Zm0-241Zm0 121Zm0 0Z" />
              </svg>
            </div>
            <div>
              <strong className="text-3xl text-blue-600">1123+</strong>
              <p className="text-neutral1 font-medium">Mahasiswa</p>
            </div>
          </div>

          {/*  */}
          <div className="flex items-center gap-4">
            <div className="bg-yellow-100 fill-yellow-500 p-4 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
              >
                <path d="m354-287 126-76 126 77-33-144 111-96-146-13-58-136-58 135-146 13 111 97-33 143Zm126 18L314-169q-11 7-23 6t-21-8q-9-7-14-17.5t-2-23.5l44-189-147-127q-10-9-12.5-20.5T140-571q4-11 12-18t22-9l194-17 75-178q5-12 15.5-18t21.5-6q11 0 21.5 6t15.5 18l75 178 194 17q14 2 22 9t12 18q4 11 1.5 22.5T809-528L662-401l44 189q3 13-2 23.5T690-171q-9 7-21 8t-23-6L480-269Zm0-201Z" />
              </svg>
            </div>
            <div>
              <strong className="text-3xl text-yellow-500">113+</strong>
              <p className="text-neutral1 font-medium">Bintang 5</p>
            </div>
          </div>

          {/*  */}
          <div className="flex items-center gap-4">
            <div className="bg-red-100 fill-red-600 p-4 rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="40px"
                viewBox="0 -960 960 960"
                width="40px"
              >
                <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v245q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555v-245H240v640Zm0 0v-640 640Zm200-395q0 12 10.5 17.5t20.5-.5l49-30q10-6 20.5-6t20.5 6l49 30q10 6 20 .5t10-17.5q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555Z" />
              </svg>
            </div>
            <div>
              <strong className="text-3xl text-red-600">5+</strong>
              <p className="text-neutral1 font-medium">Kursus</p>
            </div>
          </div>
        </article>

        <article className="bg-white rounded-xl w-full py-10 2xl:py-20 mx-auto my-10 flex justify-between items-center gap-10">
          <div className="max-w-5xl mx-auto">
            <div className="max-w-[60%]">
              <p className="font-medium text-primary1">Kenapa kami?</p>
              <strong className="text-3xl font-semibold">
                Support Penuh Akan Kalian Dapatkan Jika Bergabung Dengan Kami
              </strong>
            </div>
            <div className="flex gap-10">
              <div className="mt-4">
                <div className="flex items-center gap-4 border-b py-6">
                  <div className="bg-orange-100 fill-orange-600 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                    >
                      <path d="M320-240 80-480l240-240 57 57-184 184 183 183-56 56Zm320 0-57-57 184-184-183-183 56-56 240 240-240 240Z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-semibold text-lg">
                      Proyek Koding Praktis
                    </strong>
                    <p className="text-neutral1">
                      Pengalaman ngoding langsung dengan proyek-proyek koding
                      yang relevan untuk meningkatkan keterampilanmu.
                    </p>
                  </div>
                </div>

                {/* 2 */}
                <div className="flex items-center gap-4 border-b py-6">
                  <div className="bg-purple-100 fill-purple-600 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                    >
                      <path d="M266-634q6 6 14 6t14-6l52-52q6-6 6-14t-6-14l-52-52q-6-6-14-6t-14 6l-52 52q-6 6-6 14t6 14l52 52Zm214-26ZM160-400q-33 0-56.5-23.5T80-480v-360q0-33 23.5-56.5T160-920h640q33 0 56.5 23.5T880-840v360q0 33-23.5 56.5T800-400h-81q-17 0-28-11.5T680-440q0-17 11.5-28.5T720-480h80v-360H160v360h80q17 0 28.5 11.5T280-440q0 17-11.5 28.5T240-400h-80Zm500-280q25 0 42.5-17.5T720-740q0-25-17.5-42.5T660-800q-25 0-42.5 17.5T600-740q0 25 17.5 42.5T660-680ZM240-40q-17 0-28.5-11.5T200-80v-44q0-35 19.5-65t51.5-45q49-23 102-34.5T480-280q54 0 107 11.5T689-234q32 15 51.5 45t19.5 65v44q0 17-11.5 28.5T720-40H240Zm40-80h400v-4q0-12-7-22t-18-15q-42-19-86-29t-89-10q-45 0-89 10t-86 29q-11 5-18 15t-7 22v4Zm200-200q-58 0-99-41t-41-99q0-58 41-99t99-41q58 0 99 41t41 99q0 58-41 99t-99 41Zm0-80q25 0 42.5-17.5T540-460q0-25-17.5-42.5T480-520q-25 0-42.5 17.5T420-460q0 25 17.5 42.5T480-400Zm0-60Zm0 340Z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-semibold text-lg">
                      Live Class Interaktif
                    </strong>
                    <p className="text-neutral1">
                      Bergabunglah dalam kelas langsung yang interaktif untuk
                      belajar dari instruktur terbaik.
                    </p>
                  </div>
                </div>

                {/* 3 */}
                <div className="flex items-center gap-4 border-b py-6">
                  <div className="bg-cyan-100 fill-cyan-600 p-3 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                    >
                      <path d="M40-272q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v32q0 33-23.5 56.5T600-160H120q-33 0-56.5-23.5T40-240v-32Zm800 112H738q11-18 16.5-38.5T760-240v-40q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v40q0 33-23.5 56.5T840-160ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
                    </svg>
                  </div>
                  <div>
                    <strong className="font-semibold text-lg">
                      Dukungan 1-on-1
                    </strong>
                    <p className="text-neutral1">
                      Kami memberikan dukungan pribadi untuk membantu kamu
                      mencapai tujuan belajarmu.
                    </p>
                  </div>
                </div>
              </div>
              <Image
                src={"/img/bengkod.png"}
                alt="bengkod"
                width={400}
                height={400}
                className="h-max hidden md:block"
              />
            </div>
          </div>
        </article>

        {/*  */}
        <article className="max-w-5xl py-10 mx-auto">
          <nav className="ml-10 flex">
            <div className="bg-white text-primary1 font-medium px-4 py-2 rounded-t-md cursor-pointer">
              <p>Kursus</p>
            </div>
            <div className="bg-gray-100 font-medium px-4 py-2 rounded-t-md cursor-pointer hover:bg-white hover:text-primary1">
              <p>Workshop</p>
            </div>
          </nav>
          <div className="bg-white rounded-xl px-6 py-5 flex">
            <div className="w-[30%] py-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xl font-semibold">
                  Kursus di Bengkel Koding
                </h4>
                <div className="flex gap-4">
                  <p className="text-neutral1">
                    <strong>5</strong> Kursus
                  </p>
                  <p className="text-neutral1">
                    <strong>600+</strong> Mahasiswa
                  </p>
                </div>
                <p className="text-neutral1 mt-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
                  vitae voluptatem neque deleniti sequi vel nam delectus aliquam
                  molestiae! Non?
                </p>
              </div>
              <div className="flex gap-2">
                <div className="fill-neutral1 border rounded-full p-2 hover:bg-neutral5 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                  >
                    <path d="M526-314 381-459q-5-5-7-10t-2-11q0-6 2-11t7-10l145-145q3-3 6.5-4.5t7.5-1.5q8 0 14 5.5t6 14.5v304q0 9-6 14.5t-14 5.5q-2 0-14-6Z" />
                  </svg>
                </div>
                <div className="fill-neutral1 border rounded-full p-2 hover:bg-neutral5 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                  >
                    <path d="M420-308q-8 0-14-5.5t-6-14.5v-304q0-9 6-14.5t14-5.5q2 0 14 6l145 145q5 5 7 10t2 11q0 6-2 11t-7 10L434-314q-3 3-6.5 4.5T420-308Z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-[70%] flex gap-4 overflow-x-auto no-scrollbar py-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <Link
                  key={index}
                  href={"/kursus"}
                  className="min-w-[250px] block border bg rounded-lg overflow-hidden hover:shadow-md transition-all ease-in-out duration-200"
                >
                  <Image
                    src={"/img/kursus-image-1.png"}
                    alt="kursus"
                    width={250}
                    height={250}
                  />
                  <div className="p-4">
                    <strong className="font-semibold">Web Development</strong>
                    <div className="flex gap-4">
                      <div className="text-sm flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="18px"
                          viewBox="0 0 24 24"
                          width="18px"
                          className="fill-blue-500"
                        >
                          <path d="M0 0h24v24H0V0z" fill="none" />
                          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z" />
                        </svg>
                        <p className="text-neutral1 text-sm font-semibold">
                          120
                        </p>
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          enable-background="new 0 0 24 24"
                          height="18px"
                          viewBox="0 0 24 24"
                          width="18px"
                          className="fill-yellow-500"
                        >
                          <g>
                            <path d="M0 0h24v24H0V0z" fill="none" />
                            <path d="M0 0h24v24H0V0z" fill="none" />
                          </g>
                          <g>
                            <path d="m12 17.27 4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72 3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z" />
                          </g>
                        </svg>
                        <p className="text-neutral1 text-sm font-semibold">5</p>
                      </div>
                    </div>
                    <p className="text-sm text-neutral1 mt-2">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      Perferendis, nulla?
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </article>

        {/* tentang bengkel koding */}
        <article
          className="max-w-5xl bg-primary1 text-white rounded-xl p-6 2xl:p-10 mx-auto my-10 2xl:mb-20 bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/img/h6-large.png')" }}
        >
          <div className="lg:w-[60%] flex flex-col gap-4">
            <div className="w-max p-4 bg-white bg-opacity-80 gap-2 rounded-md">
              <Image
                src={"/logo/bengkelkoding-text.png"}
                alt="Bengkod"
                width={100}
                height={100}
              />
            </div>
            <strong className="text-xl font-semibold">
              Kenal lebih dekat dengan Bengkel Koding!
            </strong>
            <p>
              Program ini adalah inisiatif dari{" "}
              <i>
                Program Studi Teknik Informatika Universitas Dian Nuswantoro
              </i>{" "}
              yang bertujuan untuk membantu mahasiswa memahami dunia teknologi.
              Kami menyediakan materi pembelajaran, pelatihan praktis, dan
              dukungan untuk membantu dalam pengembangan skill dibidang yang
              diminati.
            </p>
          </div>
        </article>

        {/* testimoni mahasiswa */}
        <article
          className="w-full rounded-xl bg-primary5 mx-auto my-2 lg:my-10 2xl:my-12 flex flex-col justify-between items-center gap-6 px-2 py-10 2xl:py-20 bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/img/bg-testimoni.png')" }}
        >
          <h3 className="text-2xl font-semibold">Testimoni Mahasiswa</h3>
          <div className="w-full overflow-hidden flex flex-col gap-4">
            {/* 1 */}
            <div
              ref={scrollContainerRef}
              className="flex gap-4 overflow-x-auto no-scrollbar"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-80 text-neutral1 bg-white p-4 rounded-lg"
                >
                  {/* feedback */}
                  <div className="mb-4">
                    <strong className="text-lg">Lorem, ipsum dolor.</strong>
                    <p className="text-sm">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Unde, quos.
                    </p>
                  </div>
                  {/* mahasiswa */}
                  <div className="text-right">
                    <strong className="text-xs">
                      Arif Saputra | Web Developer
                    </strong>
                  </div>
                </div>
              ))}
            </div>

            {/* 2 */}
            <div
              ref={scrollContainerRefTwo}
              className="flex gap-4 overflow-x-scroll no-scrollbar"
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="min-w-80 text-neutral1 bg-white p-4 rounded-lg"
                >
                  {/* feedback */}
                  <div className="mb-4">
                    <strong className="text-lg">Lorem, ipsum dolor.</strong>
                    <p className="text-sm">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Unde, quos.
                    </p>
                  </div>
                  {/* mahasiswa */}
                  <div className="text-right">
                    <strong className="text-xs">
                      Arif Saputra | Web Developer
                    </strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* faq */}
        <article className="max-w-5xl mx-auto my-2 lg:my-10 2xl:my-12 flex flex-col justify-between items-center gap-6">
          <h3 className="text-2xl font-semibold">Frequently Asked Questions</h3>
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-2">
            <div className="w-full flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <button
                  key={index}
                  className="w-full text-left py-4 px-6 bg-white rounded-lg cursor-pointer hover:shadow-md focus:shadow-md transition-all ease-in-out duration-200"
                >
                  {/* question */}
                  <div className="flex justify-between items-center">
                    <strong className="font-semibold text-neutral1">
                      Apakah bumi itu bulat?
                    </strong>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 0 24 24"
                      width="30px"
                      className="fill-neutral1"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z" />
                    </svg>
                  </div>
                  {/* answer */}
                  <p className="hidden text-neutral2 pt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti impedit autem minus, in unde nostrum qui labore
                    ullam asperiores laudantium.
                  </p>
                </button>
              ))}
            </div>
            <div className="w-full flex flex-col gap-2">
              {Array.from({ length: 3 }).map((_, index) => (
                <button
                  key={index}
                  className="w-full text-left py-4 px-6 bg-white rounded-lg cursor-pointer hover:shadow-md focus:shadow-md transition-all ease-in-out duration-200"
                >
                  {/* question */}
                  <div className="flex justify-between items-center">
                    <strong className="font-semibold text-neutral1">
                      Apakah bumi itu bulat?
                    </strong>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="30px"
                      viewBox="0 0 24 24"
                      width="30px"
                      className="fill-neutral1"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z" />
                    </svg>
                  </div>
                  {/* answer */}
                  <p className="hidden text-neutral2 pt-4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Corrupti impedit autem minus, in unde nostrum qui labore
                    ullam asperiores laudantium.
                  </p>
                </button>
              ))}
            </div>
          </div>
        </article>
      </main>

      <footer className="w-full px-2 lg:px-4 py-4">
        <div className="max-w-7xl mx-auto border-t py-10">Bengkel Koding</div>
        <div className="max-w-7xl mx-auto border-t pt-4">@2024 Copyright</div>
      </footer>

      {/* <div className="p-10 flex flex-col gap-2">
        <div className="w-max py-2 px-4 bg-green3 text-green1 rounded-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          autem.
        </div>
        <div className="w-max py-2 px-4 bg-red3 text-red1 rounded-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          autem.
        </div>
        <div className="w-max py-2 px-4 bg-yellow3 text-yellow1 rounded-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          autem.
        </div>
        <div className="w-max py-2 px-4 bg-blue3 text-blue1 rounded-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt,
          autem.
        </div>
      </div> */}
    </div>
  );
};

export default HomePage;
