import { polygonClient, restClient, websocketClient } from "@polygon.io/client-js";
// Get a rest client from polygon
const rest = restClient("s1pd4MlVenZGJWPP8p1mN3BUpO7TVYZq");

let obj = rest.stocks.dailyOpenClose("AAPL", "2020-10-14");

obj.then(() => 
console.log("HOOOLA"));