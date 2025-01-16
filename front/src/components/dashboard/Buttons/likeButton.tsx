import { IconButton } from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";

interface LikeButtonProps {
    nbLikes: string
}


export const LikeButton = ({nbLikes}: LikeButtonProps) => {
    return (
        <div className="flex items-center"  >
            <IconButton aria-label="Call support"  rounded="2xl">
                <LuHeart color="darkred" fill="darkred" />
            </IconButton>
            <div className="text-lg font-poppins font-semibold">{nbLikes}</div>
        </div>
    );
}
