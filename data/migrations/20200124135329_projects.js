
exports.up = function(knex) {
    return knex.schema
    .createTable("projects", tbl => {
        tbl.increments();
        tbl.string("name", 255).notNullable();
        tbl.string("description", 255).notNullable();
        tbl.boolean("completed").defaultTo(false);
    })
    .createTable("resources", tbl => {
        tbl.increments();
        tbl.string("name", 255).notNullable();
        tbl.string("description", 255).notNullable();
    })
    .createTable("tasks", tbl => {
        tbl.increments();
        tbl.string("description", 255).notNullable();
        tbl.string("notes", 500);
        tbl.boolean("completed").defaultTo(false);
        tbl
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("id")
          .inTable("projects")
          .onDelete("CASCADE")
          .onUpdate("CASCADE");
    })
    .createTable("project_resources", tbl => {
        tbl.increments();
        tbl.integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
        tbl.integer("resource_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
  };
  
  exports.down = function(knex) {
      return knex.schema
  };
  