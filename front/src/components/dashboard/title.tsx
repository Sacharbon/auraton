import { Attribut } from "./attribut";

interface TitleProps {
    attribut: string
    colorAttribut: string
    title: string
}

export const Title = ({attribut, colorAttribut, title}: TitleProps) => {
    return (
        <div className="flex items-center space-x-2">
            <Attribut attribut={attribut} color={colorAttribut}></Attribut>
            <div className="text-black font-poppins font-bold text-xl">- {title}</div>
        </div>
    );
}