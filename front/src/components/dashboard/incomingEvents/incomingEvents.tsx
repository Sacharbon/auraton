import { Users } from "../users"

interface incomingEventsProps {
    titre: string
    userIcon: string
    userName: string
    userRank: string
    description: string
    nbRegistered: string
    date: string
}

export const IncomingEvents = ({titre, userIcon, userName, userRank, description, nbRegistered, date}: incomingEventsProps) => {
    return (
        <div className="flex flex-col rounded-2xl shadow-xl w-full h-48 pl-4 pb-2 pr-4 pt-2 justify-between ">
            <div className="flex flex-col space-y-0.5 justify-center">
                <div className="flex text-black font-bold font-poppins text-lg max-w-[280px] max-h-[28px] overflow-hidden">{titre}</div>
                <Users icon={userIcon} name={userName} iconRank={userRank} attribut="" colorAttribut="bg-transparent"></Users>
                <div className="font-poppins pt-2 text-sm text-wrap overflow-hidden w-[280px] h-[45%]">{description}</div>
            </div>
            <div className="flex space-x-28 font-bold text-black text-opacity-40 text-sm items-end">
                <div className="flex ">{nbRegistered} inscrit(s)</div>
                <div className="flex ">{date}</div>
            </div>
        </div>
    );
}
