export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col gap-10 p-4">
      <div className="w-full h-fit flex flex-col items-center">
        <p className="font-bold text-4xl">PROJECT WEEK</p>
        <p className="text-2xl font-semibold">en légende</p>
      </div>
      <div className="w-full h-full flex flex-row gap-4">
        <div className="w-1/3 h-full bg-gray-700 rounded-lg"></div>
        <div className="w-2/3 h-1/2 bg-gray-700 rounded-lg"></div>
      </div>
      <div className="w-2/3 h-1/2 bg-gray-700 rounded-lg"></div>
    </div>
  );
}
