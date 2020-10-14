import mongoose from 'mongoose';

const ServerSchema = mongoose.Schema({
  /**
   * Имя сервера
   */
  name: {
    type: String,
    required: true,
  },
  /**
   * ID сервера,к которому принадлежит
   */
  workspaceId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Workspace',
  },
});

export default mongoose.model('Server', ServerSchema);
