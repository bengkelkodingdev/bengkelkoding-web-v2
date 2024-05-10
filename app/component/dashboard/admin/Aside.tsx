import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";

interface asideProps {
  user: string;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}

const navigations = {
  superadmin: [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
        </svg>
      ),
      title: "Dashboard",
      link: "/dashboard/superadmin",
      child: false,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19c-.6-.32-1.32-.32-1.92 0z" />
        </svg>
      ),
      title: "Kelas",
      link: "/dashboard/superadmin/kelas",
      child: false,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      title: "Pengguna",
      link: "/dashboard/superadmin/pengguna",
      child: true,
      children: [
        {
          title: "Admin",
          link: "/dashboard/superadmin/pengguna/admin",
        },
        {
          title: "Dosen",
          link: "/dashboard/superadmin/pengguna/dosen",
        },
        {
          title: "Asisten",
          link: "/dashboard/superadmin/pengguna/asisten",
        },
        {
          title: "Mahasiswa",
          link: "/dashboard/superadmin/pengguna/mahasiswa",
        },
      ],
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M11.15 3.4L7.43 9.48c-.41.66.07 1.52.85 1.52h7.43c.78 0 1.26-.86.85-1.52L12.85 3.4c-.39-.64-1.31-.64-1.7 0z" />
          <circle cx="17.5" cy="17.5" r="4.5" />
          <path d="M4 21.5h6c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z" />
        </svg>
      ),
      title: "Kategori Kelas",
      link: "/dashboard/superadmin/kategori-kelas",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
        </svg>
      ),
      title: "Kursus",
      link: "/dashboard/superadmin/kursus",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M20 6h-1v8c0 .55-.45 1-1 1H6v1c0 1.1.9 2 2 2h10l4 4V8c0-1.1-.9-2-2-2zm-3 5V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13l4-4h9c1.1 0 2-.9 2-2z" />
        </svg>
      ),
      title: "Pertanyaan",
      link: "/dashboard/superadmin/pertanyaan",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1zm6 5H7c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm4-6H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      ),
      title: "Feedback",
      link: "/dashboard/superadmin/feedback",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <rect fill="none" height="24" width="24" y="0" />
          <path d="M12.97,2.54c-0.6-0.34-1.34-0.34-1.94,0l-7,3.89L9.1,9.24C9.83,8.48,10.86,8,12,8s2.17,0.48,2.9,1.24l5.07-2.82L12.97,2.54z M10,12c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S10,13.1,10,12z M3,8.14l5.13,2.85C8.04,11.31,8,11.65,8,12c0,1.86,1.27,3.43,3,3.87 v5.57l-6.97-3.87C3.39,17.22,3,16.55,3,15.82V8.14z M13,21.44v-5.57c1.73-0.44,3-2.01,3-3.87c0-0.35-0.04-0.69-0.13-1.01L21,8.14 l0,7.68c0,0.73-0.39,1.4-1.03,1.75L13,21.44z" />
        </svg>
      ),
      title: "Token",
      link: "/dashboard/superadmin/token",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g>
              <path d="M19,19H3V7c0-0.55-0.45-1-1-1S1,6.45,1,7v12c0,1.1,0.9,2,2,2h16c0.55,0,1-0.45,1-1S19.55,19,19,19z" />
              <path d="M21,4h-7l-1.41-1.41C12.21,2.21,11.7,2,11.17,2H7C5.9,2,5.01,2.9,5.01,4L5,15c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6 C23,4.9,22.1,4,21,4z M18,13h-8c-0.41,0-0.65-0.47-0.4-0.8l1.38-1.83c0.2-0.27,0.6-0.27,0.8,0L13,12l2.22-2.97 c0.2-0.27,0.6-0.27,0.8,0l2.38,3.17C18.65,12.53,18.41,13,18,13z" />
            </g>
          </g>
        </svg>
      ),
      title: "Aset Gambar",
      link: "/dashboard/superadmin/aset-gambar",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <g>
            <rect fill="none" height="24" width="24" />
            <path d="M19,3H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V5C21,3.9,20.1,3,19,3z M8,17L8,17c-0.55,0-1-0.45-1-1v-3 c0-0.55,0.45-1,1-1s1,0.45,1,1v3C9,16.55,8.55,17,8,17z M12,17L12,17c-0.55,0-1-0.45-1-1v-1c0-0.55,0.45-1,1-1s1,0.45,1,1v1 C13,16.55,12.55,17,12,17z M12,12c-0.55,0-1-0.45-1-1s0.45-1,1-1s1,0.45,1,1S12.55,12,12,12z M16,17L16,17c-0.55,0-1-0.45-1-1V8 c0-0.55,0.45-1,1-1s1,0.45,1,1v8C17,16.55,16.55,17,16,17z" />
          </g>
        </svg>
      ),
      title: "Log Aktivitas",
      link: "/dashboard/superadmin/log-aktivitas",
    },
  ],
  admin: [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
        </svg>
      ),
      title: "Dashboard",
      link: "/dashboard/admin",
      child: false,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19c-.6-.32-1.32-.32-1.92 0z" />
        </svg>
      ),
      title: "Kelas",
      link: "/dashboard/admin/kelas",
      child: false,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      ),
      title: "Pengguna",
      link: "/dashboard/admin/pengguna",
      child: true,
      children: [
        {
          title: "Dosen",
          link: "/dashboard/admin/pengguna/dosen",
        },
        {
          title: "Asisten",
          link: "/dashboard/admin/pengguna/asisten",
        },
        {
          title: "Mahasiswa",
          link: "/dashboard/admin/pengguna/mahasiswa",
        },
      ],
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M11.15 3.4L7.43 9.48c-.41.66.07 1.52.85 1.52h7.43c.78 0 1.26-.86.85-1.52L12.85 3.4c-.39-.64-1.31-.64-1.7 0z" />
          <circle cx="17.5" cy="17.5" r="4.5" />
          <path d="M4 21.5h6c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1z" />
        </svg>
      ),
      title: "Kategori Kelas",
      link: "/dashboard/admin/kategori-kelas",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z" />
        </svg>
      ),
      title: "Kursus",
      link: "/dashboard/admin/kursus",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M20 6h-1v8c0 .55-.45 1-1 1H6v1c0 1.1.9 2 2 2h10l4 4V8c0-1.1-.9-2-2-2zm-3 5V4c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v13l4-4h9c1.1 0 2-.9 2-2z" />
        </svg>
      ),
      title: "Pertanyaan",
      link: "/dashboard/admin/pertanyaan",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 9h10c.55 0 1 .45 1 1s-.45 1-1 1H7c-.55 0-1-.45-1-1s.45-1 1-1zm6 5H7c-.55 0-1-.45-1-1s.45-1 1-1h6c.55 0 1 .45 1 1s-.45 1-1 1zm4-6H7c-.55 0-1-.45-1-1s.45-1 1-1h10c.55 0 1 .45 1 1s-.45 1-1 1z" />
        </svg>
      ),
      title: "Feedback",
      link: "/dashboard/admin/feedback",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <rect fill="none" height="24" width="24" y="0" />
          <path d="M12.97,2.54c-0.6-0.34-1.34-0.34-1.94,0l-7,3.89L9.1,9.24C9.83,8.48,10.86,8,12,8s2.17,0.48,2.9,1.24l5.07-2.82L12.97,2.54z M10,12c0-1.1,0.9-2,2-2s2,0.9,2,2s-0.9,2-2,2S10,13.1,10,12z M3,8.14l5.13,2.85C8.04,11.31,8,11.65,8,12c0,1.86,1.27,3.43,3,3.87 v5.57l-6.97-3.87C3.39,17.22,3,16.55,3,15.82V8.14z M13,21.44v-5.57c1.73-0.44,3-2.01,3-3.87c0-0.35-0.04-0.69-0.13-1.01L21,8.14 l0,7.68c0,0.73-0.39,1.4-1.03,1.75L13,21.44z" />
        </svg>
      ),
      title: "Token",
      link: "/dashboard/admin/token",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          enable-background="new 0 0 24 24"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <g>
            <rect fill="none" height="24" width="24" />
          </g>
          <g>
            <g>
              <path d="M19,19H3V7c0-0.55-0.45-1-1-1S1,6.45,1,7v12c0,1.1,0.9,2,2,2h16c0.55,0,1-0.45,1-1S19.55,19,19,19z" />
              <path d="M21,4h-7l-1.41-1.41C12.21,2.21,11.7,2,11.17,2H7C5.9,2,5.01,2.9,5.01,4L5,15c0,1.1,0.9,2,2,2h14c1.1,0,2-0.9,2-2V6 C23,4.9,22.1,4,21,4z M18,13h-8c-0.41,0-0.65-0.47-0.4-0.8l1.38-1.83c0.2-0.27,0.6-0.27,0.8,0L13,12l2.22-2.97 c0.2-0.27,0.6-0.27,0.8,0l2.38,3.17C18.65,12.53,18.41,13,18,13z" />
            </g>
          </g>
        </svg>
      ),
      title: "Aset Gambar",
      link: "/dashboard/admin/aset-gambar",
    },
  ],
  dosen: [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
        </svg>
      ),
      title: "Dashboard",
      link: "/dashboard/dosen",
      child: false,
      children: null,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19c-.6-.32-1.32-.32-1.92 0z" />
        </svg>
      ),
      title: "Kelas",
      link: "/dashboard/dosen/kelas",
      child: false,
      children: null,
    },
  ],
  asisten: [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zm0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1zm10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1zM13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1z" />
        </svg>
      ),
      title: "Dashboard",
      link: "/dashboard/asisten",
      child: false,
      children: null,
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 0 24 24"
          width="24px"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path d="M5 13.18v2.81c0 .73.4 1.41 1.04 1.76l5 2.73c.6.33 1.32.33 1.92 0l5-2.73c.64-.35 1.04-1.03 1.04-1.76v-2.81l-6.04 3.3c-.6.33-1.32.33-1.92 0L5 13.18zm6.04-9.66-8.43 4.6c-.69.38-.69 1.38 0 1.76l8.43 4.6c.6.33 1.32.33 1.92 0L21 10.09V16c0 .55.45 1 1 1s1-.45 1-1V9.59c0-.37-.2-.7-.52-.88l-9.52-5.19c-.6-.32-1.32-.32-1.92 0z" />
        </svg>
      ),
      title: "Kelas",
      link: "/dashboard/asisten/kelas",
      child: false,
      children: null,
    },
  ],
};

