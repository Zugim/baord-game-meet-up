/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("user_meeting", function (table) {
    table.integer("user_id").references("id").inTable("users").notNullable(); // Creates a foreign key
    table
      .integer("meeting_id")
      .references("id")
      .inTable("meetings")
      .notNullable(); // Creates a foreign key

    table.primary(["user_id", "meeting_id"]); // Creates a composite primary key
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("user_meeting");
};
