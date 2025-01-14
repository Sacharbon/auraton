"use client";

import Acceuil from "@/assets/Acceuil";
import Ranking from "@/assets/Ranking";
import Calendar from "@/assets/Calendar";
import Image from "next/image"
import { usePathname } from 'next/navigation';

export default function Header() {
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <div className="h-full w-full flex flex-row justify-between items-center">
            <p className="font-semibold text-5xl">BDE Epitech Rennes</p>
            <div className="flex flex-row gap-14 mx-auto">
                <div
                    className={`w-fit h-fit flex flex-row justify-center items-center gap-2 hover:cursor-pointer transition-colors duration-200 ${
                        isActive('/') ? 'text-black' : 'text-gray-400 hover:text-gray-600'
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
                        isActive('/ranking') ? 'text-black' : 'text-gray-400 hover:text-gray-600'
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
                        isActive('/calendar') ? 'text-black' : 'text-gray-400 hover:text-gray-600'
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
                className="w-fit h-full flex flex-row items-center gap-2 hover:cursor-pointer"
                onClick={() => {
                    window.location.href = "/profile";
                }}
            >
                <Image
                    src="https://cdn-icons-png.flaticon.com/512/3303/3303893.png"
                    alt="Remote photo"
                    width={100}
                    height={100}
                    className="w-10 h-10"
                />
                <p className="text-2xl font-semibold pl-1">Nouvel évènement</p>
            </div>
        </div>
    );
}