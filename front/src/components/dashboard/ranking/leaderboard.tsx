import UserRank from "./UserRank";

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
        {/* {users.map((user, index) => (
          <UserRank
            rank={index + 1}
            name={user.firstName}
            aura={user.aura}
            picture={user.pictureURL}
        ))} */}

        <UserRank
          rank={1}
          name="John Doe"
          aura="10000"
          picture="https://i.pinimg.com/736x/2c/5c/30/2c5c30a58c233c1a2c4e728106356700.jpg"
        />
      </div>
    </div>
  );
}
