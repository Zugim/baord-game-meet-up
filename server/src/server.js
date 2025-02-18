const express = require("express");
const app = express();
app.set("trust proxy", 1); // to get cookies to work with react
const knex = require("./knex");
const cors = require("cors");
const path = require("path");
const auth = require("./routes/auth");

// checks if in development or production
ENVIRONMENT = process.env.NODE_ENV || "development";
console.log("ENVIRONMENT:", ENVIRONMENT);

if (ENVIRONMENT === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
  );
} else {
  //app.use("/", express.static(path.join(__dirname, "../../client/dist")));
  app.use(
    cors({
      origin: "https://board-game-meet-up.onrender.com",
      credentials: true,
    })
  );
}

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

app.get("/api/meeting", async (req, res) => {
  try {
    const meetings = await knex
      .select("id", "title", "location")
      .from("meetings")
      .limit(100);

    res.json(meetings);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/board_game", async (req, res) => {
  try {
    const boardGames = await knex
      .select("id", "name", "primary_mechanic", "theme", "description")
      .from("board_games")
      .limit(100);

    res.json(boardGames);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// get users collection
app.get("/api/user/:id/board_game", async (req, res) => {
  try {
    const ownedGameIds = await knex
      .select("board_game_id")
      .from("user_board_game")
      .where("user_id", req.params.id);

    console.log(ownedGameIds);

    const boardGames = [];

    for (let i = 0; i < ownedGameIds.length; i++) {
      const [tmpBG] = await knex
        .select("*")
        .from("board_games")
        .where("id", ownedGameIds[i].board_game_id);

      boardGames.push(tmpBG);
    }

    console.log("USER BOARDGAMES", boardGames);

    res.json(boardGames);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// add game to users board game collection
app.post("/api/user/:id/board_game/add", async (req, res) => {
  try {
    console.log("ID BEFORE", req.params.id);

    const userId = Number(req.params.id);

    console.log("USER ID", userId);
    console.log("USER ID TYPE", typeof userId);

    const boardGameId = await knex("board_games").returning("id").insert({
      name: req.body.name,
      primary_mechanic: req.body.primary_mechanic,
      theme: req.body.theme,
      description: req.body.description,
    });

    console.log("BG ID", boardGameId);
    console.log("BG ID TYPE", typeof boardGameId);

    const userAndBoardGameIds = await knex("user_board_game").insert({
      user_id: userId,
      board_game_id: boardGameId[0].id,
    });

    res.json({ userId: userId, boardGameId: boardGameId[0].id });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// get meetings library
app.get("/api/meeting/:id/board_game", async (req, res) => {
  try {
    const ownedGameIds = await knex
      .select("board_game_id")
      .from("meeting_board_game")
      .where("meeting_id", req.params.id);

    console.log(ownedGameIds);

    const boardGames = [];

    for (let i = 0; i < ownedGameIds.length; i++) {
      boardGames.push(
        await knex
          .select("*")
          .from("board_games")
          .where("id", ownedGameIds[i].board_game_id)
      );
    }

    console.log("MEETING BOARDGAMES", boardGames);

    res.json(boardGames);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`We can hear you over on port ${PORT} 👂`);
});
