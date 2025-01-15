import Acceuil from "@/assets/Acceuil";

interface UserRankProps {
  rank: number;
  picture: any;
  name: any;
  aura: any;
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

  return (
    <div className="w-full h-10 flex flex-row items-center gap-6 pl-4 text-sm">
      <div className="flex flex-row items-center w-full gap-10 justify-start">
        <p>#{rank}</p>
        <div className="flex flex-row items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full">
            <img
              src="https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&dpr=1&w=1000"
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
        <Acceuil className="w-12 h-12" />
      </div>
    </div>
  );
}
