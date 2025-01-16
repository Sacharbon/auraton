import Acceuil from "@/assets/Acceuil";
import Scepter from "@/assets/scepter";
import Tower from "@/assets/tower";
import Wheat from "@/assets/wheat";
import Knight from "@/assets/knight";

interface UserRankProps {
  rank: number;
  name: any;
  aura: any;
  picture: any;
}

export default function UserRank({ rank, name, aura, picture }: UserRankProps) {
  function getColor(rank: number) {
    switch (rank) {
      case 1:
        return "bg-orange-400";
      case 2:
        return "bg-gray-400";
      case 3:
        return "bg-[#AE7100]";
      default:
        return "bg-gray-300";
    }
  }
  function getTextColor(rank: number) {
    switch (rank) {
      case 1:
        return "text-amber-500";
      case 2:
        return "text-gray-500";
      case 3:
        return "text-[#AE7100]";
      default:
        return "text-gray-400";
    }
  }

  function getIcon({ aura, IconClass }: { aura: number; IconClass: string }) {
    switch (true) {
      case aura >= 10000000:
        return <Scepter className={IconClass} />;
      case aura >= 100000:
        return <Tower className={IconClass} />;
      case aura >= 10000:
        return <Knight className={IconClass} />;
      default:
        return <Wheat className={IconClass} />;
    }
  }

  const IconClass = "h-8 w-8 text-black";

  return (
    <div className="w-full h-10 flex flex-row items-center gap-6 pl-4 text-sm">
      <div className="flex flex-row items-center w-full gap-10 justify-start">
        <p>#{rank}</p>
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full">
            <img
              src={picture}
              className="h-full w-full object-cover rounded-full"
            />
          </div>
          <p>{name}</p>
        </div>
      </div>
      <div className="w-[80%] h-fit flex flex-row items-center justify-end gap-4">
        <div
          className={`${getColor(rank)} ${getTextColor(
            rank
          )} rounded-lg w-full h-full py-1 place-items-center bg-opacity-20`}
        >
          <p>{aura}</p>
        </div>
        {getIcon({ aura, IconClass })}
      </div>
    </div>
  );
}
