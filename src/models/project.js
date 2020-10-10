import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  serverId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Server',
  },
});

export default mongoose.model('Project', ProjectSchema);
