export interface Meeting {
  id: number;
  date: string;
  time: string;
  room: string;
  status: string;
}

const meetings: Meeting[] = [
  {
    id: 1,
    date: "16 Juni 2024",
    time: "09:00 - 12:00 WIB",
    room: "H.6.2",
    status: "Aktif",
  },
  {
    id: 2,
    date: "23 Juni 2024",
    time: "13:00 - 16:00 WIB",
    room: "H.6.3",
    status: "Tidak Aktif",
  },
  {
    id: 3,
    date: "3 Juli 2024",
    time: "13:00 - 16:00 WIB",
    room: "H.6.2",
    status: "Tidak Aktif",
  },
  {
    id: 4,
    date: "3 Juli 2024",
    time: "13:00 - 16:00 WIB",
    room: "H.6.2",
    status: "Tidak Aktif",
  },
  {
    id: 5,
    date: "3 Juli 2024",
    time: "13:00 - 16:00 WIB",
    room: "H.6.2",
    status: "Aktif",
  },
  {
    id: 6,
    date: "3 Juli 2024",
    time: "13:00 - 16:00 WIB",
    room: "H.6.2",
    status: "Tidak Aktif",
  },
  // Tambahkan data pertemuan lainnya di sini
];

export default meetings;
