import Header from "@/components/dashboard/header";
import { Podium } from "@/components/dashboard/ranking/podium";
import { Images } from "@/components/test";
import Image from "next/image";

export default function Ranking() {
  return (
    <div className="w-screen h-screen flex flex-col gap-16 px-12 pt-12 pb-8">
      <div className="w-full h-fit">
        <Header />
      </div>
        <Podium image1st={Images.aurelien}
                image2nd={Images.aurelien}
                image3trd={Images.aurelien}></Podium>
      <div>
      </div>
    </div>
  );
}
