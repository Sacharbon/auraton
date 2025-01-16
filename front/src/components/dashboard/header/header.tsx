"use client";

import Acceuil from "@/assets/Acceuil";
import Ranking from "@/assets/Ranking";
import Calendar from "@/assets/Calendar";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import ReactModal from "react-modal";
import EventModal from "./addEvent";

export default function Header() {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState(false);

  const isActive = (path: any) => pathname === path;

  return (
    <div className="h-full w-full flex flex-row justify-between items-center">
      <p className="font-semibold text-5xl">BDE Epitech Rennes</p>
      <div className="flex flex-row gap-14 mx-auto">
        <div
          className={`w-fit h-fit flex flex-row justify-center items-center gap-2 hover:cursor-pointer transition-colors duration-200 ${
            isActive("/") ? "text-black" : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => {
            window.location.href = "/";
          }}
        >
          <Acceuil className="w-10 h-10" />
          <p className="font-semibold text-2xl">Accueil</p>
        </div>
        <div
          className={`w-fit h-fit flex flex-row justify-center items-center gap-2 hover:cursor-pointer transition-colors duration-200 ${
            isActive("/ranking")
              ? "text-black"
              : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => {
            window.location.href = "/ranking";
          }}
        >
          <Ranking className="w-10 h-10" />
          <p className="font-semibold text-2xl">Classement</p>
        </div>
        <div
          className={`w-fit h-fit flex flex-row justify-center items-center gap-2 hover:cursor-pointer transition-colors duration-200 ${
            isActive("/calendar")
              ? "text-black"
              : "text-gray-400 hover:text-gray-600"
          }`}
          onClick={() => {
            window.location.href = "/calendar";
          }}
        >
          <Calendar className="w-10 h-10" />
          <p className="font-semibold text-2xl">Calendrier</p>
        </div>
      </div>
      <div
        className="w-fit h-full flex flex-row items-center gap-2 hover:cursor-pointer hover:scale-105 transition-all duration-200"
        onClick={() => setShowModal(true)}
      >
        <Image
          src="https://cdn-icons-png.flaticon.com/512/3303/3303893.png"
          alt="Remote photo"
          width={100}
          height={100}
          className="w-10 h-10 "
        />
        <p className="text-2xl font-semibold pl-1">Nouvel évènement</p>
      </div>
      <ReactModal
        ariaHideApp={false}
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        style={{
          overlay: {
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(5px)",
          },
          content: {
            top: "50%",
            left: "50%",
            height: "90%",
            width: "40%",
            transform: "translate(-50%, -50%)",
            borderRadius: "1.5rem",
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            border: "none",
            padding: "1rem",
            backgroundColor: "white",
            overflow: "hidden",
          },
        }}
      >
        <EventModal handleClose={() => setShowModal(false)} />
      </ReactModal>
    </div>
  );
}
