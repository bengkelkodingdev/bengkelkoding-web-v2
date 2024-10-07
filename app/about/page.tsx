"use client";
import React, { useEffect, useState } from "react";
import Header from "../component/general/Header";
import Footer from "../component/general/Footer";
import Image from "next/image";
import Link from "next/link";
import { getAboutStatistics } from "../api/aboutPage";

const AboutPage = () => {
  const [dataStatistics, setDataStatistics] = useState([
    {
      active_assistants: 0,
      active_students: 0,
      total_classrooms: 0,
      total_courses: 0,
    },
  ]);
  const labelStatistics = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-full"
        >
          <path d="M242-249q-20-11-31-29.5T200-320v-192l-96-53q-11-6-16-15t-5-20q0-11 5-20t16-15l338-184q9-5 18.5-7.5T480-829q10 0 19.5 2.5T518-819l381 208q10 5 15.5 14.5T920-576v256q0 17-11.5 28.5T880-280q-17 0-28.5-11.5T840-320v-236l-80 44v192q0 23-11 41.5T718-249L518-141q-9 5-18.5 7.5T480-131q-10 0-19.5-2.5T442-141L242-249Zm238-203 274-148-274-148-274 148 274 148Zm0 241 200-108v-151l-161 89q-9 5-19 7.5t-20 2.5q-10 0-20-2.5t-19-7.5l-161-89v151l200 108Zm0-241Zm0 121Zm0 0Z" />
        </svg>
      ),
      label: "Mahasiswa aktif yang telah bergabung",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-full"
        >
          <path d="M40-272q0-34 17.5-62.5T104-378q62-31 126-46.5T360-440q66 0 130 15.5T616-378q29 15 46.5 43.5T680-272v32q0 33-23.5 56.5T600-160H120q-33 0-56.5-23.5T40-240v-32Zm800 112H738q11-18 16.5-38.5T760-240v-40q0-44-24.5-84.5T666-434q51 6 96 20.5t84 35.5q36 20 55 44.5t19 53.5v40q0 33-23.5 56.5T840-160ZM360-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47Zm400-160q0 66-47 113t-113 47q-11 0-28-2.5t-28-5.5q27-32 41.5-71t14.5-81q0-42-14.5-81T544-792q14-5 28-6.5t28-1.5q66 0 113 47t47 113ZM120-240h480v-32q0-11-5.5-20T580-306q-54-27-109-40.5T360-360q-56 0-111 13.5T140-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T440-640q0-33-23.5-56.5T360-720q-33 0-56.5 23.5T280-640q0 33 23.5 56.5T360-560Zm0 320Zm0-400Z" />
        </svg>
      ),
      label: "Asisten yang aktif membimbing",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-full"
        >
          <path d="M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h480q33 0 56.5 23.5T800-800v640q0 33-23.5 56.5T720-80H240Zm0-80h480v-640h-80v245q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555v-245H240v640Zm0 0v-640 640Zm200-395q0 12 10.5 17.5t20.5-.5l49-30q10-6 20.5-6t20.5 6l49 30q10 6 20 .5t10-17.5q0 12-10 17.5t-20-.5l-49-30q-10-6-20.5-6t-20.5 6l-49 30q-10 6-20.5.5T440-555Z" />
        </svg>
      ),
      label: "Kelas yang sudah aktif",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 -960 960 960"
          className="w-full"
        >
          <path d="M440-400h80q17 0 28.5-11.5T560-440q0-17-11.5-28.5T520-480h-80q-17 0-28.5 11.5T400-440q0 17 11.5 28.5T440-400Zm0-120h240q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H440q-17 0-28.5 11.5T400-560q0 17 11.5 28.5T440-520Zm0-120h240q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H440q-17 0-28.5 11.5T400-680q0 17 11.5 28.5T440-640ZM320-240q-33 0-56.5-23.5T240-320v-480q0-33 23.5-56.5T320-880h480q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H320Zm0-80h480v-480H320v480ZM160-80q-33 0-56.5-23.5T80-160v-520q0-17 11.5-28.5T120-720q17 0 28.5 11.5T160-680v520h520q17 0 28.5 11.5T720-120q0 17-11.5 28.5T680-80H160Zm160-720v480-480Z" />
        </svg>
      ),
      label: "Kursus yang telah tersedia",
    },
  ];

  const timDevs = [
    {
      image:
        "https://mahasiswa.dinus.ac.id/images/foto/A/A11/2021/A11.2021.13480.jpg",
      name: "Arif Saputra",
      nim: "A11.2021.13480",
      role: "Web Developer",
      social: {
        linkedin: "https://www.linkedin.com/in/arifsptrra/",
        github: "https://github.com/arifsaputradev",
      },
    },
    {
      image:
        "https://mahasiswa.dinus.ac.id/images/foto/A/A11/2021/A11.2021.13716.jpg",
      name: "Samuel Andrey Aji Prasetya",
      nim: "A11.2021.13716",
      role: "System Developer",
      social: {
        linkedin: "https://www.linkedin.com/in/samuel-andrey/",
        github: "https://github.com/SamuelAndrey",
      },
    },
    {
      image:
        "https://mahasiswa.dinus.ac.id/images/foto/A/A11/2021/A11.2021.13398.jpg",
      name: "Rayhan Ashlikh Rosyada",
      nim: "A11.2021.13398",
      role: "System Developer",
      social: {
        linkedin:
          "https://www.linkedin.com/in/rayhan-ashlikh-rosyada-598155197/",
        github: "https://github.com/rayhanashlikh",
      },
    },
    {
      image:
        "https://mahasiswa.dinus.ac.id/images/foto/A/A11/2021/A11.2021.13717.jpg",
      name: "Muhamad Alif Anwar",
      nim: "A11.2021.13717",
      role: "Web Developer",
      social: {
        linkedin: "https://www.linkedin.com/in/muhamad-alif-anwar/",
        github: "https://github.com/Hypes-Astro",
      },
    },
    {
      image:
        "https://mahasiswa.dinus.ac.id/images/foto/A/A11/2021/A11.2021.13639.jpg",
      name: "Muhamad Fannan Najma Falahi",
      nim: "A11.2021.13639",
      role: "Mobile Developer",
      social: {
        linkedin:
          "https://www.linkedin.com/in/muhamad-fannan-najma-falahi-4011411b4/",
        github: "https://github.com/Fannannf",
      },
    },
    {
      image:
        "https://mahasiswa.dinus.ac.id/images/foto/A/A11/2021/A11.2021.13406.jpg",
      name: "Shaka Arisya",
      nim: "A11.2021.13406",
      role: "Mobile Developer",
      social: {
        linkedin: "https://www.linkedin.com/in/shaka-arisya/",
        github: "https://github.com/ShakaArs",
      },
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      // Response Statistics
      const responseStatistics = await getAboutStatistics();
      setDataStatistics(responseStatistics.data);
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#f7f9fa] z-50">
      <Header />

      <main className="w-full px-5 md:px-4 py-4 min-h-screen">
        <article
          className="max-w-5xl bg-primary1 text-white rounded-xl p-6 2xl:p-10 mx-auto my-10 bg-no-repeat bg-cover"
          style={{ backgroundImage: "url('/img/h6-large.png')" }}
        >
          <div className="flex flex-col md:flex-row gap-6 md:gap-10">
            <div className="min-w-max p-4 bg-white bg-opacity-80 gap-2 rounded-md h-max w-max">
              <Image
                src={"/logo/bengkelkoding-text.png"}
                alt="Bengkod"
                width={150}
                height={150}
              />
            </div>
            <p className="text-sm md:text-base">
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

        <article className="max-w-5xl mx-auto mb-10 lg:mb-20 flex gap-4 lg:gap-20 justify-center flex-wrap md:flex-nowrap">
          {/* Active Student */}
          <div className="w-64 md:w-44">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 p-1">{labelStatistics[0].icon}</div>
              <p className="text-2xl">{dataStatistics[0].active_students}</p>
            </div>
            <p className=" text-sm text-neutral2">{labelStatistics[0].label}</p>
          </div>
          {/* Active Assistant */}
          <div className="w-64 md:w-44 text-end md:text-start">
            <div className="flex gap-2 items-center justify-end md:justify-start">
              <div className="w-10 h-10 p-1">{labelStatistics[1].icon}</div>
              <p className="text-2xl">{dataStatistics[0].active_assistants}</p>
            </div>
            <p className=" text-sm text-neutral2">{labelStatistics[1].label}</p>
          </div>
          {/* Class */}
          <div className="w-64 md:w-44">
            <div className="flex gap-2 items-center">
              <div className="w-10 h-10 p-1">{labelStatistics[2].icon}</div>
              <p className="text-2xl">{dataStatistics[0].total_classrooms}</p>
            </div>
            <p className=" text-sm text-neutral2">{labelStatistics[2].label}</p>
          </div>
          {/* Course */}
          <div className="w-64 md:w-44 text-end md:text-start">
            <div className="flex gap-2 items-center justify-end md:justify-start">
              <div className="w-10 h-10 p-1">{labelStatistics[3].icon}</div>
              <p className="text-2xl">{dataStatistics[0].total_courses}</p>
            </div>
            <p className=" text-sm text-neutral2">{labelStatistics[3].label}</p>
          </div>
        </article>

        {/* <article className="max-w-5xl mx-auto my-10 lg:mb-20 grid grid-cols-3 gap-8">
          <div>
            <div className="w-full max-h-72 overflow-hidden rounded-lg">
              <Image
                src={
                  "https://mahasiswa.dinus.ac.id/images/foto/A/A11/2021/A11.2021.13480.jpg"
                }
                alt="Mahasiswa"
                width={1000}
                height={1000}
                className="w-full"
              />
            </div>
            <div className="mt-2 flex flex-col gap-1">
              <p className="font-semibold text-lg">Arif Saputra</p>
              <p className="font-medium text-base text-neutral2">
                A11.2021.13480
              </p>
              <p className="font-medium text-base text-neutral2">
                Ketua Program Studi S1 - Teknik Informatika
              </p>
            </div>
          </div>
      </article> */}

        <article className="max-w-5xl mx-auto my-6 md:my-10">
          <div className="pb-10 text-center">
            <h2 className="font-bold bg-gradient-to-r from-blue-700 to-cyan-600 bg-clip-text text-transparent text-center">
              Tim Developer
            </h2>
            <p className="text-neutral2">Bengkel Koding</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {timDevs.map((person, index) => (
              <div key={index}>
                <div className="w-full max-h-72 overflow-hidden rounded-lg">
                  <Image
                    src={person.image}
                    alt="Mahasiswa"
                    width={1000}
                    height={1000}
                    className="w-full"
                  />
                </div>
                <div className="mt-2 flex flex-col gap-1">
                  <p className="font-semibold text-lg">{person.name}</p>
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-base text-neutral2">
                      {person.nim}
                    </p>
                    <div className="flex gap-1 items-center">
                      <Link
                        href={person.social.linkedin}
                        target="_blank"
                        className="w-6 fill-neutral2 hover:fill-blue-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                        >
                          <path d="M25,2C12.318,2,2,12.317,2,25s10.318,23,23,23s23-10.317,23-23S37.682,2,25,2z M18,35h-4V20h4V35z M16,17c-1.105,0-2-0.895-2-2c0-1.105,0.895-2,2-2s2,0.895,2,2C18,16.105,17.105,17,16,17z M37,35h-4v-5v-2.5c0-1.925-1.575-3.5-3.5-3.5S26,25.575,26,27.5V35h-4V20h4v1.816C27.168,20.694,28.752,20,30.5,20c3.59,0,6.5,2.91,6.5,6.5V35z" />
                        </svg>
                      </Link>
                      <Link
                        href={person.social.github}
                        target="_blank"
                        className="w-6 fill-neutral2 hover:fill-black"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 50 50"
                        >
                          <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25C2,35.164,8.63,43.804,17.791,46.836z" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <p className="font-medium text-base text-neutral2">
                    {person.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
