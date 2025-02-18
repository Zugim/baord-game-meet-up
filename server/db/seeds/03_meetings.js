/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("meetings").del();
  await knex("meetings").insert([
    {
      id: 100,
      title: "Hamamatsu Board Game Meet",
      location: "Hamamatsu, Naka-ku",
    },
    {
      id: 101,
      title: "Shizuoka Board Game Club",
      location: "Shizuoka, Higashi-ku",
    },
    {
      id: 102,
      title: "Shibuya Board Game Club",
      location: "Tokyo, Shibuya",
    },
  ]);
};
