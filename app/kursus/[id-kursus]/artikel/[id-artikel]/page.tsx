"use client";
import { getDetailArticles, getListArticles } from "@/app/api/student/course";
import { marked } from "marked";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import dynamic from "next/dynamic";

const MarkdownReader = dynamic(
  () => import("@/app/component/general/MarkdownReader"),
  { ssr: false }
);

const ArticlesPage = () => {
  const current_classroom_id = Cookies.get("current_classroom_id");
  const url = usePathname();
  const pathParts = url.split("/");
  const idKursus = Number(pathParts[2]);
  const idArtikel = Number(pathParts[4]);

  const [listArticles, setListArticles] = useState({
    id: 0,
    title: "",
    course_progress: 0,
    sections: [
      {
        id: 0,
        name: "",
        sort_order: 0,
        articles: [
          {
            id: 0,
            title: "",
            sort_order: 0,
            completed: false,
          },
        ],
      },
    ],
  });
  const [detailArticle, setDetailArticle] = useState({
    id: 0,
    section_id: 0,
    title: "",
    content: "",
    sort_order: 0,
    next: {
      id: 0,
      name: "",
    },
    prev: {
      id: 0,
      name: "",
    },
  });

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [expandedSections, setExpandedSections] = useState(new Set());

  useEffect(() => {
    const storedNavVisible = localStorage.getItem("isNavVisible");
    const storedExpandedSections = localStorage.getItem("expandedSections");
    if (storedNavVisible !== null) {
      setIsNavVisible(JSON.parse(storedNavVisible));
    }
    if (storedExpandedSections !== null) {
      setExpandedSections(new Set(JSON.parse(storedExpandedSections)));
    }
  }, []);

  const toggleNavVisibility = () => {
    setIsNavVisible((prev) => {
      const newValue = !prev;
      localStorage.setItem("isNavVisible", JSON.stringify(newValue));
      return newValue;
    });
  };

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => {
      const newExpandedSections = new Set(prev);
      if (newExpandedSections.has(sectionId)) {
        newExpandedSections.delete(sectionId);
      } else {
        newExpandedSections.add(sectionId);
      }
      localStorage.setItem(
        "expandedSections",
        JSON.stringify(Array.from(newExpandedSections))
      );
      return newExpandedSections;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      // Response List Articles
      const responseListArticles = await getListArticles(idKursus);
      setListArticles(responseListArticles.data);
      // Response Detail Article
      const responseDetailArticle = await getDetailArticles(
        idKursus,
        idArtikel
      );
      setDetailArticle(responseDetailArticle.data);
    };
    fetchData();
  }, [idKursus, idArtikel]);

  // const text = marked(detailArticle.content);
  const markdownToHtml = marked(detailArticle.content);

  const renderIcon = (isCompleted: boolean) => {
    if (isCompleted) {
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="16px"
          viewBox="0 -960 960 960"
          width="16px"
          className="w-4 h-4 fill-green-600"
        >
          <path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z" />
        </svg>
      );
    }
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="16px"
        viewBox="0 -960 960 960"
        width="16px"
        className="w-4 h-4"
      >
        <path d="M240-80q-33 0-56.5-23.5T160-160v-400q0-33 23.5-56.5T240-640h40v-80q0-83 58.5-141.5T480-920q83 0 141.5 58.5T680-720v80h40q33 0 56.5 23.5T800-560v400q0 33-23.5 56.5T720-80H240Zm0-80h480v-400H240v400Zm240-120q33 0 56.5-23.5T560-360q0-33-23.5-56.5T480-440q-33 0-56.5 23.5T400-360q0 33 23.5 56.5T480-280ZM360-640h240v-80q0-50-35-85t-85-35q-50 0-85 35t-35 85v80ZM240-160v-400 400Z" />
      </svg>
    );
  };

  return (
    <div
      className="fixed scroll-smooth min-h-screen max-h-screen w-screen flex flex-col"
      data-color-mode="light"
    >
      <header className="flex-shrink-0 px-10 py-4 border-b flex justify-between items-center">
        <Link
          href={`/dashboard/student/classroom/${current_classroom_id}`}
          className="w-max p-2 hover:bg-neutral5 text-black flex gap-2 rounded-sm items-center font-medium"
        >
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="m313-440 196 196q12 12 11.5 28T508-188q-12 11-28 11.5T452-188L188-452q-6-6-8.5-13t-2.5-15q0-8 2.5-15t8.5-13l264-264q11-11 27.5-11t28.5 11q12 12 12 28.5T508-715L313-520h447q17 0 28.5 11.5T800-480q0 17-11.5 28.5T760-440H313Z" />
            </svg>
          </div>
          <p>{listArticles.title}</p>
        </Link>
        <div className="block lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
          >
            <path d="M320-600q-17 0-28.5-11.5T280-640q0-17 11.5-28.5T320-680h480q17 0 28.5 11.5T840-640q0 17-11.5 28.5T800-600H320Zm0 160q-17 0-28.5-11.5T280-480q0-17 11.5-28.5T320-520h480q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H320Zm0 160q-17 0-28.5-11.5T280-320q0-17 11.5-28.5T320-360h480q17 0 28.5 11.5T840-320q0 17-11.5 28.5T800-280H320ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
          </svg>
        </div>
      </header>
      <main className="flex flex-1 overflow-hidden">
        {isNavVisible ? (
          <nav className="w-80 max-h-screen border-r flex-shrink-0 flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <p className="text-2xl font-semibold">List Artikel</p>
              <div className="cursor-pointer" onClick={toggleNavVisibility}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30px"
                  viewBox="0 -960 960 960"
                  width="30px"
                  fill="#000000"
                >
                  <path d="M526-314 381-459q-5-5-7-10t-2-11q0-6 2-11t7-10l145-145q3-3 6.5-4.5t7.5-1.5q8 0 14 5.5t6 14.5v304q0 9-6 14.5t-14 5.5q-2 0-14-6Z" />
                </svg>
              </div>
            </div>
            {/* Progress Kursus */}
            <div className="border-b p-4 bg-neutral5">
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-primary2 h-1.5 rounded-full"
                  style={{ width: `${listArticles.course_progress}%` }}
                ></div>
              </div>
              <p className="text-xs mt-1">
                {listArticles.course_progress}% Selesai
              </p>
            </div>
            {/* List Artikel */}
            <div className="flex-1 overflow-y-auto px-4 py-2">
              {listArticles.sections.map((section) => (
                <div key={section.id} className="mb-4">
                  <div
                    className="cursor-pointer font-semibold flex justify-between items-center gap-2"
                    onClick={() => toggleSection(section.id)}
                  >
                    <p>{section.name}</p>
                    <span className="fill-neutral3">
                      {expandedSections.has(section.id) ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                        >
                          <path d="M328-400q-9 0-14.5-6t-5.5-14q0-2 6-14l145-145q5-5 10-7t11-2q6 0 11 2t10 7l145 145q3 3 4.5 6.5t1.5 7.5q0 8-5.5 14t-14.5 6H328Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                        >
                          <path d="M459-381 314-526q-3-3-4.5-6.5T308-540q0-8 5.5-14t14.5-6h304q9 0 14.5 6t5.5 14q0 2-6 14L501-381q-5 5-10 7t-11 2q-6 0-11-2t-10-7Z" />
                        </svg>
                      )}
                    </span>
                  </div>
                  {expandedSections.has(section.id) && (
                    <div className="ml-2 mt-2">
                      {section.articles.map((article) => (
                        <Link
                          key={article.id}
                          href={`${
                            article.completed == false ? "#" : `${article.id}`
                          }`}
                          className={`flex items-center hover:underline cursor-pointer py-1 gap-3 ${
                            article.id == idArtikel
                              ? "text-black font-semibold"
                              : "text-neutral2"
                          }`}
                        >
                          <div>
                            {article.id == idArtikel &&
                            article.completed == false ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="16px"
                                viewBox="0 -960 960 960"
                                width="16px"
                                className="w-4 h-4 fill-green-600"
                              >
                                <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z" />
                              </svg>
                            ) : (
                              renderIcon(article.completed)
                            )}
                          </div>
                          <p>{article.title}</p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </nav>
        ) : (
          <nav
            className="hidden lg:block mt-4 bg-primary2 fill-white pl-2 pr-4 py-2 rounded-r-full h-max cursor-pointer"
            onClick={toggleNavVisibility}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="M320-600q-17 0-28.5-11.5T280-640q0-17 11.5-28.5T320-680h480q17 0 28.5 11.5T840-640q0 17-11.5 28.5T800-600H320Zm0 160q-17 0-28.5-11.5T280-480q0-17 11.5-28.5T320-520h480q17 0 28.5 11.5T840-480q0 17-11.5 28.5T800-440H320Zm0 160q-17 0-28.5-11.5T280-320q0-17 11.5-28.5T320-360h480q17 0 28.5 11.5T840-320q0 17-11.5 28.5T800-280H320ZM160-600q-17 0-28.5-11.5T120-640q0-17 11.5-28.5T160-680q17 0 28.5 11.5T200-640q0 17-11.5 28.5T160-600Zm0 160q-17 0-28.5-11.5T120-480q0-17 11.5-28.5T160-520q17 0 28.5 11.5T200-480q0 17-11.5 28.5T160-440Zm0 160q-17 0-28.5-11.5T120-320q0-17 11.5-28.5T160-360q17 0 28.5 11.5T200-320q0 17-11.5 28.5T160-280Z" />
            </svg>
          </nav>
        )}
        <article className="w-full py-4 overflow-auto">
          {/* <div
            dangerouslySetInnerHTML={{ __html: text }}
            className="prose prose-slate mx-auto"
          /> */}
          {/* <MarkdownEditor.Markdown source={detailArticle.content} className="prose prose-slate mx-auto" /> */}
          <div className="w-[50%] p-4 prose prose-slate mx-auto">
            <MarkdownReader content={markdownToHtml.toString()} />
          </div>
        </article>
      </main>
      <footer className="flex-shrink-0 grid grid-cols-3 px-10 py-4 border-t">
        <div>
          {detailArticle.prev !== null && (
            <Link
              href={detailArticle.prev.id.toString()}
              className="w-max p-2 hover:bg-neutral5 text-neutral2 hover:text-black flex gap-2 rounded-sm"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M526-314 381-459q-5-5-7-10t-2-11q0-6 2-11t7-10l145-145q3-3 6.5-4.5t7.5-1.5q8 0 14 5.5t6 14.5v304q0 9-6 14.5t-14 5.5q-2 0-14-6Z" />
                </svg>
              </div>
              <p className="hidden lg:block">{detailArticle.prev.name}</p>
            </Link>
          )}
        </div>
        <div className="text-center">
          <p className="p-2 text-black truncate">{detailArticle.title}</p>
        </div>
        <div className="flex justify-end">
          {detailArticle.next !== null && (
            <Link
              href={detailArticle.next.id.toString()}
              className="w-max justify-end p-2 hover:bg-neutral5 text-neutral2 hover:text-black flex gap-2 rounded-sm"
            >
              <p className="hidden lg:block">{detailArticle.next.name}</p>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#000000"
                >
                  <path d="M420-308q-8 0-14-5.5t-6-14.5v-304q0-9 6-14.5t14-5.5q2 0 14 6l145 145q5 5 7 10t2 11q0 6-2 11t-7 10L434-314q-3 3-6.5 4.5T420-308Z" />
                </svg>
              </div>
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
};

export default ArticlesPage;
