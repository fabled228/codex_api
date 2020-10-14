import ping from 'ping';
import Project from '../models/project';
import Server from '../models/server';

/**
 * Класс PingController.
 */
export default class PingController {
  static async ping(req, res) {
    const id = req.params.serverId;

    const server = await Server.findById(id);
    const projects = await Project.find({ serverId: id });

    const updatedProjects = [];

    for (const project of projects) {
      const host = project.name;

      const result = await ping.promise.probe(host);
      console.log(result);
      const status = result.alive ? 200 : 500;

      const updatedProject = await Project.update({ name: project.name }, status);

      updatedProjects.push(updatedProject);
    }

    res.json({
      message: 'Pinged!',
      serverInfo: server,
      projects: updatedProjects,
    });
  }
}
