import React from "react";
import Button from "../../atoms/Button";


const Header = ({ handleSort, loading, sortVal }) => {
	return (
		<div className="flex w-full fixed right-0 left-0 z-40 shadow-lg top-0  items-center h-12 py-4 pl-4 bg-white">
			<p className="w-7/12 italic hover:bg-gray-200 tracking-wide uppercase text-base flex font-bold justify-start">Ascii Faces</p>
			<div className="flex bg-green-500 w-5/12 p-3">
				<p className="w-6/12 text-white uppercase tracking-wide text-base">
					Sort By:{" "}
				</p>
				<div className="w-6/12 flex justify-around">
					<Button props={{
						type: "button",
						classes: "bg-white text-green-700 text-lg uppercase hover:bg-gray-200",
						onClick: () => handleSort("size"),
						title: "size",
						disabled: loading === "loading" || sortVal === 'size',
					}}/>
					<Button props={{
						type: "button",
						classes: "bg-white text-green-700 text-lg uppercase hover:bg-gray-200",
						onClick: () => handleSort("price"),
						title: "price",
						disabled: loading === "loading" || sortVal === 'price',
					}}/>
					<Button props={{
						type: "button",
						classes: "bg-white text-green-700 text-lg uppercase hover:bg-gray-200",
						onClick: () => handleSort("id"),
						title: "ID",
						disabled: loading === "loading" || sortVal === 'id',
					}}/>
				</div>
			</div>
		</div>
	);
};

export default Header;
