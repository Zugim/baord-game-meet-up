/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("board_games").del();
  await knex("board_games").insert([
    {
      id: 100,
      name: "Lost Ruins of Arnak",
      primary_mechanic: "Resource Collection",
      theme: "Exploration",
      description:
        "Compete against fellow explorers to explore and research an uncharted island.",
    },
    {
      id: 101,
      name: "Nana",
      primary_mechanic: "Memory",
      theme: "Abstract",
      description: "Go fish with a twist. Can you be the first to get 7.",
    },
    {
      id: 102,
      name: "Harmonies",
      primary_mechanic: "Tile Placement",
      theme: "Animals",
      description:
        "Place habitat tiles in certain patterns to attract different animals to your landscape.",
    },
  ]);
};
