import mongoose, { Document } from 'mongoose';

export interface ITask extends Document {
  id: number;
  title: string;
  completed: boolean;
}

const TaskSchema = new mongoose.Schema({
  id: {
      type: Number,
      required: true,
  },
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
    default: false,
  },
});

export default mongoose.model<ITask>('Task', TaskSchema);
