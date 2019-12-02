import React from "react";
import Button from "../../atoms/Button";

const Header = ({ handleSort, loading }) => {
	{
		console.log("value of loading", loading);
	}
	return (
		<div className="flex w-full fixed right-0 left-0 z-50 shadow-lg top-0  items-center h-12 py-4 pl-4">
			<p className="w-8/12">Ascii Faces</p>
			<div className="flex bg-green-400 w-4/12 p-3">
				<p className="w-6/12 text-white uppercase tracking-wide text-base">
					Sort By:{" "}
				</p>
				<div className="w-6/12 flex justify-around">
					<Button
						type="button"
						classes="bg-white text-green-700 text-lg uppercase hover:bg-gray-200"
						onClick={() => handleSort("size")}
						title="size"
						disabled={loading}
					/>
					<Button
						type="button"
						classes="bg-white text-green-700 text-lg uppercase hover:bg-gray-200"
						onClick={() => handleSort("price")}
						title="price"
						disabled={loading}
					/>
					<Button
						type="button"
						classes="bg-white text-green-700 text-lg uppercase hover:bg-gray-200"
						onClick={() => handleSort("id")}
						title="id"
						disabled={loading}
					/>
				</div>
			</div>
		</div>
	);
};

export default Header;
