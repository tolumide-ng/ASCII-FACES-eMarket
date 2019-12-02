import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { withRouter } from "react-router-dom";
import { BASE_URL } from "../../../../utils";

const Modal = ({ match, history }) => {
	const modalRef = useRef(null);
    const [details, setDetails] = useState({});

    const fetchDetails = (id) => {
        const url = `${BASE_URL}${id}`;

		const response = await fetch(url);

        const result = await response.json();

        setDetails(result)

    }

    const hideModal = () => {
        setDetails({})
        history.pop()
    }

	useEffect(() => {
        fetchDetails(match.params.id);
        document.getElementById('close-modal').focus()
    }, []);

    return ReactDOM.createPortal(<section>
        {Boolean(Object.keys(details).length) && (<div className="flex w-full ">
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
				</div>) }
    </section>),
    document.getElementById('modal-root')
};

export default withRouter(Modal);
