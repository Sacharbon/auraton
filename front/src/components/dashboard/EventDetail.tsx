import { Images } from "../test";
import { Users } from "./users";
import { LikeButton } from "./Buttons/likeButton";

export default function EventDetail() {
  return (
    <div className="w-full h-full flex flex-col gap-8">
      <div className="h-1/2 p-2 shadow-sm">
        <img
          className="object-cover w-full h-full"
          src={Images.img_placeholder}
        />
      </div>
      <div className="h-1/2 flex flex-col gap-4 p-2">
        <div className="flex flex-row justify-between">
          <div className="font-poppins font-bold text-3xl">
            Nom de l'évènement
          </div>
          <div className="font-poppins font-semibold text-gray-500 text-xl">
            Date
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-4">
          <Users
            name="Aurélien Joncourt"
            icon={Images.aurelien}
            iconRank={Images.knight}
            attribut=""
            colorAttribut="bg-transparent"
          ></Users>
          <p className="font-poppins font-semibold text-gray-500 text-xl">
            + .... aura
          </p>
        </div>
        <div className="flex flex-row items-center py-4 space-x-5">
          <div className="bg-black w-[550px] h-0.5"></div>
          <LikeButton nbLikes="12"></LikeButton>
        </div>
        <div className="text-sm text-justify h-32 overflow-hidden">
          OUAIS OUAIS LA DESCRIPTION LAAAAA qsjpdsqodqspod sqdjoqps djposqjdpo
          sqjdposqj dposqj dsqj dposqjdsqjo dsqpdjpsq dsqpdjsqdj sqpodj sqpodp
          sqdposqj dposq jdposq jdposq dpsqoj dposq jdposqj dpsqd sqpod
          jsqpdjsqpod jposqdjsqp spoqdjsqpo djsqpdjsqpodj posqdjposq djpsq dpsqo
          dsqpo qjdqspjpojpsqodjpqosjdsq psq djp osqdjsqpo dqpdo sqjdposq jdpoq
          djposq dpoqd jposq poq dpoj dpqosdj psqoj dpsqoj dposqd psoj psqdp j
          qpodjqpsod jsqpod jpqosj dqposd jpqosdj pqosjdpsqoj dposq dpoqdposqdsq
          dpsqqsjdqpsjdsqpojdspoqjdsqjd sqpdqsjd sqjqspdoq
        </div>
      </div>
    </div>
  );
}
