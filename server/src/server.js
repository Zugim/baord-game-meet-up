const express = require("express");
const app = express();
app.set("trust proxy", 1); // to get cookies to work with react
const knex = require("./knex");
const cors = require("cors");
const path = require("path");
const auth = require("./routes/auth");

// check if in development or production
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

// get all users
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

// get all meetings
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

// get a meeting by id
app.get("/api/meeting/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const [meeting] = await knex
      .select("id", "title", "location")
      .where("id", id)
      .from("meetings");

    res.json(meeting);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// add a meeting
app.post("/api/user/:id/meeting/add", async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const meetingId = await knex("meetings").returning("id").insert({
      title: req.body.title,
      location: req.body.location,
    });

    await knex("user_meeting").insert({
      user_id: userId,
      meeting_id: meetingId[0].id,
    });

    res.json({ userId: userId, meetingId: meetingId[0].id });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// get all members of a meeting
app.get("/api/meeting/:id/user", async (req, res) => {
  try {
    const memberIds = await knex
      .select("user_id")
      .from("user_meeting")
      .where("meeting_id", req.params.id);

    const members = [];

    for (let i = 0; i < memberIds.length; i++) {
      const [tmpMember] = await knex
        .select("id", "username", "city")
        .from("users")
        .where("id", memberIds[i].user_id);

      members.push(tmpMember);
    }

    res.json(members);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// get a meetings library
app.get("/api/meeting/:id/board_game", async (req, res) => {
  try {
    const boardGameIds = await knex
      .select("board_game_id")
      .from("meeting_board_game")
      .where("meeting_id", req.params.id);

    const board_games = [];

    for (let i = 0; i < boardGameIds.length; i++) {
      const [tmpBG] = await knex
        .select("*")
        .from("board_games")
        .where("id", boardGameIds[i].board_game_id);

      board_games.push(tmpBG);
    }

    res.json(board_games);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

//gets all board games
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

// get a users board game collection
app.get("/api/user/:id/board_game", async (req, res) => {
  try {
    const ownedGameIds = await knex
      .select("board_game_id")
      .from("user_board_game")
      .where("user_id", req.params.id);

    const boardGames = [];

    for (let i = 0; i < ownedGameIds.length; i++) {
      const [tmpBG] = await knex
        .select("*")
        .from("board_games")
        .where("id", ownedGameIds[i].board_game_id);

      boardGames.push(tmpBG);
    }

    res.json(boardGames);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// add a game to a users board game collection
app.post("/api/user/:id/board_game/add", async (req, res) => {
  try {
    const userId = Number(req.params.id);

    const boardGameId = await knex("board_games").returning("id").insert({
      name: req.body.name,
      primary_mechanic: req.body.primary_mechanic,
      theme: req.body.theme,
      description: req.body.description,
    });

    await knex("user_board_game").insert({
      user_id: userId,
      board_game_id: boardGameId[0].id,
    });

    res.json({ userId: userId, boardGameId: boardGameId[0].id });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// get a meetings board game library
app.get("/api/meeting/:id/board_game", async (req, res) => {
  try {
    const ownedGameIds = await knex
      .select("board_game_id")
      .from("meeting_board_game")
      .where("meeting_id", req.params.id);

    const boardGames = [];

    for (let i = 0; i < ownedGameIds.length; i++) {
      boardGames.push(
        await knex
          .select("*")
          .from("board_games")
          .where("id", ownedGameIds[i].board_game_id)
      );
    }

    res.json(boardGames);
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// add a game to a meetings board game library <------ TODO
app.post("/api/meeting/:id/board_game/add", async (req, res) => {
  try {
    const meetingId = Number(req.params.id);

    // TODO make it so can only add games from own collection
    const boardGameId = await knex("board_games").returning("id").insert({
      name: req.body.name,
      primary_mechanic: req.body.primary_mechanic,
      theme: req.body.theme,
      description: req.body.description,
    });

    await knex("meeting_board_game").insert({
      meeting_id: meetingId,
      board_game_id: boardGameId[0].id,
    });

    res.json({ meetingId: meetingId, boardGameId: boardGameId[0].id });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

// add member to meeting
app.post("/api/meeting/:meetingId/user/:userId/add", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const meetingId = Number(req.params.meetingId);

    await knex("user_meeting").insert({
      user_id: userId,
      meeting_id: meetingId,
    });

    res.json({ userId: userId, meetingId: meetingId });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`We can hear you over on port ${PORT} 👂`);
});
