"use client";

import { useParams } from "next/navigation";
import React from "react";

export default function PenilaianTugas() {
  const params = useParams();
  const penilaian = params.penilaian;

  return (
    <div>
      <p>ini page penilaian id nya {penilaian} </p>
    </div>
  );
}
