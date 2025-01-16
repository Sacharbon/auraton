import { Attribut } from "./attribut";
import Image from "next/image";


interface UsersProps {
    icon: string;
    name: string
    iconRank: string
    attribut: string
    colorAttribut: string
}

export const Users = ({icon, name, iconRank, attribut, colorAttribut}: UsersProps) => {
    return (
      <div className="flex-row">
        <div className="flex items-center space-x-5">
          <Image className="rounded-full" width={40} height={40} src={icon} alt="profile image"></Image>
          <div className="flex items-center space-x-2">
            <Image className="" width={25} height={25} src={iconRank} alt="icon rank"></Image>
            <div className={`font-poppins font-medium text-lg `}>{name}</div>
          </div>
        </div>
        <div className="pl-14">
          <Attribut attribut={attribut} color={colorAttribut}></Attribut>
        </div>
      </div>
    );
}