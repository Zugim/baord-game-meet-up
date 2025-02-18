/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("board_games", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("primary_mechanic").notNullable();
    table.string("theme");
    table.string("description");
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("board_games");
};
