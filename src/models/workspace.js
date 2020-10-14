import mongoose from 'mongoose';

const WorkspaceSchema = mongoose.Schema({
  /**
   * Поле схемы воркспейса: имя
   */
  name: {
    type: String, required: true,
  },
});

export default mongoose.model('Workspace', WorkspaceSchema);
