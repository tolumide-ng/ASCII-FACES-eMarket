import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import { BASE_URL } from "../../../../config";
import { arrOfSizes, convertToDaysAgo } from "../../../../utils";
import Loader from "../../atoms/Loader";
import Button from "../../atoms/Button";

const Modal = ({ match }) => {
	const [details, setDetails] = useState({});
	const [notFound, setNotFound] = useState(false);
	const [size, setSize] = useState("");

	useEffect(() => {
		setDetails({});
		fetchImage();
	}, []);

	async function fetchImage() {
		const response = await fetch(`${BASE_URL}/${match.params.id}`);
		const result = await response.json();
		if (!Object.keys(result).length) {
			setNotFound(true);
		} else {
			setNotFound(false);
		}
		setDetails(result);
		setSize(result.size);
	}

	const handleChange = e => {
		e.preventDefault();
		setSize(e.target.value);
	};

	return (
		<div className="w-full h-screen flex items-center justify-center">
			{Boolean(Object.keys(details).length) && (
				<div className="flex w-full ">
					<div className="flex justify-center items-center w-6/12">
						<div className="p-3 shadow-md">
							<p style={{ fontSize: `${size}px` }}>
								{details.face}
							</p>
						</div>
					</div>
					<div className="w-6/12 ">
						<div>
							<span>Price: </span>
							<strong>${details.price}</strong>
						</div>
						<div>
							Current Size: <strong>{size}</strong>
						</div>
						<div>
							<span>Date: </span>{" "}
							<strong>{convertToDaysAgo(details.date)}</strong>
						</div>
						<form>
							<span> Choose a different size:</span>
							<select
								onChange={handleChange}
								value={size}
								className="w-14 ml-6"
							>
								{arrOfSizes().map(item => {
									return <option key={item}>{item}</option>;
								})}
							</select>
						</form>
						<Button
							title="Buy Now"
							classes="mt-6 bg-green-500 px-3 text-white text-lg font-semibold py-2 hover:bg-green-700"
						/>
					</div>
				</div>
			)}
			{!notFound && !Object.keys(details).length && (
				<div className="w-full flex justify-center items-center mx-auto mt-10">
					<Loader />
				</div>
			)}

			{notFound && <div>Product Not Found </div>}
		</div>
	);
};

export default withRouter(Modal);
