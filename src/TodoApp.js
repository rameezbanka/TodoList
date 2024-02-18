import React, { useState, useEffect } from 'react';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
   
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim() !== '') {
      const updatedTasks = [{ title: newTask, completed: false }, ...tasks];
      setTasks(updatedTasks);
      setNewTask('');
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const filterTasks = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed;
  });

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <div>
        <button onClick={() => filterTasks('all')}>All</button>
        <button onClick={() => filterTasks('completed')}>Completed</button>
        <button onClick={() => filterTasks('incomplete')}>Incomplete</button>
      </div>
      <ul>
        {filteredTasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(index)}
            />
            {task.title}
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
