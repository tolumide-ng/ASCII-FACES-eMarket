import React from "react";
import AsciiCard from "../../molecules/AsciiCard";

const AsciiContainer = ({ dealRow, observer, match }) => {
	return (
		<div className=" w-full flex mt-10 mb-10 justify-around px-6">
			{dealRow.map(item => {
				const { id, size, face, date, price } = item;
				return (
					<AsciiCard
						key={id}
						id={id}
						size={size}
						observer={observer}
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
