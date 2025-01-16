"use client";

import Header from "@/components/dashboard/header/header";
import { HotTopic } from "@/components/dashboard/hotTopic/hotTopic";
import Leaderboard from "@/components/dashboard/ranking/leaderboard";
import Image from "next/image";
import { PastEvents } from "@/components/dashboard/pastEvents/pastEvents";
import { Images } from "@/components/test";
import { IncomingEvents } from "@/components/dashboard/incomingEvents/incomingEvents";
import { useEffect, useState } from "react";
import { hypeEvent } from "@/utils/hypeEvent.ts";
import { nextEvents } from "@/utils/nextEvents.ts";
import { lastEvents } from "@/utils/lastEvents.ts";
import { ranking } from "@/utils/ranking.ts";
import { User } from "@/utils/apiEntity.ts";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [hotEvent, setHotEvent] = useState<Event|null>(null);
  const [incomingEvents, setIncomingEvents] = useState<Event[]>([]);
  const [endedEvents, setEndedEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    hypeEvent()
        .then(event => {
          setHotEvent(event);
        });
    nextEvents()
        .then(events => {
          setIncomingEvents(events);
        })
    lastEvents()
        .then(events => {
          setEndedEvents(events);
        })
    ranking()
        .then(users => {
          setUsers(users);
        })
  }, []);

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
            <div className="flex h-[90%] space-x-16 w-100 p-5 rounded-3xl shadow-3xl justify-center items-center">
              {!hotEvent && <h1 className="font-bold text-2xl">Aucun évènement</h1>
                ||
                <HotTopic
                  title={hotEvent?.title ?? ""}
                  content={hotEvent?.description ?? ""}
                  nbRegistered={hotEvent?.registeredUsers.length.toString() ?? ""}
                  nbComments={hotEvent?.comments.length.toString() ?? ""}
                  nbLikes={hotEvent?.likes.toString() ?? ""}
                  topicAttribut="HOT TOPIC"
                  userIcon={"http://localhost:3000/" + hotEvent?.author.pictureUrl}
                  userName={hotEvent?.author.firstName + " " + hotEvent?.author.lastName}
                  userRank={Images.knight}
                  userAttribut={hotEvent?.author.roles.toString()}
                  userColorAttribut="bg-yellow-500"
                  topicColorAttribut="bg-red-500"
                  image={"http://localhost:3000/" + hotEvent?.imageUrl}
                  id={hotEvent?.id}
                />
            }
          </div>
          </div>
          <div className="w-full h-[35%]">
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
              <div className="flex space-x-14">
                {incomingEvents.map((event, index) => (
                    <div key={index} className="rounded-3xl shadow-3xl w-80 h-48">
                      <IncomingEvents
                          userIcon={"http://localhost:3000/" + event.author.pictureUrl}
                          userName={event.author.firstName + " " + event.author.lastName}
                          userRank={Images.knight}
                          titre={event.title}
                          description={event.description}
                          nbRegistered={event.registeredUsers.length.toString()}
                          date={formatStringDate(event.scheduledAt)}
                      ></IncomingEvents>
                    </div>
                ))}
              </div>
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
              <Leaderboard users={users}/>
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
            <div className="rounded-3xl">
              <PastEvents
                image1={endedEvents.length > 0 && "http://localhost:3000/" + endedEvents[0].imageUrl || Images.img_placeholder}
                image2={endedEvents.length > 1 && "http://localhost:3000/" + endedEvents[0].imageUrl || Images.img_placeholder}
              ></PastEvents>
            </div>
          </div>
        </div>
      </div>
    </div>
);
}
