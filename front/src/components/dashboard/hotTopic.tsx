import Image from "next/image";
import { Users } from "./users";
import { Images } from "../test";
import { Title } from "./title";

interface HotTopicProps {
    image: string;
    title: string;
    content: string;
    topicAttribut: string
    topicColorAttribut: string
    userIcon: string
    userName: string
    userAttribut: string
    userColorAttribut: string
}

export const HotTopic = ({image, title, content, topicAttribut, topicColorAttribut, userIcon, userName, userAttribut, userColorAttribut}: HotTopicProps) => {
    return (
        <div className="flex border-black border-2 rounded-lg space-x-16 p-5">
            <div className="flex space-x-5">
                <Image className="rounded-lg" height={400} width={400} src={image} alt="image"></Image>
            </div>
            <div className="flex-row space-y-4">
                <Users name={userName} icon={userIcon} attribut={userAttribut} colorAttribut={userColorAttribut}></Users>
                <Title title={title} attribut={topicAttribut} colorAttribut={topicColorAttribut} ></Title>
                <div className="font-poppins text-base text-black text-wrap">{content}</div>
            </div>
        </div>
    );
}
