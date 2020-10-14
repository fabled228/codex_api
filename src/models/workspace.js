import mongoose from 'mongoose';

const WorkspaceSchema = mongoose.Schema({
  /**
   * Имя воркспейса
   */
  name: {
    type: String, required: true,
  },
});

export default mongoose.model('Workspace', WorkspaceSchema);
