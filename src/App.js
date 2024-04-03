import React, { useState, useEffect } from "react";
import CreatureCard from "./components/CreatureCard";
import setdex from "./assets/sm_ou";
import Button from "./components/Button";

const bluePrintTeam = [
	{
		creatureName: "???",
		lvl: "???",
		ability: "???",
		item: "???",
		nature: "???",
		attacks: ["???", "???", "???", "???"],
	},
	{
		creatureName: "???",
		lvl: "???",
		ability: "???",
		item: "???",
		nature: "???",
		attacks: ["???", "???", "???", "???"],
	},
	{
		creatureName: "???",
		lvl: "???",
		ability: "???",
		item: "???",
		nature: "???",
		attacks: ["???", "???", "???", "???"],
	},
	{
		creatureName: "???",
		lvl: "???",
		ability: "???",
		item: "???",
		nature: "???",
		attacks: ["???", "???", "???", "???"],
	},
	{
		creatureName: "???",
		lvl: "???",
		ability: "???",
		item: "???",
		nature: "???",
		attacks: ["???", "???", "???", "???"],
	},
	{
		creatureName: "???",
		lvl: "???",
		ability: "???",
		item: "???",
		nature: "???",
		attacks: ["???", "???", "???", "???"],
	},
];

const App = () => {
	const [mateCounter, setMateCounter] = useState(0);
	const [disableBtn, setDisableBtn] = useState(false);
	const [team, setTeam] = useState(bluePrintTeam);

	// Generate six random creatures on page load
	useEffect(() => {
		// generateTeam();
	}, []);

	// Function to generate a random creatures
	const generateRandomCreature = (allowDuplicates = false) => {
		// Get a random creatures
		let randomCreatureName;
		if (allowDuplicates) {
			const creatureNames = Object.keys(setdex);
			randomCreatureName =
				creatureNames[Math.floor(Math.random() * creatureNames.length)];
		} else {
			const availableCreatureNames = Object.keys(setdex).filter(
				(name) =>
					!team.some((creature) => creature.creatureName === name)
			);
			if (availableCreatureNames.length === 0) {
				// If there are no more available creatures names, return null
				return null;
			}
			randomCreatureName =
				availableCreatureNames[
					Math.floor(Math.random() * availableCreatureNames.length)
				];
		}

		const creatureData = setdex[randomCreatureName];

		// Get a random set for the selected creatures
		const randomSetIndex = Math.floor(Math.random() * creatureData.length);
		const randomSet = creatureData[randomSetIndex];

		// Function to get a random move not already chosen
		const getRandomMove = (moves, chosenMoves) => {
			const availableMoves = moves.filter(
				(move) => !chosenMoves.includes(move)
			);
			return availableMoves[
				Math.floor(Math.random() * availableMoves.length)
			];
		};

		// Initialize an array to keep track of chosen moves
		let chosenMoves = [];

		// Choose moves for each move group, avoiding duplicates
		const attacks = randomSet.moves.map((moveGroup) => {
			const move = getRandomMove(moveGroup, chosenMoves);
			chosenMoves.push(move);
			return move;
		});
		const creatureName = randomCreatureName.toLowerCase();
		const ability =
			randomSet.ability.length >= 2
				? randomSet.ability[
						Math.floor(Math.random() * randomSet.ability.length)
				  ]
				: randomSet.ability;
		const item =
			randomSet.item.length >= 2
				? randomSet.item[
						Math.floor(Math.random() * randomSet.item.length)
				  ]
				: randomSet.item;
		const nature =
			randomSet.nature.length >= 2
				? randomSet.nature[
						Math.floor(Math.random() * randomSet.nature.length)
				  ]
				: randomSet.nature;
		const lvl = randomNumber(1, 100);

		return { creatureName, lvl, ability, item, nature, attacks };
	};

	// Function to check if the creature is already in the team
	const isCreatureInTeam = (creatureName, team) => {
		return team.some((creature) => creature.creatureName === creatureName);
	};

	// Generate six random creatures
	const generateTeam = () => {
		let newTeam = [];
		for (let i = 0; i < 6; i++) {
			let creature = generateRandomCreature();
			while (
				creature &&
				isCreatureInTeam(creature.creatureName, newTeam)
			) {
				creature = generateRandomCreature(); // Generate a new random creature
			}
			if (creature) {
				newTeam.push(creature);
			} else {
				// If no more unique creatures names are available, break out of the loop
				break;
			}
		}

		setTeam(newTeam);
	};

	const addCreatureToTeam = async () => {
		if (mateCounter < 6) {
			setDisableBtn(true);
			const delay = 100; // Adjust the delay time as needed
			for (let i = 0; i < 20; i++) {
				let creature = generateRandomCreature();
				while (
					creature &&
					isCreatureInTeam(creature.creatureName, team)
				) {
					creature = generateRandomCreature(); // Generate a new random creature
				}
				await delayFunction(delay);
				setTeam((prevTeam) => {
					const updatedTeam = [...prevTeam];
					updatedTeam[mateCounter] = creature;
					return updatedTeam;
				});
			}
			setMateCounter(mateCounter + 1);
			setDisableBtn(false);
		}
	};

	// Function to delay execution
	const delayFunction = (ms) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};

	const randomNumber = (min, max) => {
		return Math.floor(Math.random() * (max - min) + min);
	};

	return (
		<div className="container mx-auto text-center">
			<h1 className="text-3xl mt-5">
				Random Pok&eacute;mon Team Generator
			</h1>
			<br />
			<div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-3 my-10">
				{team.map((creature, index) => (
					<CreatureCard
						key={index}
						creatureName={creature.creatureName}
						lvl={creature.lvl}
						ability={creature.ability}
						item={creature.item}
						nature={creature.nature}
						moves={creature.attacks}
					/>
				))}
			</div>
			<div className="grid grid-cols-3 gap-3">
				<Button btnName="generate full Team" onClick={generateTeam} />
				<Button
					btnName="add Teammate"
					onClick={addCreatureToTeam}
					disabled={mateCounter >= 6 || disableBtn}
				/>
				<Button
					btnName="reset Team"
					onClick={() => {
						setTeam(bluePrintTeam);
						setMateCounter(0);
					}}
				/>
			</div>
		</div>
	);
};

export default App;
