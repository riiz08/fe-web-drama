"use client";

import { useEffect, useState, useRef } from "react";

const AdsterraSocialBar = () => {
  const [showSocialBar, setShowSocialBar] = useState(false); // Untuk kontrol Social Bar
  const [isClicked, setIsClicked] = useState(false); // Untuk memastikan klik pertama
  const intervalRef = useRef<NodeJS.Timeout | null>(null); // Menyimpan interval untuk Social Bar

  // Fungsi untuk memunculkan Social Bar
  const showSocialBarAfterInterval = () => {
    // Menampilkan Social Bar jika belum ditampilkan
    if (!isClicked) return;

    setShowSocialBar(true);

    // Mengatur interval untuk menampilkan Social Bar setiap 5 menit
    intervalRef.current = setInterval(() => {
      setShowSocialBar(true); // Menampilkan Social Bar lagi setiap 5 menit
    }, 300000); // 300000 ms = 5 menit
  };

  // Fungsi untuk menangani klik pertama kali
  const handleClick = () => {
    if (!isClicked) {
      setIsClicked(true); // Tandai bahwa sudah di klik pertama kali
      showSocialBarAfterInterval(); // Mulai interval untuk Social Bar
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    // Bersihkan interval saat komponen dibersihkan
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      document.removeEventListener("click", handleClick);
    };
  }, [isClicked]);

  return (
    <>
      {showSocialBar && (
        <div className="social-bar">{/* Style untuk Social Bar */}</div>
      )}
    </>
  );
};

export default AdsterraSocialBar;
