import React, { useState, useEffect, useRef } from 'react';
import { TodoForm } from './TodoForm';
import { v4 as uuidv4 } from 'uuid';
import { Todo } from './Todo';
import { EditTodoForm } from './EditTodoForm';

export const TodoWrapperLocalStorage = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortType, setSortType] = useState("default");
  const isInitialMount = useRef(true);

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = todo => {
    if (todos.some(t => t.task.toLowerCase().trim() === todo.toLowerCase().trim())) {
      alert("Task already exists!");
      return;
    }
    const newTodos = [...todos, { id: uuidv4(), task: todo, completed: false, isEditing: false }];
    setTodos(newTodos);
  };

  const toggleComplete = id => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(newTodos);
  };

  const deleteTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  const editTodo = id => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
    ));
  };

  const editTask = (task, id) => {
    if (!task.trim()) return;
    const trimmedTask = task.trim();
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, task: trimmedTask, isEditing: false } : todo
    );
    setTodos(newTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "completed") return todo.completed;
    if (filter === "incomplete") return !todo.completed;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    if (sortType === "az") return a.task.localeCompare(b.task);
    if (sortType === "za") return b.task.localeCompare(a.task);
    return 0;
  });

  return (
    <div className='TodoWrapper'>
      <h1>Todo Craft !</h1>

      <div className="filter-options">
        <strong>Filter:</strong>
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
        <button onClick={() => setFilter("incomplete")}>Incomplete</button>
      </div>

      <div className="sort-options">
        <strong>Sort:</strong>
        <button onClick={() => setSortType("default")}>Default</button>
        <button onClick={() => setSortType("az")}>A–Z</button>
        <button onClick={() => setSortType("za")}>Z–A</button>
      </div>

      <TodoForm addTodo={addTodo} />

      {sortedTodos.map((todo) =>
        todo.isEditing ? (
          <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
        ) : (
          <Todo
            key={todo.id}
            task={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        )
      )}
    </div>
  );
};
