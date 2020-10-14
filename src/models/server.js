import mongoose from 'mongoose';

const ServerSchema = mongoose.Schema({
  /**
   * Поля схемы сервера: имя и ID воркспейса,к которому он принадлежит
   */
  name: {
    type: String,
    required: true,
  },
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Workspace',
  },
});

export default mongoose.model('Server', ServerSchema);
