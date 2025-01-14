import Header from "@/components/dashboard/header";
import { HotTopic } from "@/components/dashboard/hotTopic/hotTopic";

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col gap-10 px-12 pt-12 pb-8">
      <div className="w-full h-fit">
        <Header />
      </div>
      <div className="w-full h-full flex flex-row gap-8">
        <div className="w-[60%] h-full flex flex-col gap-8">
          <div className="w-full h-[65%] border-2 border-gray-700 rounded-lg">
            <HotTopic
              title="Titre"
              content="Contenu"
              topicAttribut="Hot Topic"
              topicColorAttribut="bg-red-500"
            />
          </div>
          <div className="w-full h-[35%] border-2 border-gray-700 rounded-lg"></div>
        </div>
        <div className="w-[40%] h-full flex flex-col gap-8">
          <div className="w-full h-[65%] border-2 border-gray-700 rounded-lg"></div>
          <div className="w-full h-[35%] border-2 border-gray-700 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
}
