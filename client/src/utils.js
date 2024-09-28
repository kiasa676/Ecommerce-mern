import axios from "axios";

export const axiosClient = axios.create({
  baseURL: "http://localhost:1337/api",
  headers: {
    common: {
      Authorization: `Bearer 7d76bf1497c6dcd55ee5ddef606f4b6e1eaa42f4e8af1c21c4519b28d345f68004733759a1aa92d64b994070dbe21512fcadd8aa69e09bbd2ab0c9092d1bd69e210da069e5932643d02cd6ac293b292d9cf42163247b60534c27d2e1b321f5a27be71f971fc86458ce463e03abdfb8bd8ec7e37607564f3029e27ae8fdb596bf`,
    },
  },
});
