"use client";

import { useEffect, useRef, useState } from "react";

const AdsterraPopUnder = () => {
  const triggeredRef = useRef(false); // Untuk mencegah popunder berulang
  const [showPopunder, setShowPopunder] = useState(false); // Untuk kontrol popunder
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Menyimpan interval untuk 5 menit

  // Fungsi untuk memunculkan popunder
  const triggerPopUnder = () => {
    if (triggeredRef.current) return; // Menghindari popunder berulang saat sudah ditampilkan
    triggeredRef.current = true;

    // Menambahkan script popunder
    const script = document.createElement("script");
    script.src =
      "//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js";
    script.async = true;
    document.body.appendChild(script);

    // Mengatur agar popunder muncul setiap 5 menit setelah klik pertama
    intervalRef.current = setInterval(() => {
      const newScript = document.createElement("script");
      newScript.src =
        "//comelysouthbuilds.com/b2/5a/35/b25a352547c63a8a406bc8114678a2e3.js";
      newScript.async = true;
      document.body.appendChild(newScript);
    }, 300000); // 300000 ms = 5 menit
  };

  // Fungsi untuk handle klik pertama kali
  const handleClick = () => {
    // Hanya jalankan jika belum pernah menampilkan popunder
    if (!triggeredRef.current) {
      triggerPopUnder();
      setShowPopunder(true);
    }
  };

  // Add event listener untuk klik pertama kali
  useEffect(() => {
    document.addEventListener("click", handleClick);

    // Bersihkan interval jika komponen dibersihkan
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return <>{showPopunder && <div></div>}</>;
};

export default AdsterraPopUnder;
