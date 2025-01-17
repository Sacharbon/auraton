import { IconButton } from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";
import {loginUser} from "@/utils/faceLogin.ts";
import {useRef, useState} from "react";
import {like} from "@/utils/like.ts";
import Image from "next/image";
import ReactModal from "react-modal";

interface LikeButtonProps {
    nbLikes: string,
    idEvent: number,
    userId: number,
}


export const LikeButton = ({nbLikes, idEvent}: LikeButtonProps) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [user, setUser] = useState({});
    const [displayName, setDisplayName] = useState(false);
    const [subscribed, setSubscribed] = useState<boolean>(false);
    let recognizeInterval = null;
    let done = false;

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
                    if (label != null && !done) {
                        setUser(label);
                        stopCamera();
                        const req = await like(idEvent, label.id);
                        console.log(req);
                        setSubscribed(true);
                        done = true;
                    }
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
        <div className="flex items-center"  >
            <IconButton aria-label="Call support"  rounded="2xl"                    onClick={() => {
                setDisplayName(true);
                startCamera();
            }}>
                <LuHeart color="darkred" fill="darkred" />
            </IconButton>
            <div className="text-lg font-poppins font-semibold">{nbLikes}</div>
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
}

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