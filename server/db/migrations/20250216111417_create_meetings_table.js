/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("meetings", function (table) {
    table.increments("id").primary();
    table.string("title").notNullable();
    table.string("location").notNullable();
    table.date("date").notNullable();
    table.time("start_time").notNullable();
    table.time("finish_time").notNullable();
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("meetings");
};
