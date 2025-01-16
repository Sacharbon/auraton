import Image from "next/image";
import { Users } from "@/components/dashboard/users";
import { Title } from "@/components/dashboard/title";
import { LikeButton } from "../Buttons/likeButton";
import { CommentButton } from "../Buttons/commentButton";
import { Button } from "@chakra-ui/react";

interface HotTopicProps {
  image?: string;
  title: string;
  content: string;
  nbRegistered: string
  topicAttribut: string;
  topicColorAttribut: string;
  userIcon?: string;
  userName?: string;
  userRank?: string
  userAttribut?: string;
  userColorAttribut?: string;
}

export const HotTopic = ({
  image,
  title,
  content,
  nbRegistered,
  topicAttribut,
  topicColorAttribut,
  userIcon,
  userName,
  userRank,
  userAttribut,
  userColorAttribut,
}: HotTopicProps) => {
  return (
    <div className="flex h-[90%] space-x-16 w-100 p-5 rounded-3xl shadow-3xl">
      <div className="flex space-x-5">
        {image && (
          <Image
            className="rounded-lg object-cover"
            height={400}
            width={400}
            src={image}
            alt="image"
          ></Image>
        )}
      </div>
      <div className="flex flex-col w-[560px] space-y-4 justify-between">
        <Title
          title={title}
          attribut={topicAttribut}
          colorAttribut={topicColorAttribut}
        ></Title>
        {userName && userIcon && userAttribut && userRank && userColorAttribut && (
          <Users
            name={userName}
            icon={userIcon}
            iconRank={userRank}
            attribut={userAttribut}
            colorAttribut={userColorAttribut}
          ></Users>
        )}
        <div className="font-poppins text-base text-black w-[560px] h-[140px] text-wrap overflow-hidden">
          {content}
        </div>
        <div className="flex items-center justify-start space-x-5">
          <div className="text-lg opacity-50">{nbRegistered} inscrits</div>
          <Button size={"2xs"}
                  bg={"black"}
                  color={"white"}
                  width={120}
                  height={10}
                  rounded={"2xl"}>S'inscrire</Button>
          <CommentButton nbComments="3"></CommentButton>
          <LikeButton nbLikes="12"></LikeButton>
        </div>
      </div>
    </div>
  );
};
