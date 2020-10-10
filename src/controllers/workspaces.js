import Workspace from '../models/workspace';
import Project from '../models/project';
import Server from '../models/server';

export default class WorkspacesController {
  static async getAll(req, res) {
    try {
      const workspaces = await Workspace.find().select('_id name ');
      res.json({
        count: workspaces.length,
        workspaces: workspaces.map((workspace) => ({
          ...workspace.toObject(),
        })),
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }

  static async create(req, res) {
    const workspace = new Workspace({
      name: req.body.name,
    });
    try {
      const new_workspace = await workspace.save();
      res.json({
        message: 'Workspace was created successfuly',
        created_workspace: new_workspace,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: 'No workspace created',
      });
    }
  }

  static async get(req, res) {
    const id = req.params.workspaceId;
    try {
      const workspace = await Workspace.findById(id).select('_id name');
      if (workspace) {
        res.json({
          workspace,
        });
      } else {
        res.json({ message: 'No such workspace' });
      }
    } catch (error) {
      res.status(404).json({ error });
    }
  }

  static async delete(req, res) {
    const id = req.params.workspaceId;
    try {
      await Workspace.deleteOne({ _id: id });
      const serversId = await Server.find({ workspaceId: id });
      await Project.deleteMany({ serverId: serversId.map() });
      await Server.deleteMany({ workspaceId: id });
      res.json({
        message: 'Workspace deleted',
      });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
