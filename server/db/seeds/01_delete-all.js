/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  //await knex("session").del();
  await knex("user_meeting").del();
  await knex("user_board_game").del();
  await knex("meeting_board_game").del();
  await knex("users").del();
  await knex("meetings").del();
  await knex("board_games").del();
};