const Aside = ({ user, open, setOpen }: asideProps) => {
  const pathname = usePathname();

  let userNavigations;

  switch (user) {
    case "superadmin":
      userNavigations = navigations.superadmin;
      break;
    case "admin":
      userNavigations = navigations.admin;
      break;
    case "dosen":
      userNavigations = navigations.dosen;
      break;
    case "asisten":
      userNavigations = navigations.asisten;
      break;
    default:
      break;
  }

  const [childrenIsOpen, setChildrenIsOpen] = useState(false);

  const toggleChildren = () => {
    setChildrenIsOpen(!childrenIsOpen);
  };

  const setOpenFalse = () => {
    setOpen(false);
  }

  return (
    <div className="fixed h-screen">
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 bg-white border-r border-neutral4 transition-transform transform ${
          open
            ? "block translate-x-0  transition ease-in duration-300"
            : "sm:block sm:translate-x-0 -translate-x-full transition ease-out duration-300"
        }`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white">
          <ul className="space-y-2 font-medium">
            {userNavigations?.map((nav, index) =>
              nav.child ? (
                <li key={index}>
                  <button
                    type="button"
                    className="flex items-center w-full p-2 text-neutral1 fill-neutral1 rounded-lg hover:bg-primary5 transition-all ease-in-out duration-200"
                    aria-controls="dropdown-example"
                    data-collapse-toggle="dropdown-example"
                    onClick={toggleChildren}
                  >
                    {nav.icon}
                    <span className="flex-1 ms-3 text-left whitespace-nowrap">
                      {nav.title}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      className={`${childrenIsOpen && "rotate-180"}`}
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path d="M8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71z" />
                    </svg>
                  </button>
                  {childrenIsOpen && (
                    <ul id="dropdown-example" className="py-2 space-y-2">
                      {nav.children?.map((nc, i) => (
                        <li key={i}>
                          <Link
                            href={nc.link}
                            className={`flex items-center p-2 pl-11 text-neutral1 fill-neutral1 rounded-lg transition-all ease-in-out duration-200 ${
                              nc.link == pathname
                                ? "bg-primary1 text-white fill-white"
                                : "hover:bg-primary5"
                            }`}
                          >
                            {nc.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={index}>
                  <Link
                    href={nav.link}
                    className={`flex items-center p-2 text-neutral1 fill-neutral1 rounded-lg transition-all ease-in-out duration-200 ${
                      nav.link == pathname
                        ? "bg-primary1 text-white fill-white"
                        : "hover:bg-primary5"
                    }`}
                  >
                    {nav.icon}
                    <span className="ms-3">{nav.title}</span>
                  </Link>
                </li>
              )
            )}
          </ul>
          <div className="w-full h-0.5 my-4 bg-neutral4" />
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href={`/dashboard/${user}/profile`}
                className={`flex items-center p-2 text-neutral1 fill-neutral1 rounded-lg transition-all ease-in-out duration-200 ${
                  `/dashboard/${user}/profile` == pathname
                    ? "bg-primary1 text-white fill-white"
                    : "hover:bg-primary5"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <g>
                    <rect fill="none" height="24" width="24" />
                    <rect fill="none" height="24" width="24" />
                  </g>
                  <g>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z" />
                  </g>
                </svg>
                <span className="ms-3">Profile</span>
              </Link>
            </li>
            <li>
              <button className="flex items-center w-full p-2 text-neutral1 fill-neutral1 rounded-lg hover:bg-red3 hover:text-red1 hover:fill-red1 focus:bg-red1 focus:text-white focus:fill-white focus:ring-4 focus:ring-red3 transition-all ease-in-out duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  enable-background="new 0 0 24 24"
                  height="24px"
                  viewBox="0 0 24 24"
                  width="24px"
                >
                  <g>
                    <path d="M0,0h24v24H0V0z" fill="none" />
                  </g>
                  <g>
                    <g>
                      <path d="M5,5h6c0.55,0,1-0.45,1-1v0c0-0.55-0.45-1-1-1H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h6c0.55,0,1-0.45,1-1v0 c0-0.55-0.45-1-1-1H5V5z" />
                      <path d="M20.65,11.65l-2.79-2.79C17.54,8.54,17,8.76,17,9.21V11h-7c-0.55,0-1,0.45-1,1v0c0,0.55,0.45,1,1,1h7v1.79 c0,0.45,0.54,0.67,0.85,0.35l2.79-2.79C20.84,12.16,20.84,11.84,20.65,11.65z" />
                    </g>
                  </g>
                </svg>
                <span className="ms-3">Keluar</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
      <div
        className={`fixed w-full h-screen backdrop-blur-md bg-white/10 ${
          open ? "block" : "hidden sm:hidden"
        }`}
        onClick={setOpenFalse}
      />
    </div>
  );
};

export default Aside;
