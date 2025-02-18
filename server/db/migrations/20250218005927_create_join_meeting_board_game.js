/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("meeting_board_game", function (table) {
    table
      .integer("meeting_id")
      .references("id")
      .inTable("meetings")
      .notNullable(); // Creates a foreign key
    table
      .integer("board_game_id")
      .references("id")
      .inTable("board_games")
      .notNullable(); // Creates a foreign key

    table.primary(["meeting_id", "board_game_id"]); // Creates a composite primary key
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("meeting_board_game");
};
