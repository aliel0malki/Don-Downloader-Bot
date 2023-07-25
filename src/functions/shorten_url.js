const axios = require("axios");
require("dotenv/config");
// Shorten URL
const shortenUrl = async (url) => {
  const encodedParams = new URLSearchParams();
  encodedParams.set("url", url);

  const options = {
    method: "POST",
    url: "https://url-shortener-service.p.rapidapi.com/shorten",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": `${process.env["RAPI_TOKEN"]}`,
      "X-RapidAPI-Host": "url-shortener-service.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    const data = response.data;
    console.log(data);
    return data.result_url;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { shortenUrl };
