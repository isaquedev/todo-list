import { useState } from "react";

import "./App.scss"

function App() {

  let list = [
    { name: "Comprar pão", checked: false, created: new Date() },
    { name: "Comprar leite", checked: true, created: new Date() }
  ]

  const [text, setText] = useState("")
  const [todos, setTodos] = useState(list)

  function handleSubmitForm(event) {
    event.preventDefault()
    if (text.length > 0) {
      addTodo(text)
      setText("")
    }
  }

  function handleChangeText(event) {
    setText(event.target.value)
  }

  function addTodo(text) {
    todos.push({
      name: text,
      checked: false,
      created: new Date()
    })

    updateTodos(todos)
  }

  function handleToggleChecked(item) {
    const itemIndex = todos.indexOf(item)

    item.checked = !item.checked
    todos[itemIndex] = item
    
    updateTodos(todos)
  }

  function updateTodos(todos) {
    const checkedTodos = todos.filter(todo => todo.checked)
    const uncheckedTodos = todos.filter(todo => !todo.checked)

   setTodos([...uncheckedTodos, ...checkedTodos])
  }

  return (
    <div className="container">
      <div className="content">
        <div className="todoHeader">
          <h1 className="todoTitle">Lista de tarefas</h1>
          <button className="todoButton">Limpar</button>
        </div>
        <form onSubmit={handleSubmitForm} className="todoForm">
          <input 
            placeholder="Digite sua tarefa..."
            onChange={handleChangeText}
            value={text}
            className="todoFormInput"
          />
          <button className="todoFormButton">
            +
          </button>
        </form>
        <div className="todoList">
          {
            todos.map(item => {
              return (
                <div 
                  key={item}
                  onClick={() => handleToggleChecked(item)}
                  className={`todoItem ${item.checked ? "todoItemCompleted" : "todoItemDefault"}`}
                >
                  <p className="todoItemText">{item.name}</p>
                  <p className="todoItemDate">{new Intl.DateTimeFormat().format(item.created)}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
