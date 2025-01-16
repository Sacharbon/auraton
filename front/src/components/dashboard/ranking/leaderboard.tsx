import UserRank from "./UserRank";
import userRanking from "@/utils/ranking";

export default /* async */ function Leaderboard() {
  // const users = await userRanking();

  return (
    <div className="flex flex-col h-[90%] p-3 rounded-3xl shadow-3xl gap-2">
      <div className="flex flex-row justify-between px-4">
        <p className="text-[22px] font-semibold ">Rang</p>
        <p className="text-[22px] font-semibold pr-16">Nom</p>
        <p className="text-[22px] font-semibold pr-20">Aura</p>
      </div>
      <div className="flex flex-col px-4 py-2 justify-between h-full">
        {/* <UserRank
          rank={1}
          name={users[0].firstName}
          aura={users[0].aura}
          picture={users[0].pictureURL}
        />
        <UserRank
          rank={2}
          name={users[1].firstName}
          aura={users[1].aura}
          picture={users[1].pictureURL}
        />
        <UserRank
          rank={3}
          name={users[2].firstName}
          aura={users[2].aura}
          picture={users[2].pictureURL}
        />
        <UserRank
          rank={4}
          name={users[3].firstName}
          aura={users[3].aura}
          picture={users[3].pictureURL}
        />
        <UserRank
          rank={5}
          name={users[4].firstName}
          aura={users[4].aura}
          picture={users[4].pictureURL}
        /> */}
      </div>
    </div>
  );
}
