
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express(); 

const restaurants = JSON.parse(
  fs.readFileSync(path.join(__dirname, "restaurants.json"), "utf-8")
);

app.get("/", (req, res) => {
  res.send(restaurants);
});

app.get("/restaurants", (req, res) => {
  res.json(restaurants);
});

app.get("/restaurants/name", (req, res) => {
  const restaurants_name = restaurants.map(restaurants => restaurants.name)
  res.json(restaurants_name);
});

app.get("/restaurants/id", (req, res) => {
  const restaurants_id = restaurants.map(restaurants => restaurants.id)
  res.json(restaurants_id);
});
app.get("/restaurants/location", (req, res) => {
  const restaurants_location = restaurants.map(restaurants => restaurants.location)
  res.json(restaurants_location);
});
app.get("/restaurants/restaurant_image_links", (req, res) => {
  const restaurant_image_links = restaurants.map(restaurants => restaurants.restaurant_image_links)
  res.json(restaurant_image_links);
});

app.get("/restaurants/menu", (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ message: "Restaurant name gonderilmeyib" });
  }

  const restaurant = restaurants.find(
    (r) => r.name.toLowerCase() === name.toLowerCase()
  );

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant tapilmadi" });
  }

  res.json(restaurant.menu);
});

app.get("/restaurants/:name/menu/:type", (req, res) => {
  const { name, type } = req.params;

  const restaurant = restaurants.find(
    (r) => r.name.toLowerCase() === name.toLowerCase()
  );

  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant tapilmadi" });
  }

  if (!restaurant.menu[type]) {
    return res.status(400).json({ message: "foods ve ya drinks secin" });
  }

  res.json(restaurant.menu[type]);
});


app.listen(5000, () => {
  console.log("Server isleyir");
});
