import Image from "next/image";
import { Users } from "@/components/dashboard/users";
import { Title } from "@/components/dashboard/title";

interface HotTopicProps {
  image?: string;
  title: string;
  content: string;
  topicAttribut: string;
  topicColorAttribut: string;
  userIcon?: string;
  userName?: string;
  userAttribut?: string;
  userColorAttribut?: string;
}

export const HotTopic = ({
  image,
  title,
  content,
  topicAttribut,
  topicColorAttribut,
  userIcon,
  userName,
  userAttribut,
  userColorAttribut,
}: HotTopicProps) => {
  return (
    <div className="flex rounded-lg space-x-16 p-5">
      <div className="flex space-x-5">
        {image && (
          <Image
            className="rounded-lg"
            height={400}
            width={400}
            src={image}
            alt="image"
          ></Image>
        )}
      </div>
      <div className="flex-row space-y-4">
        {userName && userIcon && userAttribut && userColorAttribut && (
          <Users
            name={userName}
            icon={userIcon}
            attribut={userAttribut}
            colorAttribut={userColorAttribut}
          ></Users>
        )}
        <Title
          title={title}
          attribut={topicAttribut}
          colorAttribut={topicColorAttribut}
        ></Title>
        <div className="font-poppins text-base text-black text-wrap">
          {content}
        </div>
      </div>
    </div>
  );
};
