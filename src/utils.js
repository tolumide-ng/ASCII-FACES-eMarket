// Create an array of different sizes

export const arrOfSizes = () => {
  const sizes = [];
  for (let i = 12; i <= 150; i++) {
    sizes.push(i);
  }
  return sizes;
};

// Convert cents into dollars
export const centToDollar = (cents) => {
  // execute the function only if cents the function receives the argument
  if (cents && typeof Number(cents) === 'number') {
    const dollars = Number(cents) / 100;
    return dollars.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  }
  return 'Please pass a valid number in cents';
};

// If the date the ascii face was created in more than seven days return the date
export const convertToDaysAgo = (createdDate) => {
  if (new Date(createdDate) instanceof Date && !isNaN(new Date(createdDate))) {
    const dateCreated = new Date(createdDate);
    const today = new Date();
    const dayInMs = 24 * 3600 * 1000;

    // set Hours/Minutes/Seconds/Milliseconds of dates to Zero to get accurate value of substraction
    dateCreated.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const daysAgo = (+today - +dateCreated) / dayInMs;
    // Check how many days ago it was created
    if (daysAgo > 7) {
      return `${dateCreated.getFullYear()}/${dateCreated.getMonth()}/${dateCreated.getDate()}`;
    }
    if (daysAgo === 0) {
      return 'Today';
    }
    return `${daysAgo} day(s) ago`;
  }
  return 'You need to pass a valid date';
};

export const getData = async (url, getAds) => {
  const response = await fetch(url);

  await getAds();

  const result = await response.json();

  return result;
};

export const loadIntoRows = (deals) => {
  const rows = [];

  if (deals.length) {
    for (let i = 0; i < deals.length; i += 4) {
      rows.push(deals.slice(i, i + 4));
    }
    return rows;
  }
};

export const closeModal = () => {
  history.push('/');
};


export const respondToButtonClick = (indicatorRef) => {
  indicatorRef.current.classList.remove(
    "invisible"
  );
  setTimeout(() => {
    indicatorRef.current.classList.add(
      "invisible"
    );
  }, 1000);
}