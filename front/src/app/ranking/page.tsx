"use client";

import Header from "@/components/dashboard/header/header";
import Leaderboard from "@/components/dashboard/ranking/leaderboard";
import { Podium } from "@/components/dashboard/ranking/podium";
import { Images } from "@/components/test";
import {User} from "@/utils/apiEntity.ts";
import ranking from "@/utils/ranking.ts";
import React from "react";

export default function Ranking() {

  const [users, setUsers] = React.useState<User[]>([]);

  React.useEffect(() => {
    ranking()
      .then((users) => {
        setUsers(users);
      })
  }, [])

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
      <div className="flex flex-row w-full h-full items-start justify-center">
        <div className="w-[50%] pt-72 pl-32">
          <Podium
            image1st={users.length > 0 && ("http://localhost:3000/" + users[0].pictureUrl) || Images.img_placeholder}
            image2nd={users.length > 1 && ("http://localhost:3000/" + users[1].pictureUrl) || Images.img_placeholder}
            image3trd={users.length > 2 && ("http://localhost:3000/" + users[2].pictureUrl) || Images.img_placeholder}
          />
        </div>
        <div className="w-[50%] h-full pb-6">
          <Leaderboard users={users} />
        </div>

      </div>
    </div>
  );
}
