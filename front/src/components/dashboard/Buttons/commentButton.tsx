import { IconButton } from "@chakra-ui/react";
import { LuTextSearch } from "react-icons/lu";

interface CommentButtonProps {
    nbComments: string
}


export const CommentButton = ({nbComments}: CommentButtonProps) => {
    return (
        <div className="flex flex-row  items-center">
            <IconButton aria-label="Comments" rounded="2xl">
                <LuTextSearch color="blue" fontSize="2xl"/>
            </IconButton>
            <div className="text-lg font-poppins font-semibold">{nbComments} Commentaires</div>
        </div>
    );
}
