exports.seed = function(knex) {
    return knex("projects")
      .del()
      .then(function() {
        // Inserts seed entries
        return knex("projects").insert([
            { name: "build structure", description: "build", completed: false },
            { name: "make dinner", description: "make meal for family", completed: false },
            { name: "sleep", description: "rest well", completed: false }
        ]);
    });
};