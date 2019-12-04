import React, { useEffect, useState, useMemo, useRef } from 'react';
import BASE_URL from '../../../config';
import { Route } from 'react-router-dom';
import AsciiContainer from '../../../components/UI/organisms/AsciiContainer';
import Loader from '../../UI/atoms/Loader';
import Header from '../../UI/molecules/Header';
import Modal from '../../UI/organisms/Modal';
import {getData, loadIntoRows, closeModal} from '../../../utils'

const END = '~ end of catalogue ~';

const Home = ({ match }) => {
  const [deals, setDeals] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [loading, setLoading] = useState('done');
  const [advert, setAdvert] = useState([]);
  const [sortVal, setSortVal] = useState('');
  const [preFetchedDeals, setPreFetchedDeals] = useState(null);
  const [endOfPage, setEndOfPage] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true)

  const watchLoadedValues = useMemo(() => deals, []);

  function createScrollObserver() {
    const options = { threshold: [0, 1], rootMargin: '300px 0px' };
    return new IntersectionObserver(fetchMore, options);
  }

  // Using an event listener that detects scroll would be wasteful as it runs on every px scroll, we would be using the Intersection observer API
  const scrollObserver = createScrollObserver();

  const gridRef = useRef(null);
  const runRef = useRef(true);

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
    if (preFetchedDeals && endOfPage && deals.length) {
      setDeals(allDeals => [...allDeals, ...preFetchedDeals]);
      setPreFetchedDeals(null);
      setEndOfPage(false);
      runRef.current = true;
    }
  }, [endOfPage, preFetchedDeals]);

  useEffect(() => {
    // Load more data when the user is almost at the end of the screen
    (async () => {
      let url = getUrl();
      const response = await getData(url, getAds);
      const result = loadIntoRows(response);
        setDeals(result);
        setFirstLoad(false)

    })();

  }, [sortVal]);


  requestIdleCallback(
    async () => {
      if (deals.length > 1 && !preFetchedDeals && runRef.current) {
        let url = getUrl();
        runRef.current = false;
        const response = await getData(url, getAds);
        const result = loadIntoRows(response);
        setPreFetchedDeals(result);
      }
    },
    { timeout: 40 }
  );

  // IntersectionObserver
  function fetchMore([entry]) {
    if (entry.isIntersecting && entry.intersectionRatio === 1) {
      setEndOfPage(true);
    }
  }

  // Display data based on users choice
  const handleSort = sortBy => {
    setDeals([]);
    setPage(1);
    // setSortVal('')
    setPreFetchedDeals(null);
    runRef.current = true;


    if (sortBy === 'price') {
      setSortVal('price');
    } else if (sortBy === 'id') {
      setSortVal('id');
    } else if (sortBy === 'size') {
      setSortVal('size');
    }
  };

  const getUrl = () => {

    const url = `${BASE_URL}?_page=${page}&_limit=${limit}${
      sortVal ? `&_sort=${sortVal}` : ''
    }`;
    setPage(page => (page += 1));
    return url;
  };

  const getAds = async () => {
    const generatedAd = await fetch(
      `${BASE_URL}/ads/?r=${Math.floor(Math.random() * 100)}`
    );

    setAdvert(prevAds => [...prevAds, generatedAd.url]);
  };

  return (
    <>
      <div className="px-6 mx-4 pt-10">
        <Header handleSort={handleSort} loading={loading} sortVal={sortVal} />
        {Boolean(deals.length) &&
          deals.map((dealRow, index = 1) => {
            return (
              <div key={index}>
                <AsciiContainer dealRow={dealRow} match={match} />
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
          render={() => <Modal close={closeModal} />}
        />
        {!deals.length && (
          <div className="w-full flex justify-center items-center mx-auto h-screen">
            <Loader />
          </div>
        )}
        {endOfPage && !preFetchedDeals && Boolean(deals.length) && <div className="w-full flex justify-center items-center mx-auto">
            <Loader />
          </div>}
      </div>
      {deals && deals.length === 500 / 4 && <p>{END}</p>}
      <span className="bottom" ref={gridRef} />
    </>
  );
};

export default Home;