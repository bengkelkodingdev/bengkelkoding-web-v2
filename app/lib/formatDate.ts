export const formatDate = (dateString: string) => {
  if (!dateString) {
    return "N/A";
  }

  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

// class penugasan
// Fungsi untuk mengambil nama hari
export const dayFormated = (startTime: string | number | Date) => {
  const date = new Date(startTime);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date");
  }
  const options: Intl.DateTimeFormatOptions = { weekday: "long" };
  return date.toLocaleDateString("id-ID", options);
};

// Fungsi untuk mengambil waktu (jam)
export const hourFormated = (startTime) => {
  const date = new Date(startTime);
  return date.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Fungsi untuk mengambil tanggal (dd-mm-yyyy)
export const dateFormated = (startTime) => {
  const date = new Date(startTime);
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};
