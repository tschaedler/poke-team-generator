import React, { MouseEventHandler } from "react";

type Props = {
	btnName: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
	disabled?: boolean;
};

const Button = ({ btnName, onClick, disabled = false }: Props) => {
	return (
		<button
			type="button"
			className={`font-semibold rounded px-4 py-2 ${
				disabled
					? "bg-gray-300 cursor-not-allowed opacity-50 text-neutral-800"
					: "bg-blue-500 hover:bg-blue-700 active:bg-blue-800 text-white"
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{btnName}
		</button>
	);
};

export default Button;
