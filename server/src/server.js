const express = require("express");
const app = express();
const knex = require("./knex");
const cors = require("cors");
const path = require("path");
const auth = require("./routes/auth");

// checks if in development or production
ENVIRONMENT = process.env.NODE_ENV || "development";
console.log("ENVIRONMENT", ENVIRONMENT);

if (ENVIRONMENT === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
} else {
  app.use("/", express.static(path.join(__dirname, "../../client/dist")));
}
// const allowedOrigins = ["http://localhost:5173"];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );

// const allowlist = ["http://localhost:5173", "http://example2.com"];
// const corsOptionsDelegate = function (req, callback) {
//   let corsOptions;
//   if (allowlist.indexOf(req.header("Origin")) !== -1) {
//     corsOptions = { origin: true, credentials: true }; // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false, credentials: true }; // disable CORS for this request
//   }
//   callback(null, corsOptions); // callback expects two parameters: error and options
// };

// app.use(cors(corsOptionsDelegate));

app.use(express.json());

// routes
app.use("/api/auth", auth);

// test endpoints
app.get("/api/user", async (req, res) => {
  try {
    const users = await knex
      .select("id", "username", "city")
      .from("users")
      .limit(100);

    res.json(users);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`We can hear you over on port ${PORT} 👂`);
});
