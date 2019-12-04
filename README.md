[Hosted on Heroku](https://facesascii.herokuapp.com/)

## Built With

1. React.js
2. TailwindCSS

## Features

1. A user can view all available products
2. Page Loads Using more data when the userAgent is idle using the RequestIdleCallback API
3. Pagination is detected using the Intersection Observer API
4. User can view a specific product and increase or reduce the size of such product before purchase
5. User can sort products by `size`, `price` or `id` of such products
6. Price of the products are displayed in dollars and number of days if the date of creation of such product is not past 7 days

## Getting Started

To get a local copy up and running follow these simple steps.

## Requirement

1. Please ensure you are connected to the internet
2. Ensure you set up your `.env` file as illustrated in Installation below


## Installation

1. Clone the repo

```
git clone https:://github.com/andela/demeter-ah-frontend.git
```

2. Install NPM packages

```
npm install
```

3. Setup a `.env` file as illustrated in the `.env.sample` file, set `NODE_ENV='development'`

4. Start the backend on one terminal

```
npm run start
```

5. Start the frontend on a second terminal
```
npm run dev
```



## Acknowledgements

_[developers.google](https://developers.google.com/web/updates/2015/08/using-requestidlecallback)
_[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback) \*[W3.org](https://www.w3.org/TR/requestidlecallback/)
