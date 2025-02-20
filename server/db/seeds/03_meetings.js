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
      date: "2025-02-24",
      start_time: "17:00:00",
      finish_time: "23:00:00",
    },
    {
      id: 101,
      title: "Shizuoka Board Game Club",
      location: "Shizuoka, Higashi-ku",
      date: "2025-03-02",
      start_time: "10:00:00",
      finish_time: "17:00:00",
    },
    {
      id: 102,
      title: "Shibuya Board Game Club",
      location: "Tokyo, Shibuya",
      date: "2025-02-28",
      start_time: "18:00:00",
      finish_time: "22:00:00",
    },
  ]);
};
