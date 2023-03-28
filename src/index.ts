import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import { connectDB } from './db/mongoose';
import dotenv from 'dotenv';
import Task from './models/Task';
import { MongoError } from 'mongodb';

dotenv.config();

const app = express();
app.use(cors({
  origin: ['http://localhost:3000', 'https://mern-task-app.onrender.com'],
}));
app.use(json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching tasks');
  }
});

app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ id: req.params.id });
    if (!task) {
      res.status(404).send('Task not found');
    } else {
      res.json(task);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching task');
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate({ id: req.params.id }, req.body, { new: true });
    if (!task) {
      res.status(404).send('Task not found');
    } else {
      res.json(task);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating task');
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ id: req.params.id });
    if (!deletedTask) {
      res.status(404).send('Task not found');
    } else {
      res.json({ message: 'Task deleted successfully', data: deletedTask });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting task');
  }
});


app.post('/api/tasks', (req, res) => {
  // Get the task data from the request body
  const { id, title, completed } = req.body;

  // Create a new task using the data
  const task = new Task({ id, title, completed });

  // Save the task to the database
   task.save()
   .then((savedTask) => {
     console.log('Task saved:', savedTask);
     res.json({ data: savedTask }); // Wrap the saved task in an object with a 'data' key
   })
   .catch((error) => {
     console.error('Error saving task:', error);
     res.status(500).json({ error: 'Failed to save task' });
   });
  
});



connectDB()
  .then(() => {
    console.log('Connected to MongoDB');

    // Start the server
    const port = process.env.PORT || 3001;
    console.log(process.env.PORT)
    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
