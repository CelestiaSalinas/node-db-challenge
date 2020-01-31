exports.seed = function(knex) {
    return knex("resources")
      .del()
      .then(function() {
        // Inserts seed entries
        return knex("resources").insert([
            { name: "wood", description: "a good piece of wood" }, //1
            { name: "nail", description: "a tough nail" }, //2
            { name: "chicken", description: "raw chicken" }, //3
            { name: "pasta", description: "uncooked pasta" }, //4
            { name: "pillow", description: "soft" }, //5
            { name: "blanket", description: "softer" }, //6
            { name: "money", description: "cold and green" }, //7
            { name: "you", description: "you" } //8
        ]);
    });
};