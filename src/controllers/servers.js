import Server from '../models/server';
import Project from '../models/project';

/**
 * Класс ServersController.
 */
export default class ServersController {
  /**
   * Возвращает все серверы
   */
  static async getAll(req, res) {
    try {
      const servers = await Server.find().select('_id name workspaceId');
      res.json({
        count: servers.length,
        servers: servers.map((server) => ({
          ...server.toObject(),
        })),
      });
    } catch (error) {
      return res.status(400).json(error);
    }
  }

  /**
   * Создает новый сервер
   */
  static async create(req, res) {
    const server = new Server({
      name: req.body.name,
      workspaceId: req.body.workspaceId,
    });
    try {
      const new_server = await server.save();
      res.json({
        message: 'Server was created successfuly',
        created_server: new_server,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'No server created',
      });
    }
  }

  /**
   * Возвращает один сервер
   */
  static async get(req, res) {
    const id = req.params.serverId;
    try {
      const server = await Server.findById(id).select('_id name serverId');
      if (server) {
        res.json({
          server,
        });
      } else {
        res.json({ message: 'No such server' });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  /**
   * Удаляет сервер
   */
  static async delete(req, res) {
    const id = req.params.serverId;
    try {
      await Project.deleteMany({ serverId: id });
      await Server.deleteOne({ _id: id });
      res.json({
        message: 'Server deleted',
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
