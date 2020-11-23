import React, { useState } from "react";
import "./styles.css";

const TODOS = [
  {
    id: 1,
    name: "Write A TODO App",
    done: false
  },
  {
    id: 2,
    name: "Hang up lights",
    done: true
  }
];

export default function App() {
  const [todos, setTodos] = useState(TODOS);
  const [editTodo, setEditTodo] = useState(null);

  function handleItemMutated(todo) {
    setTodos([...todos.filter((item) => item.id !== todo.id), todo]);
    setEditTodo(null);
  }

  function handleNewTodo(todo) {
    setTodos([...todos, { ...todo, done: false, id: generateNewId(todos) }]);
  }

  function handleEditItem(todo) {
    setEditTodo(todo);
  }

  function handleModalClose() {
    setEditTodo(null);
  }

  function generateNewId(todos = []) {
    return todos.sort((a, b) => a.id > b.id)[todos.length - 1].id + 1;
  }

  return (
    <div className="App">
      <h1 className="app-header">A Todo App</h1>
      <ToDoList
        todos={todos}
        onItemChange={handleItemMutated}
        onEditItem={handleEditItem}
      />
      <h2>Add New</h2>
      <ToDoForm handleSubmit={handleNewTodo}></ToDoForm>
      {editTodo ? (
        <EditTodoModal todo={editTodo} onCloseClick={handleModalClose}>
          <ToDoForm todo={editTodo} handleSubmit={handleItemMutated}></ToDoForm>
        </EditTodoModal>
      ) : null}
    </div>
  );
}

function ToDoList({ todos, onItemChange, onEditItem }) {
  return (
    <div>
      <h2>Todo</h2>
      <ul className="todo-list">
        {todos
          .filter((item) => !item.done)
          .map((item, idx) => {
            return (
              <ToDoItem
                key={idx}
                {...item}
                onItemChange={onItemChange}
                onEditItem={onEditItem}
              />
            );
          })}
      </ul>
      <h2>Done</h2>
      <ul className={`todo-list todo-list--done`}>
        {todos
          .filter((item) => item.done)
          .map((item, idx) => {
            return (
              <ToDoItem
                key={idx}
                {...item}
                onItemChange={onItemChange}
                onEditItem={onEditItem}
              />
            );
          })}
      </ul>
    </div>
  );
}

function ToDoItem({ id, name, done, onItemChange, onEditItem }) {
  return (
    <li key={id} className="todo-item">
      <input
        type="checkbox"
        checked={done}
        onChange={() => onItemChange({ id, name, done: !done })}
      />
      <div className="todo-item-name">{name}</div>
      <button
        className="edit-button"
        onClick={() => onEditItem({ id, name, done })}
      >
        edit
      </button>
    </li>
  );
}

function ToDoForm({ todo, handleSubmit }) {
  const [formTodo, setFormTodo] = useState(
    !!todo ? todo : { name: "", done: false }
  );

  function handleFormFieldChange(event) {
    setFormTodo({ ...todo, name: event.target.value });
  }

  function submit(event) {
    handleSubmit(formTodo);
    setFormTodo({ name: "", done: false });
    event.preventDefault();
  }

  return (
    <form className="todo-form" onSubmit={submit}>
      <div className="form-input">
        <label htmlFor="name">Name: </label>
        <input
          name="name"
          value={formTodo.name}
          onChange={handleFormFieldChange}
          type="text"
        />
      </div>
      <input className="submit-form-button" type="submit" value="submit" />
    </form>
  );
}

function EditTodoModal({ onCloseClick, children }) {
  return (
    <>
      <div className="edit-todo-modal">
        <div className="modal-header">
          <h2>Edit Todo</h2>
          <i onClick={onCloseClick} className="close-icon">
            x
          </i>
        </div>
        <div className="modal-content">{children}</div>
      </div>
      <div className="modal-overlay"></div>
    </>
  );
}
