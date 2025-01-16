import Image from "next/image";
import { Images } from "@/components/test";

export default function Knight({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <img className="object-cover w-full h-full" src={Images.knight} />
    </div>
  );
}
