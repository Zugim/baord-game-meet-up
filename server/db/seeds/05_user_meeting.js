/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("user_meeting").del();
  await knex("user_meeting").insert([
    {
      user_id: 100,
      meeting_id: 100,
    },
    {
      user_id: 101,
      meeting_id: 100,
    },
    {
      user_id: 101,
      meeting_id: 101,
    },
    {
      user_id: 101,
      meeting_id: 102,
    },
    {
      user_id: 102,
      meeting_id: 101,
    },
    {
      user_id: 102,
      meeting_id: 102,
    },
  ]);
};
