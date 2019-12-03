import React, { useEffect, useState, useMemo, useRef } from "react";
import { BASE_URL } from "../../../config";
import { Route } from "react-router-dom";
import AsciiContainer from "../../../components/UI/organisms/AsciiContainer";
import Loader from "../../UI/atoms/Loader";
import Header from "../../UI/molecules/Header";
import Modal from "../../UI/organisms/Modal";

const END = "~ end of catalogue ~";

const Home = ({ match }) => {
	const [deals, setDeals] = useState([]);
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(20);
	const [loading, setLoading] = useState("done");
	const [advert, setAdvert] = useState([]);
	const [sortVal, setSortVal] = useState("");
	const [preFetchedDeals, setPreFetchedDeals] = useState(false);
	const [endOfPage, setEndOfPage] = useState(false);
	const [fetching, setFetching] = useState(false);

	// Using an event listener that detects scroll would be wasteful as it runs on every px scroll, we would be using the Intersection observer API
	const scrollObserver = createScrollObserver();
	const runRef = useRef(true);

	const gridRef = useRef(null);

	useEffect(() => {
		scrollObserver.observe(gridRef.current);

		// Prevent memory leaks disconnect observer
		return () => {
			if (scrollObserver) {
				scrollObserver.disconnect();
			}
		};
	}, []);

	useEffect(() => {
		if (preFetchedDeals && endOfPage) {
			setPreFetchedDeals(false);
			setEndOfPage(false);
		}
	}, [page]);

	useEffect(() => {
		(async () => {
			setPage(1);

			let url = getUrl();

			const response = await getData(url);
			const result = loadIntoRows(response);
			setDeals(result);
		})();
	}, [sortVal]);

	requestIdleCallback(
		async () => {
			if (deals.length > 1 && !preFetchedDeals && !fetching) {
				let url = getUrl();
				const response = await getData(url);
				const result = loadIntoRows(response);
				setPreFetchedDeals(true);
				setDeals(deals => [...deals, ...result]);
			}
		},
		{ timeout: 50 }
	);

	const makeChanges = () => {
		setEndOfPage(true);
		setPage(page => (page += 1));
	};

	// IntersectionObserver
	function fetchMore([entry]) {
		if (entry.isIntersecting && entry.intersectionRatio === 1 && !fetching)
			makeChanges();
	}

	// Display data based on users choice
	const handleSort = sortBy => {
		setDeals([]);
		if (sortBy === "price") {
			setSortVal("price");
		} else if (sortBy === "id") {
			setSortVal("id");
		} else if (sortBy === "size") {
			setSortVal("size");
		}
	};

	const getUrl = () => {
		const url = `${BASE_URL}?_page=${page}&_limit=${limit}${
			sortVal ? `&_sort=${sortVal}` : ""
		}`;
		return url;
	};

	const getData = async url => {
		setFetching(true);
		const response = await fetch(url);

		const generatedAd = await fetch(
			`${BASE_URL}/ads/?r=${Math.floor(Math.random() * 100)}`
		);

		setAdvert(prevAds => [...prevAds, generatedAd.url]);

		const result = await response.json();
		setFetching(false);

		return result;
	};

	function loadIntoRows(deals) {
		const rows = [];

		if (deals.length) {
			for (let i = 0; i < deals.length; i += 4) {
				rows.push(deals.slice(i, i + 4));
			}
			return rows;
		}
	}

	function createScrollObserver() {
		const options = { threshold: [0, 1], rootMargin: "300px 0px" };
		return new IntersectionObserver(fetchMore, options);
	}

	function closeModal() {
		history.push("/");
	}

	return (
		<>
			<div className="px-6 mx-4 pt-10">
				<Header handleSort={handleSort} loading={loading} />
				{Boolean(deals.length) &&
					deals.map((dealRow, index = 1) => {
						return (
							<div key={index}>
								<AsciiContainer
									dealRow={dealRow}
									match={match}
									className="w-full"
								/>
								{index % 5 === 4 && (
									<div className="w-full flex justify-center items-center mb-4">
										<img
											src={advert[(index + 1) / 5 - 1]}
											alt="an advertisement from one of our sponsors"
										/>
									</div>
								)}
							</div>
						);
					})}
				<Route
					path="/:id"
					render={routerProps => (
						<Modal {...routerProps} close={closeModal} />
					)}
				/>
				{!deals.length && (
					<div className="w-full flex justify-center items-center mx-auto h-screen">
						<Loader />
					</div>
				)}
			</div>
			{deals && deals.length === 500 / 4 && <p>{END}</p>}
			<span className="bottom" ref={gridRef} />
		</>
	);
};

export default Home;
