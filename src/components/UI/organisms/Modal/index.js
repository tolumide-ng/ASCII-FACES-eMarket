import React, { useEffect, useState, useRef } from "react";
import { withRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import BASE_URL from "../../../../config";
import { arrOfSizes, convertToDaysAgo } from "../../../../utils";
import Loader from "../../atoms/Loader";
import "./index.css";
import Button from "../../atoms/Button";

const Modal = ({ match, history }) => {
	const [details, setDetails] = useState({});
	const [notFound, setNotFound] = useState(false);
	const [size, setSize] = useState("");

	const indicatorRef = useRef(null);

	useEffect(() => {
		if (match.params.id) {
			setDetails({});
			fetchImage();
		}
	}, []);

	const fetchImage = async () => {
		const response = await fetch(`${BASE_URL}/${match.params.id}`);
		const result = await response.json();
		if (!Object.keys(result).length) {
			setNotFound(true);
		} else {
			setNotFound(false);
		}
		setDetails(result);
		setSize(result.size);
	};

	const handleChange = e => {
		e.preventDefault();
		setSize(e.target.value);
	};

	return ReactDOM.createPortal(
		<section className=" w-full h-screen flex flex-col justify-center items-center fixed top-0 left-0 right-0 bottom-0 overflow-hidden  modal p-12">
			<Button
				onClick={() => {
					return history.push("/#/");
				}}
				aria-label="close"
				className="bg-white p-4 rounded-full absolute top-0 right-0 mr-12"
				title="X"
			/>
			{Boolean(Object.keys(details).length) && (
				<div className="flex w-10/12 bg-white h-screen rounded-lg shadow-md">
					<div className="flex justify-center items-center w-9/12">
						<div className="p-3 shadow-md bg-white">
							<p style={{ fontSize: `${size}px` }}>
								{details.face}
							</p>
						</div>
					</div>
					<div className="w-3/12 flex flex-col justify-center items-start">
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
							onClick={() => {
								indicatorRef.current.classList.remove(
									"invisible"
								);
								setTimeout(() => {
									indicatorRef.current.classList.add(
										"invisible"
									);
								}, 1000);
							}}
						/>
						<p
							className="text-red-300 invisible"
							ref={indicatorRef}
						>
							Item is not available for sale at the moment
						</p>
					</div>
				</div>
			)}
			{!notFound && !Object.keys(details).length && (
				<div className="w-full flex justify-center items-center mx-auto mt-16">
					<Loader />
				</div>
			)}

			{notFound && <div>Product Not Found </div>}
		</section>,
		document.getElementById("modal-root")
	);
};

export default withRouter(Modal);
