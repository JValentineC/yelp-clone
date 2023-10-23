require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./db");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

//get all restaurants
app.get("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id"
    );
    res.status(200).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurants: results.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//get a restaurant
app.get("/api/v1/restaurants/:id", async (req, res) => {
  try {
    // `SELECT * FROM restaurants WHERE id = ${req.params.id}` - never do this!
    // string templating or concatenation make your db vulnerable
    const restaurant = await db.query(
      "SELECT * FROM restaurants LEFT JOIN (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 1) AS average_rating FROM reviews GROUP BY restaurant_id) reviews ON restaurants.id = reviews.restaurant_id WHERE id = $1",
      [req.params.id]
    );

    const reviews = await db.query(
      "SELECT * FROM reviews WHERE restaurant_id = $1",
      [req.params.id]
    );

    res.status(201).json({
      status: "success",
      // results: restaurant.rows.length,
      data: {
        restaurant: restaurant.rows[0],
        reviews: reviews.rows,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//create a restaurant
app.post("/api/v1/restaurants", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
      [req.body.name, req.body.location, req.body.price_range]
    );
    res.status(202).send({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//updeate restaurant
app.put("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query(
      "UPDATE restaurants SET name = $1, location = $2, price_range = $3 WHERE id = $4 RETURNING *",
      [req.body.name, req.body.location, req.body.price_range, req.params.id]
    );
    res.status(203).send({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

//delete restaurant
app.delete("/api/v1/restaurants/:id", async (req, res) => {
  try {
    const results = await db.query("DELETE FROM restaurants WHERE id = $1", [
      req.params.id,
    ]);
    res.status(204).json({
      status: "success",
      results: results.rows.length,
      data: {
        restaurant: results.rows[0],
      },
    });
    res.send("hello");
  } catch (error) {
    console.log(error);
  }
});

app.post("/api/v1/restaurants/:id/add-review", async (req, res) => {
  try {
    const results = await db.query(
      "INSERT INTO reviews (name, rating, review, restaurant_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [req.body.name, req.body.rating, req.body.review, req.params.id]
    );
    res.status(202).send({
      status: "success",
      data: {
        review: results.rows[0],
      },
    });
  } catch (error) {
    console.log(error);
  }
});

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`server is up and listening on port ${port}`);
});
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const db = require("./db/index");
// // const morgan = require("morgan");
// const { application } = require("express");
// const app = express();

// app.use(cors());
// app.use(express.json());

// //GET ALL restaurants
// app.get("/api/v1/restaurants", async (req, res) => {
//   try {
//     const results = await db.query(
//       "select * from restaurants left join (select restaurant_id, COUNT(*), TRUNC(AVG(rating),1)as average_rating from reviews group by restaurant_id) reviews on restaurant.id =reviews.restaurant_id;"
//     );

//     res.status(200).json({
//       status: "success",
//       results: results.rows.length,
//       data: {
//         restaurants: results.rows,
//       },
//     });
//   } catch (err) {
//     console.log();
//   }
// });
// //GET A restaurant
// app.get("/api/v1/restaurants/:id", async (req, res) => {
//   console.log(req.params.id);

//   try {
//     const results = await db.query(`select * from restaurants where id = $1`, [
//       req.params.id,
//     ]);

//     res.status(200).json({
//       status: "success",
//       data: {
//         restaurant: results.rows[0],
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });


// //CREATE a restaurant
// app.post("/api/v1/restaurants", async (req, res) => {
//   console.log(req.body);

//   try {
//     const results = await db.query(
//       "INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3)returning *",
//       [req.body.name, req.body.location, req.body.price_range]
//     );
//     console.log(results);
//     res.status(201).json({
//       status: "success",
//       data: {
//         restaurant: results.rows[0],
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// //UPDATE restaurant
// app.put("/api/v1/restaurants/:id", async (req, res) => {
//   try {
//     const results = await db.query(
//       "update restaurants SET name = $1, location = $2, price_range = $3 where id =$4 returning *",
//       [req.body.name, req.body.location, req.body.price_range, req.params.id]
//     );

//     res.status(200).json({
//       status: "success",
//       data: {
//         restaurant: results.rows[0],
//       },
//     });
//   } catch (err) {
//     console.log(err);
//   }
//   console.log(req.params.id);
//   console.log(req.body);
// });

// // DELETE restaurant
// app.delete("/api/v1/restaurants/:id", async (req, res) => {
//   try {
//     const results = await db.query("delete from restaurants where id = $1", [
//       req.params.id,
//     ]);
//     res.status(204).json({
//       status: "success",
//     });
//   } catch (err) {
//     console.log(err);
//   }
// });

// const port = process.env.PORT || 3001;
// app.listen(port, () => {
//   console.log(`server is up and listening on port ${port}`);
// });
