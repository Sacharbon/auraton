import UserRank from "./UserRank";
import {User} from "@/utils/apiEntity.ts";

interface LeaderboardProps {
    users: User[];
}

export default /* async */ function Leaderboard({users}: LeaderboardProps) {

  return (
    <div className="flex flex-col h-[90%] p-3 rounded-3xl shadow-3xl gap-2">
      <div className="flex flex-row justify-between px-4">
        <p className="text-[22px] font-semibold">Rang</p>
        <p className="text-[22px] font-semibold pr-[20%]">Nom</p>
        <p className="text-[22px] font-semibold pr-[20%]">Aura</p>
      </div>
      <div className="flex flex-col px-4 py-2 justify-start h-full max-h-[100%] overflow-hidden">
        {users.map((user, index) => (
            <UserRank
                key={index}
                rank={index + 1}
                name={user.firstName + " " + user.lastName}
                aura={user.aura}
                picture={"http://localhost:3000/" + user.pictureUrl}
            />
        ))}
      </div>
    </div>
  );
}
