const db = require("../data/db-config.js");

module.exports = {
    getProjects,
    getById,
    getTasks,
    getResources,
    addProject,
    addTask,
    addResources
  };

function getProjects() {
  return db("projects");
}

function getById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function getTasks(id) {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .select("t.id", "t.description", "t.completed")
    .where({ project_id: id });
}

function getResources(id) {
  return db("project_resources as pr")
    .join("resources as r", "pr.resource_id", "r.id")
    .select("pr.project_id", "r.id", "r.name", "r.description")
    .where( "pr.project_id", id );
}

function addProject(project) {
    return db('projects')
    .insert(project, "id")
    .then(ids => {
        const [id] = ids;
        return getById(id);
    })
}

function addTask(task) {
    return db("tasks")
    .insert(task)
    .then(ids => {
        const [id] = ids;
        return getTasks(id);
    })
}

function addResources(resource) {
    return db("resources")
    .insert(resource)
    .then(ids => {
        const [id] = ids;
        return getResources(id);
    })
}