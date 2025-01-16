import Header from "@/components/dashboard/header/header";
import Leaderboard from "@/components/dashboard/ranking/leaderboard";
import { Podium } from "@/components/dashboard/ranking/podium";
import { Images } from "@/components/test";

export default function Ranking() {
  return (
    <div className="w-screen h-screen flex flex-col gap-16 px-12 pt-12 pb-8">
      <div className="w-full h-fit">
        <Header />
      </div>
      <div className="flex flex-row">
        <div className="flex w-[50%]">
          <div className=" font-poppins font-bold text-3xl">Podium 🥇</div>
        </div>
        <div className="flex w-[50%] ">
          <div className="font-poppins font-bold text-3xl ">Classement 🏆</div>
        </div>
      </div>
      <div className="flex flex-row w-full h-fullni items-start justify-center  ">
        <div className="w-[50%] pt-72 pl-32">
          <Podium
            image1st={Images.aurelien}
            image2nd={Images.aurelien}
            image3trd={Images.aurelien}
          ></Podium>
        </div>
          <div className="w-[50%] h-full pt-16">
              <Leaderboard></Leaderboard>
        </div>

      </div>
    </div>
  );
}
