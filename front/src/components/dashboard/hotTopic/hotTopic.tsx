import Image from "next/image";
import { Users } from "@/components/dashboard/users";
import { Title } from "@/components/dashboard/title";
import { LikeButton } from "../Buttons/likeButton";
import { CommentButton } from "../Buttons/commentButton";
import { Button } from "@chakra-ui/react";
import { loginUser } from "@/utils/faceLogin.ts";
import { useRef, useState } from "react";
import { register } from "../../../utils/register.ts";
import ReactModal from "react-modal";
import {registerUser} from "@/utils/faceRegister.ts";

interface HotTopicProps {
  image?: string;
  title: string;
  content: string;
  nbRegistered: string;
  nbComments: string;
  nbLikes: string;
  topicAttribut: string;
  topicColorAttribut: string;
  userIcon?: string;
  userName?: string;
  userRank?: string;
  userAttribut?: string;
  userColorAttribut?: string;
  id: number;
}

export const HotTopic = ({
  image,
  title,
  content,
  nbRegistered,
  nbComments,
  nbLikes,
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
  const [showRegister, setShowRegister] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  let recognizeInterval: any = null;

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }

      recognizeInterval = setInterval(async () => {
        if (videoRef.current) {
          const [descriptor, label] = await loginUser(videoRef.current);
          if (label) {
            setUser(label);
            stopCamera();
            register(label.id, id);
            setSubscribed(true);
          }
          //   setShowRegister(true);
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
        if (track.readyState == "live" && track.kind === "video") {
          track.stop();
        }
      });
    }, 3000);
  };

  return (
    <>
      <div className="flex space-x-5">
        {image && (
          <img
            className="rounded-lg object-cover"
            height={400}
            width={400}
            src={image}
            alt="image"
          />
        )}
      </div>
      <div className="flex flex-col w-[560px] space-y-4 justify-between">
        <Title
          title={title}
          attribut={topicAttribut}
          colorAttribut={topicColorAttribut}
        ></Title>
        {userName &&
          userIcon &&
          userAttribut &&
          userRank &&
          userColorAttribut && (
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
          {!subscribed && (
            <Button
              size={"2xs"}
              onClick={() => {
                setDisplayName(true);
                startCamera();
              }}
              bg={"black"}
              color={"white"}
              width={120}
              height={10}
              rounded={"2xl"}
            >
              S'inscrire
            </Button>
          )}
          <CommentButton nbComments={nbComments}></CommentButton>
          <LikeButton nbLikes={nbLikes} idEvent={id}></LikeButton>
        </div>
      </div>
      <ReactModal
        isOpen={displayName}
        style={registerStyles}
        ariaHideApp={false}
      >
        <div className="w-full h-full justify-center items-center flex flex-col">
          <Image
            src="https://cdn-icons-png.flaticon.com/512/6022/6022815.png"
            alt="moulaga"
            width={150}
            height={150}
          />
          {user && (
            <p className="font-semibold text-3xl pt-16">
              Bonjour {user.firstName} !
            </p>
          )}
          <video
            ref={videoRef}
            playsInline
            autoPlay
            className="mt-4 w-0 h-0 rounded-lg"
            id="video"
          >
            Flux vidéo non disponible.
          </video>
          {showRegister && (
              <>
                <h1>Enregistrez-vous</h1>
                <div className="pb-5 pt-5">
                  <label
                      htmlFor="firstname"
                      className="block text-md font-semibold text-gray-700"
                  >
                    Prénom
                  </label>
                  <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      value={firstName}
                      onChange={(event) => setFirstName(event.target.value)}
                      placeholder="Entrez votre prénom"
                      required
                      className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <div className="pb-5">
                  <label
                      htmlFor="lastname"
                      className="block text-md font-semibold text-gray-700"
                  >
                    Nom
                  </label>
                  <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      value={lastName}
                      onChange={(event) => setLastName(event.target.value)}
                      placeholder="Entrez votre nom"
                      required
                      className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-100 shadow-md p-2 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                  />
                </div>
                <button
                    type="button"
                    onClick={() => {
                      registerUser(videoRef.current, firstName, lastName, null, null)
                          .then(async (user) => {
                            setShowRegister(false);
                            const [descriptor, label] = await loginUser(videoRef.current);
                            if (label) {
                              setUser(label);
                              stopCamera();
                            }
                          })
                    }
                    }
                    className="px-4 py-2 rounded-lg bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  S'enregistrer
                </button>
              </>
          )}
        </div>
      </ReactModal>
    </>
  );
};

const registerStyles = {
  content: {
    top: "50%",
    left: "50%",
    height: "60%",
    width: "30%",
    transform: "translate(-50%, -50%)",
    borderRadius: "1.5rem",
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
    border: "none",
    padding: "1rem",
    backgroundColor: "white",
    overflow: "hidden",
  },
};
