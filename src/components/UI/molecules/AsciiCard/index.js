import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { centToDollar, convertToDaysAgo } from '../../../../utils';

const AsciiCard = ({
  size, date, id, price, face,
}) => {
  const pageRef = useRef(null);

  return (
    <div
      ref={pageRef}
      className="border-gray-100 m-3 shadow-md w-full lg:w-2/7 border flex bg-white flex-col justify-between items-center h-56"
    >
      {' '}
      <div className="ascii-container hover:border face hide-image pt-4">
        <p style={{ fontSize: `${size}px` }}>{face}</p>
      </div>
      <div className="w-full border border-gray-100 flex justify-between p-3">
        <div className="flex flex-col">
          <p className="mb-4">
            Date:
            {' '}
            <strong>{convertToDaysAgo(date)}</strong>
          </p>
          <p>
            current size:
            {size}
            px
          </p>
        </div>
        <div className="flex flex-col justify-between items-center">
          <p className="mr-4 text-blue-500">{centToDollar(price)}</p>
          <Link
            className="px-3 py-1 bg-green-300 rounded shadow-md cursor-pointer text-white hover:bg-green-700"
            to={`/${id}`}
          >
            Options
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AsciiCard;
