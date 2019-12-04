// eslint-disable-next-line import/prefer-default-export
const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://asciifaces.herokuapp.com/products/"
    : "http://localhost:3000/products/";

export default BASE_URL;
