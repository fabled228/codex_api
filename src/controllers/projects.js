import Project from '../models/project';

export default class ProjectsController {
  static async getAll(req, res) {
    try {
      const projects = await Project.find().select('_id name serverId');
      res.json({
        count: projects.length,
        projects: projects.map((project) => ({
          ...project.toObject(),
        })),
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  static async create(req, res) {
    const project = new Project({
      name: req.body.name,
      serverId: req.body.serverId,
    });
    try {
      const new_project = await project.save();
      res.json({
        message: 'Project was created successfuly',
        created_project: new_project,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: 'No project created',
      });
    }
  }

  static async get(req, res) {
    const id = req.params.projectId;
    try {
      const project = await Project.findById(id).select('_id name serverId');
      if (project) {
        res.json({
          project,
        });
      } else {
        res.json({ message: 'No such project' });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  static async delete(req, res) {
    const id = req.params.projectId;
    try {
      await Project.deleteOne({ _id: id });
      res.json({
        message: 'Project deleted',
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
