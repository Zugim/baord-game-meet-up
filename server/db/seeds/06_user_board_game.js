/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_board_game").del();
  await knex("user_board_game").insert([
    {
      user_id: 100,
      board_game_id: 100,
    },
    {
      user_id: 100,
      board_game_id: 102,
    },
    {
      user_id: 101,
      board_game_id: 102,
    },
    {
      user_id: 102,
      board_game_id: 100,
    },
    {
      user_id: 102,
      board_game_id: 101,
    },
    {
      user_id: 102,
      board_game_id: 102,
    },
  ]);
};
