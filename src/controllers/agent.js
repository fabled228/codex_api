import Project from '../models/project';
import Server from '../models/server';

/**
 * Класс AgentController.
 */
export default class AgentController {
  /**
   * Проверяет наличие проекта, затем, при отсутствии, создает новый
   */
  static async checkProject(req, res) {
    try {
      const server = await Server.findOne({ name: req.body.serverName });
      if (!server) {
        return res.status(404).json({
          message: 'Server not found',
        });
      }
      // name: req.body.name,
      // serverId: req.body.serverId,
      // const projects = await Project.find({ serverId: server._id });
      for (const proj of req.body.projects) {
        const project = await Project.findOne({ name: proj, serverId: server._id });
        if (!project) {
          const newProject = new Project({
            name: proj,
            serverId: server._id,
          });
          await newProject.save();
        }
      }
      res.json({
        message: 'OKAY',
      });
    } catch (error) {
      return res.status(400).json({
        message: 'NOT OKAY',
      });
    }
  }
}
