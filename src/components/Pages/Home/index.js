import React, { useEffect, useState, useMemo, useRef } from "react";
import { BASE_URL } from "../../../config";
import AsciiContainer from "../../../components/UI/organisms/AsciiContainer";
import Loader from "../../UI/atoms/Loader";
import Header from "../../UI/molecules/Header";

const END = "~ end of catalogue ~";

function toggleGrow(entry) {
	entry.forEach(change => {
		if (change.isIntersecting) {
			return change.target.classList.add("grow");
		}
		return change.target.classList.remove("grow");
	});
}

const Home = ({ match }) => {
	const [deals, setDeals] = useState([]);
	const [page, setPage] = useState(0);
	const [limit, setLimit] = useState(20);
	const [loading, setLoading] = useState(true);
	const [advert, setAdvert] = useState([]);
	// const [baseUrl, setBaseUrl] = useState(`${BASE_URL}`);
	const [sortVal, setSortVal] = useState("");
	const [firstLoad, setFirstLoad] = useState(true);
	const [preFetchedDeals, setPreFetchedDeals] = useState([]);

	// Using an event listener that detects scroll would be wasteful as it runs on every px scroll, we would be using the Intersection observer API
	const scrollObserver = createScrollObserver();
	const dealObserver = createDealObserver();

	const gridRef = useRef(null);

	useEffect(() => {
		scrollObserver.observe(gridRef.current);

		// Prevent memory leaks disconnect observer
		return () => {
			if (dealObserver) {
				scrollObserver.disconnect();
				dealObserver.disconnect();
			}
		};
	}, []);

	// useEffect(() => {
	// 	// Load more data when the user is almost at the end of the screen
	// 	fetchDeals(false);
	// }, [page]);

	useEffect(() => {
		// Load more data when the user is almost at the end of the screen
		fetchDeals(true);
	}, [sortVal]);

	requestIdleCallback(
		async () => {
			if (!preFetchedDeals.length) {
				setPage(page => (page += 1));
				await fetchDeals();
			}
		},
		{ timeout: 40 }
	);

	// Display data based on users choice
	const handleSort = sortBy => {
		console.log("I have been called with sort by", sortBy);
		setDeals([]);
		setLoading(true);
		if (sortBy === "price") {
			setSortVal("price");
		} else if (sortBy === "id") {
			setSortVal("id");
		} else if (sortBy === "size") {
			setSortVal("size");
		}
	};

	const fetchDeals = async changed => {
		if (firstLoad) {
			setLoading(true);
		}

		const url = `${BASE_URL}?_page=${page}&_limit=${limit}${
			sortVal ? `&_sort=${sortVal}` : ""
		}`;

		const response = await fetch(url);

		const generatedAd = await fetch(
			`${BASE_URL}/ads/?r=${Math.floor(Math.random() * 100)}`
		);

		const result = await response.json();

		setAdvert(prevAds => [...prevAds, generatedAd.url]);

		loadIntoRows(result);
		console.log("this is another data running ?>>>>>>>>>>>>>");
	};

	async function loadIntoRows(deals) {
		const rows = [];

		if (deals.length) {
			for (let i = 0; i < deals.length; i += 4) {
				rows.push(deals.slice(i, i + 4));
			}

			// setDeals(prevDeals => [...prevDeals, ...rows]);
			if (firstLoad) {
				setDeals(rows);
				setLoading(false);
				setFirstLoad(false);
			} else {
				setPreFetchedDeals(rows);
			}
		}
		// return rows;
	}

	function createDealObserver() {
		let options = { threshold: [0] };
		return new IntersectionObserver(toggleGrow, options);
	}

	function createScrollObserver() {
		const options = { threshold: [0, 1], rootMargin: "300px 0px" };
		return new IntersectionObserver(fetchMore, options);
	}

	// REQUEST IDLE FRAME, FETCH MORE DATA WHEN THE BROWSER IS LESIDLE I.E. NOT BUSY

	function fetchMore([entry]) {
		if (entry.isIntersecting && entry.intersectionRatio === 1) {
			setDeals(prevDeals => [...prevDeals, ...preFetchedDeals]);
			setPreFetchedDeals([]);
			// setPage(page => (page += 1));
			// APPEND THE PREFETCHED DATA AT THIS POINT
			//  if the cache is emptu ignite the addition of the new daya
			// EMPTY THE CACHE, THE REQUEST IDLE FRAME WAITS UNTIL THE BROSER IS IDLE AGAIN, BEFORE IT PREFETCHES DATA
		}
	}

	// [SCALABILITY] Using redux in this project would have made it easier to pass the functions and I would have been able to abstract the header into the router where I can check the url and display the header if it is supposed to be displayed on such page

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
									observer={dealObserver}
									match={match}
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
				{Boolean(loading) && (
					<div className="w-full flex justify-center items-center mx-auto mt-10">
						<Loader />
					</div>
				)}
			</div>
			{/* {deals && deals.length === 500 / 4 && <p>{END}</p>} */}
			<span className="bottom" ref={gridRef} />
		</>
	);
};

export default Home;
