/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("meeting_board_game").del();
  await knex("meeting_board_game").insert([
    {
      meeting_id: 100,
      board_game_id: 102,
    },
    {
      meeting_id: 100,
      board_game_id: 101,
    },
    {
      meeting_id: 101,
      board_game_id: 100,
    },
    {
      meeting_id: 102,
      board_game_id: 100,
    },
    {
      meeting_id: 102,
      board_game_id: 102,
    },
  ]);
};
