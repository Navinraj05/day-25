import React from "react";

export default function Todo({ todo, updateStatus, editTodo, deleteTodo }) {
    return (
        <div className='col-4'>
          <div className="card w-50" key={todo.id} style={{ border: '1px solid black', margin: '10px', padding: '10px' }}>
            <p><b>Name : </b>{todo.taskName}</p>
            <p><b>Description : </b>{todo.description}</p>
            <div className='mb-5'>
              <label for="status" className='me-1'><b>Status : </b></label>
            <select
              value={todo.status}
              name='status'
              onChange={(e) => updateStatus(todo.id, e.target.value)}
            >
              <option value="Completed" className='opt-complete'>Completed</option>
              <option value="Not Completed" className='opt-not'>Not Completed</option>
            </select>
            </div>
            <div class="d-grid gap-2 d-md-block ed-del-but">
                <button className="btn but-edit me-3" onClick={() => editTodo(todo.id)} type="button">Edit</button>
                <button className="btn butt" onClick={() => deleteTodo(todo.id)} type="button">Delete</button>
            </div>
          </div>
          </div>
         
    )
}