const bcrypt = require("bcryptjs");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    {
      id: 100,
      username: "Joe",
      password: bcrypt.hashSync("joepass", 10),
      city: "Hamamatsu",
      languages: "English, Japanese",
    },
    {
      id: 101,
      username: "Stu",
      password: bcrypt.hashSync("stupass", 10),
      city: "Peterborough",
      languages: "English",
    },
    {
      id: 102,
      username: "Aya",
      password: bcrypt.hashSync("ayapass", 10),
      city: "Hamamatsu",
      languages: "Japanese, English",
    },
  ]);
};
