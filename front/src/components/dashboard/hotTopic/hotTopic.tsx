import Image from "next/image";
import { Users } from "@/components/dashboard/users";
import { Title } from "@/components/dashboard/title";
import { LikeButton } from "../Buttons/likeButton";
import { CommentButton } from "../Buttons/commentButton";
import { Button } from "@chakra-ui/react";
import {loginUser} from "@/utils/faceLogin.ts";
import {useRef, useState} from "react";
import { register } from '../../../utils/register.ts';
import ReactModal from "react-modal";

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
  id: number;
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
  id,
}: HotTopicProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [user, setUser] = useState({});
  const [displayName, setDisplayName] = useState(false);
  const [subscribed, setSubscribed] = useState<boolean>(false);
  let recognizeInterval = null;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }

      recognizeInterval = setInterval(async () => {
        if (videoRef.current) {
          const label = await loginUser(videoRef.current);
          setUser(label);
          stopCamera();
          register(label.id, id);
          setSubscribed(true);
        }
      }, 1000);
    } catch (err) {
      console.error("Erreur d'accès à la caméra:", err);
    }
  };

  const stopCamera = () => {
    setTimeout(() => {
      clearInterval(recognizeInterval);
      setDisplayName(false);
      streamRef.current.getTracks().forEach((track) => {
        if (track.readyState == 'live' && track.kind === 'video') {
          track.stop();
        }
      });
    }, 3000);
  };

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
          {!subscribed && <Button size={"2xs"}
                   onClick={() => {
                     setDisplayName(true);
                     startCamera();
                   }}
                   bg={"black"}
                   color={"white"}
                   width={120}
                   height={10}
                   rounded={"2xl"}>S'inscrire</Button>}
          <CommentButton nbComments="3"></CommentButton>
          <LikeButton nbLikes="12"></LikeButton>
        </div>
      </div>
      <ReactModal isOpen={displayName} style={registerStyles} ariaHideApp={false}>
        <div className="w-full h-full justify-center items-center flex flex-col">
          <Image src="https://cdn-icons-png.flaticon.com/512/6022/6022815.png" alt="moulaga" width={150} height={150}/>
          {user && <p className="font-semibold text-3xl pt-16">Bonjour {user.firstName} !</p>}
          <video
              ref={videoRef}
              playsInline
              autoPlay
              className="mt-4 w-0 h-0 rounded-lg"
              id="video"
          >
            Flux vidéo non disponible.
          </video>
        </div>
      </ReactModal>
    </div>
  );
};

const registerStyles = {
  content: {
    top: "50%",
    left
        :
        "50%",
    height
        :
        "40%",
    width
        :
        "20%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    border: "none",
    padding: "1rem",
    backgroundColor: "white",
    overflow: "hidden",
  }
};