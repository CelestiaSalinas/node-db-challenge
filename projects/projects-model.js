const db = require("../data/db-config.js");

module.exports = {
    getProjects,
    getById,
    getTasks,
    getResources,
    addProject,
    addTask,
    addResources,
    remove
  };

function getProjects() {
  return db("projects");
}

function getById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function getTasks(project_id) {
  return db('tasks')
      .join('projects', 'projects.id', 'tasks.project_id')
      .select(
          'projects.name as projectName', 
          'projects.description as projectDescription', 
          'tasks.description as task',
          'tasks.notes as taskNotes',
          'tasks.completed as taskComplete'
      )
      .where({ project_id })
}

function getResources(id) {
  // return db("project_resources as pr")
  //   .join("resources as r", "pr.resource_id", "r.id")
  //   .select("pr.project_id", "r.id", "r.name", "r.description")
  //   .where( "pr.project_id", id );
return db("resources")
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

function addResources(resource, project_id) {
    return db("resources")
    .insert(resource)
    .then(ids => ({ resource }));

    // .then(ids => {
    //     const [id] = ids;
    //     return db("project_resources").insert(resource_id, project_id);
    // })
}

function remove(id) {
    return db("resources")
    .where("id", id)
    .del()
}