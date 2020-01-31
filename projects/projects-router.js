const express = require('express');

const Projects = require('./projects-model');

const router = express.Router();

router.get("/", (req, res) => {
    Projects.getProjects()
    .then(projects => {
        res.status(200).json(projects);
    })
    .catch(error => {
        res.status(500).json({ errorMessage: "Could not retrieve projects" })
    })
})

router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;

    Projects.getTasks(id)
    .then(tasks => {
        if (tasks) {
            res.status(200).json(tasks);
        } else {
            res.status(404).json({errorMessage: "No tasks found"})
        }
    })
    .catch (error => {
        res.status(500).json({errorMessage: "Encountered error while retrieving tasks"})
    })
})

router.get("/:id/resources", (req, res) => {
    const { id } = req.params;
  
    Projects.getResources(id)
      .then(resources => {
        if (resources) {
          res.status(200).json(resources);
        } else {
          res.status(404).json({ message: "Could not find resources" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "Error encountered while getting resources" });
      });
  });

router.post('/', (req, res) => {
    const data = req.body;
    Projects.addProject(data)
    .then(project => {
        res.status(201).json(project);
    })
    .catch(error => {
        res.status(500).json({errorMessage: "Encountered error while adding project"})
    })
})

router.post('/:id/tasks', (req, res) => {
    const data = req.body;
    Projects.addTask(data)
    .then(task => {
        res.status(201).json(task);
    })
    .catch(error => {
        res.status(500).json({errorMessage: "Encountered error while adding task"})
    })
})

router.post('/:id/resources', (req, res) => {
    const data = req.body;
    Projects.addResources(data)
    .then(resource => {
        res.status(201).json(resource);
    })
    .catch(error => {
        res.status(500).json({errorMessage: "Encountered error while adding resource"})
    })
})

router.delete('/:id/resources/:id', (req, res) => {
    const {id} = req.params;
    Projects.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res.status(404).json({ message: 'Could not find scheme with given id' });
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Failed to delete scheme' });
    });
  });

module.exports = router;