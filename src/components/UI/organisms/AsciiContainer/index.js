import React from "react";
import AsciiCard from "../../molecules/AsciiCard";

const AsciiContainer = ({ dealRow, match }) => {
	return (
		<div className=" w-full flex flex-col lg:flex-row lg:mt-10 lg:mb-10 mb-4 mt-4 items-center justify-center lg:justify-around px-6">
			{dealRow.map(item => {
				const { id, size, face, date, price } = item;
				return (
					<AsciiCard
						key={id}
						id={id}
						size={size}
						face={face}
						date={date}
						price={price}
						match={match}
					/>
				);
			})}
		</div>
	);
};

export default AsciiContainer;
