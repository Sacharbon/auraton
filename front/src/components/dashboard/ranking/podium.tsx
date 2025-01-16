import { Images } from "@/components/test";
import Image from "next/image";

interface PodiumProps {
    image2nd: string
    image1st: string
    image3trd: string
}


export const Podium = ({image2nd, image1st, image3trd}: PodiumProps) => {
    return (

    <div className="relative flex ">
        {/* Podium */}
        <div className="flex items-end">
            {/* 2nd Place */}
            <div className="relative flex flex-col items-center">
            <div className="bg-gray-300 opacity-80 w-48 h-40 rounded-t-md flex justify-center items-end">
                <p className="text-7xl pb-16 font-poppins font-bold text-black">2</p>
            </div>
            <div className="absolute -top-52">
                <Image
                src={image2nd}
                alt="Second place"
                width={150}
                height={150}
                className="rounded-full"
                />
            </div>
            </div>

            {/* 1st Place */}
            <div className="relative flex flex-col items-center">
            <div className="bg-yellow-400 opacity-80 w-60 h-60 rounded-t-md flex justify-center items-end">
                <p className="text-7xl pb-36 font-poppins font-bold text-black">1</p>
            </div>
            <div className="absolute -top-56">
                <Image
                src={image1st}
                alt="First place"
                width={180}
                height={180}
                className="rounded-full"
                />
            </div>
            <div className="absolute -top-72">
                <span className="text-7xl">👑</span>
            </div>
            </div>

            {/* 3rd Place */}
            <div className="relative flex flex-col items-center">
            <div className="bg-amber-700 opacity-80 w-44 h-28 rounded-t-md flex justify-center items-end">
                <p className="text-7xl pb-4 font-poppins font-bold text-black">3</p>
            </div>
            <div className="absolute -top-44">
                <Image
                src={image3trd}
                alt="Third place"
                width={130}
                height={130}
                className="rounded-full"
                />
            </div>
            </div>
        </div>
        </div>
    );
}