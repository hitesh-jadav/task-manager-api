import { db } from '../utils/db';
import { Task } from '../models/task.model';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// GET ALL TASKS with Pagination
export const getAllTasks = async (limit: number, offset: number): Promise<Task[]> => {
  const [rows] = await db.query<(Task & RowDataPacket)[]>(
    'SELECT * FROM tasks WHERE status != "deleted" LIMIT ? OFFSET ?',
    [limit, offset]
  );
  return rows;
};

// GET ONE TASK BY ID
export const getTaskById = async (id: number): Promise<Task | null> => {
  const [rows] = await db.query<(Task & RowDataPacket)[]>(
    'SELECT * FROM tasks WHERE id = ?',
    [id]
  );
  return rows.length ? rows[0] : null;
};

function toMySQLDateTime(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ');
}

// CREATE NEW TASK
export const createTask = async (task: Omit<Task, 'id'>): Promise<number> => {
  let { title, description, status="pending", completed_at } = task;

   if (status === 'completed') {
    completed_at = toMySQLDateTime(new Date());
  }

  const [result] = await db.query<ResultSetHeader>(
    'INSERT INTO tasks (title, description, status, completed_at) VALUES (?, ?, ?, ?)',
    [title, description, status, completed_at]
  );
  return result.insertId;
};



// UPDATE EXISTING TASK
export const updateTask = async (id: number, task: Partial<Task>): Promise<void> => {

  if (task.status === 'completed') {
    task.completed_at = toMySQLDateTime(new Date());
  }

   if (task.status && task.status !== 'completed') {
    task.completed_at = null;
  }
  
  const fields = Object.keys(task).map(key => `${key} = ?`).join(', ');
  const values = Object.values(task);
  await db.query(
    `UPDATE tasks SET ${fields} WHERE id = ?`,
    [...values, id]
  );
};

// SOFT DELETE TASK
export const softDeleteTask = async (id: number): Promise<void> => {
  await db.query(
    'UPDATE tasks SET status = "deleted" WHERE id = ?',
    [id]
  );
};
