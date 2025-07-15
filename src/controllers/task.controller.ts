import { Request, Response } from 'express';
import * as TaskService from '../services/task.service';

export const getAll = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit) || 10;
  const offset = Number(req.query.offset) || 0;
  const tasks = await TaskService.getAllTasks(limit, offset);
  res.json(tasks);
};

export const getOne = async (req: Request, res: Response) => {
  const task = await TaskService.getTaskById(Number(req.params.id));
  task ? res.json(task) : res.status(404).json({ error: 'Task not found' });
};

export const create = async (req: Request, res: Response) => {
  const task = req.body;
  await TaskService.createTask(task);
  res.status(201).json({ message: 'Task created' });
};

export const update = async (req: Request, res: Response) => {
  await TaskService.updateTask(Number(req.params.id), req.body);
  res.json({ message: 'Task updated' });
};

export const remove = async (req: Request, res: Response) => {
  await TaskService.softDeleteTask(Number(req.params.id));
  res.json({ message: 'Task deleted' });
};
