import Header from "@/components/dashboard/header";
import { HotTopic } from "@/components/dashboard/hotTopic/hotTopic";
import Leaderboard from "@/components/dashboard/ranking/leaderboard";
import Image from "next/image";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col gap-16 px-12 pt-12 pb-8">
      <div className="w-full h-fit">
        <Header />
      </div>
      <div className="w-full h-full flex flex-row gap-8">
        <div className="w-[60%] h-full flex flex-col gap-8">
          <div className="w-full h-[65%]">
            <div className="flex flex-row items-end pb-5">
              <p className="font-semibold text-3xl text-gray-900 pr-2">
                Évènements
              </p>
              <Image
                src="https://em-content.zobj.net/source/apple/391/fire_1f525.png"
                alt="Remote photo"
                width={100}
                height={100}
                className="w-10 h-10"
              />
            </div>
            <HotTopic
              title="Classico tek1 vs tek2"
              content="Contenu"
              topicAttribut="Hot Topic"
              topicColorAttribut="bg-red-500"
              image="https://france3-regions.francetvinfo.fr/image/LnH9icnOXHg6S81iNxluNAmYVgc/1920x1080/regions/2023/10/24/reinesdufoot24p-tremolat-mamies-foot-00-00-21-15-653772cc06b36854329854.jpg"
            />
          </div>
          <div className="w-full h-[35%]">
            <div className="flex flex-row items-end pb-5">
              <p className="font-semibold text-3xl text-gray-900 pr-2">
                À venir
              </p>
              <Image
                src="https://em-content.zobj.net/source/apple/391/eyes_1f440.png"
                alt="Remote photo"
                width={100}
                height={100}
                className="w-10 h-10"
              />
            </div>
            <div className="rounded-3xl shadow-3xl">
              <HotTopic
                title="Titre"
                content="Contenu"
                topicAttribut="Hot Topic"
                topicColorAttribut="bg-red-500"
              />
            </div>
          </div>
        </div>
        <div className="w-[40%] h-full flex flex-col gap-8">
          <div className="w-full h-[65%]">
            <div className="h-fit flex flex-row items-end pb-5">
              <p className="font-semibold text-3xl text-gray-900 pr-2">
                Classement
              </p>
              <Image
                src="https://em-content.zobj.net/source/apple/391/trophy_1f3c6.png"
                alt="Remote photo"
                width={100}
                height={100}
                className="w-10 h-10"
              />
            </div>
            <div className="h-full rounded-3xl ">
              <Leaderboard />
            </div>
          </div>
          <div className="w-full h-[35%]">
            <div className="flex flex-row items-end pb-5">
              <p className="font-semibold text-3xl text-gray-900 pr-2">
                Évènements terminés
              </p>
              <Image
                src="https://em-content.zobj.net/source/apple/391/door_1f6aa.png"
                alt="Remote photo"
                width={100}
                height={100}
                className="w-10 h-10"
              />
            </div>
            <div className="rounded-3xl shadow-3xl">
              <HotTopic
                title="Titre"
                content="Contenu"
                topicAttribut="Hot Topic"
                topicColorAttribut="bg-red-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
