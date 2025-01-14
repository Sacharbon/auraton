import { Attribut } from "./attribut";
import Image from "next/image";


interface UsersProps {
    icon: string;
    name: string
    attribut: string
    colorAttribut: string
}

export const Users = ({icon, name, attribut, colorAttribut}: UsersProps) => {
    return (
        <div className="flex items-center space-x-3">
            <Image className="rounded-full" width={40} height={40} src={icon} alt="profile image"></Image>
            <div className={`font-poppins text-black font-semibold `}>{name}</div>
            <Attribut attribut={attribut} color={colorAttribut}></Attribut>
            <Attribut attribut="TEST" color="bg-green-500"></Attribut>
        </div>
    );
}