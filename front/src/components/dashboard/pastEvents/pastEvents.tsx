import Image from "next/image";

interface pastEventsProps {
    image1: string
    image2: string
}


export const PastEvents = ({image1, image2}: pastEventsProps) => {
    return (
        <div className="flex pl-5 space-x-16 w-full h-48 ">
            <Image className="rounded-lg object-cover hover:scale-105 duration-300 transition-all" width={300} height={100} alt="image1" src={image1}></Image>
            <Image className="rounded-lg object-cover hover:scale-105 duration-300 transition-all" width={300} height={100} alt="image1" src={image2}></Image>
        </div>
    );
}