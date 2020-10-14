import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema({
  /**
   * Имя проекта
   */
  name: {
    type: String,
    required: true,
  },
  /**
   * ID сервера,к которому принадлежит
   */
  serverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Server',
  },
  /**
   * Статус проекта
   */
  status: {
    type: Number,
  },
});

export default mongoose.model('Project', ProjectSchema);
