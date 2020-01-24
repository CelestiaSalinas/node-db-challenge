exports.seed = function(knex) {
    return knex("tasks")
      .del()
      .then(function() {
        // Inserts seed entries
        return knex("tasks").insert([
            { description: "build foundation", notes: "buy more nails", completed: false, project_id: 1 },
            { description: "erect walls", notes: "ran out of wood", completed: false, project_id: 1 },
            { description: "roof", notes: "carefully", completed: false, project_id: 1 },
            { description: "buy ingredients", notes: "sale at Generic Store", completed: false, project_id: 2 },
            { description: "cook meal", notes: "yum", completed: false, project_id: 2 },
            { description: "get comfy", notes: "so tired", completed: false, project_id: 3 },
            { description: "sleep, you filthy heathen", notes: "no", completed: false, project_id: 3 },
        ]);
    });
};