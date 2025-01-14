import LogoBDE from "@/assets/LogoBDE.png";
import Acceuil from "@/assets/Acceuil";
import Ranking from "@/assets/Ranking";
import Calendar from "@/assets/Calendar";
import Profile from "@/assets/Profile";
export default function Header() {
  return (
    <div className="h-full w-full flex flex-row justify-between items-center px-4">
      <div className="w-fit h-full flex flex-row gap-2">
        <div className="w-28 h-28 border-2 rounded-full place-items-center bg-gray-900">
          <img src={LogoBDE.src} className="h-[88px] w-[88px] mt-3" />
        </div>
        <div className="w-fit h-full flex flex-col justify-center">
          <p className="font-semibold text-3xl">BDE Epitech Rennes</p>
        </div>
      </div>
      <div className="flex flex-row gap-16 pr-24">
        <div
          className={`w-fit h-fit flex flex-row justify-center items-center gap-2 hover:cursor-pointer hover:text-gray-500`}
        >
          <Acceuil className="w-10 h-10" />
          <p className="text-xl font-semibold">Acceuil</p>
        </div>
        <div
          className={`w-fit h-fit flex flex-row justify-center items-center gap-2 hover:cursor-pointer hover:text-gray-500`}
        >
          <Ranking className="w-10 h-10" />
          <p className="text-xl font-semibold">Classement</p>
        </div>
        <div
          className={`w-fit h-fit flex flex-row justify-center items-center gap-2 hover:cursor-pointer hover:text-gray-500`}
        >
          <Calendar className="w-10 h-10" />
          <p className="text-xl font-semibold">Calendrier</p>
        </div>
      </div>
      <div className="w-fit h-full flex flex-row items-center gap-2">
        <p className="text-xl">John Doe</p>
        <Profile className="w-12 h-12 text-black" />
      </div>
    </div>
  );
}
