/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_board_game", function (table) {
    table.integer("user_id").references("id").inTable("users").notNullable(); // Creates a foreign key
    table
      .integer("board_game_id")
      .references("id")
      .inTable("board_games")
      .notNullable(); // Creates a foreign key

    table.primary(["user_id", "board_game_id"]); // Creates a composite primary key
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_board_game");
};
