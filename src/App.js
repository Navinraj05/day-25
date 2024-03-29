
import './App.css';
import Todo from './Pages/Todo';
import React, {useState, useEffect} from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState('Not Completed');
  const [description, setDescription] = useState('');
  const [filter, setFilter] = useState('All');
  const [editMode, setEditMode] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (editMode) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === editTodoId) {
          return { ...todo, taskName, description, status };
        }
        return todo;
      });
      setTodos(updatedTodos);
      setEditMode(false);
      setEditTodoId(null);
    } else {
      const newTodo = {
        id: todos.length + 1,
        taskName,
        description,
        status: 'Not Completed',
      };
      setTodos([...todos, newTodo]);
    }
    setTaskName('');
    setDescription('');
    setStatus('Not Completed');
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const updateStatus = (id, newStatus) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: newStatus };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setTaskName(todoToEdit.taskName);
      setDescription(todoToEdit.description);
      setStatus(todoToEdit.status);
      setEditMode(true);
      setEditTodoId(id);
    }
  };

  const filterTodos = () => {
    switch (filter) {
      case 'Completed':
        return todos.filter((todo) => todo.status === 'Completed');
      case 'Not Completed':
        return todos.filter((todo) => todo.status === 'Not Completed');
      default:
        return todos;
    }
  };

  return (
    <div className='App'>
      <h1 className='py-5'>To-Do</h1>
      <form>
      <div className='me-3 my-3'>
      <input
      className='me-3 nam'
        type="text"
        placeholder="Todo Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        required
      />
      <input
      className='ms-5 me-3 des'
      width={60}
        type="text"
        placeholder="Todo Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={addTodo} className='btn ad'>{editMode ? 'Update Todo' : 'Add Todo'}</button>
      </div>
      </form>
      <div className='mytodos'>
      <div>
      <h3 className='py-3'><b>My To-Do's</b></h3>
      </div>
        
        <div>
          <label for="filter" className='me-1'><h5><b>Status Filter : </b></h5></label>
        <select value={filter} className='all' name='filter' onChange={(e) => setFilter(e.target.value)}>
          <option value="All" className='all'>All</option>
          <option value="Completed" className='complete'>Completed</option>
          <option value="Not Completed" className='incomplete'>Not Completed</option>
        </select>
        </div>
      </div>
      
       
        <div>
        <div className='container'>
        <div className='row'>
        {filterTodos().map((todo) => (
         
         <div className='col-4' key={todo.id}>
                <Todo
                  todo={todo}
                  updateStatus={updateStatus}
                  editTodo={editTodo}
                  deleteTodo={deleteTodo}
                />
              </div>
        ))}
      </div>
    </div>
    </div>
    </div>
  );
};

export default App;