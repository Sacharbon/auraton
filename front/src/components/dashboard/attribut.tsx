export interface AttributProps {
    attribut: string
    color: string
}

export const Attribut = ({attribut, color}:AttributProps) => {
    return (
        <div className={`border-black rounded-lg pl-2 pr-2 bg-opacity-50 w-max ${color}`}>
            <div className={`flex items-center font-poppins text-black`}>{attribut}</div>
        </div>
    );
}