import React from "react";
import ballImg from "../assets/pokeball.svg";

type Props = {
	className: string;
	creatureName: string;
	lvl: number;
	ability: string;
	item: string;
	nature: string;
	moves: [string, string, string, string];
};

const CreatureCard = ({
	className,
	creatureName,
	lvl,
	ability,
	item,
	nature,
	moves,
}: Props) => {
	const linkName = creatureName.replace(/\s/g, "-");
	return (
		<div
			className={`mx-3 my-3 border-white border-4 rounded-lg relative ${className}`}
		>
			<div className="w-80 sm:w-64 md:w-80 ms-auto text-left pt-1 pe-0 pb-0 ps-3 bg-white text-neutral-900 rounded-bl-lg rounded-tr-sm">
				<div className="flex pb-0.5">
					<img src={ballImg} alt="Pokeball" className="w-5 me-1" />
					<div className="capitalize font-semibold">
						{creatureName}
					</div>
				</div>
				<div className="flex">
					<div className="w-20 py-0.5">Lv. {lvl}</div>
					<div className="creature-nature w-full text-white ps-16 pe-2 py-0.5">
						<span className="font-semibold">Nature:</span> {nature}
					</div>
				</div>
			</div>
			<div className="grid grid-cols-2 sm:grid-cols-1 lg:grid-cols-2 ">
				<div id="attacks" className="py-4 pt-5">
					{moves.map((atk, index) => (
						<div
							key={index}
							className={`bg-white/[.06] py-1 w-52 border rounded-r-full border-emerald-600${
								index === 3 ? "" : " border-b-0"
							}`}
						>
							{atk}
						</div>
					))}
				</div>
				<div>
					<div className="h-36 relative">
						{creatureName !== "???" ? (
							<img
								className="pt-10 absolute mx-auto left-0 right-0"
								style={{ maxHeight: "120px" }}
								src={`https://play.pokemonshowdown.com/sprites/xyani/${linkName}.gif`}
								alt={creatureName}
							/>
						) : (
							""
						)}
					</div>
					<div className="w-full sm:w-56 ms-auto text-left p-1 ps-2 bg-white text-neutral-900 rounded-tl-lg rounded-br-sm">
						<div>
							<span className="font-semibold">• Ability:</span>{" "}
							{ability}
						</div>
						<div>
							<span className="font-semibold">• Item:</span>{" "}
							{item}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CreatureCard;
