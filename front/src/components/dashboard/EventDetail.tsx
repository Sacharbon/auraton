import { Images } from "../test";
import { Users } from "./users";
import { LikeButton } from "./Buttons/likeButton";
import {formatStringDate} from "@/utils/date.ts";

export default function EventDetail({event}: any) {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="h-1/2 p-2 shadow-sm">
        <img
          className="object-cover w-full h-full"
          src={Images.img_placeholder}
        />
      </div>
      <div className="h-1/2 flex flex-col gap-4 p-2">
        <div className="flex flex-row justify-between">
          <div className="font-poppins font-bold text-3xl">
            {event.title}
          </div>
          <div className="font-poppins font-semibold text-gray-500 text-xl">
            {formatStringDate(event.scheduledAt)}
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-4">
          <Users
            name={event.author.firstName + " " + event.author.lastName}
            icon={"http://localhost:3000/" + event.author.pictureUrl}
            iconRank={Images.knight}
            attribut=""
            colorAttribut="bg-transparent"
          ></Users>
          <p className="font-poppins font-semibold text-gray-500 text-xl">
            + 1000 aura
          </p>
        </div>
        <div className="flex flex-row items-center py-4 space-x-5">
          <div className="bg-black w-[550px] h-0.5"></div>
          <LikeButton nbLikes={event.likes}></LikeButton>
        </div>
        <div className="text-sm text-justify h-32 overflow-hidden">
          {event.description}
        </div>
      </div>
    </div>
  );
}
