import { useEffect, useState } from "react";

import "./App.scss"

function App() {

  const [text, setText] = useState("")
  const [todos, setTodos] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const databaseTodos = localStorage.getItem("todos")
    if (databaseTodos) {
      const todos = JSON.parse(databaseTodos)

      const formattedTodos = todos.map(todo => {
        return {
          name: todo.name,
          checked: todo.checked,
          created: new Date(todo.created)
        }
      })
      
      setTodos(formattedTodos)
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("todos", JSON.stringify(todos))
    }
  }, [todos])

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

    const newTodos = [...uncheckedTodos, ...checkedTodos]

    setTodos(newTodos)
  }

  function cleanTodos() {
    setTodos([])
  }

  return (
    <div className="container">
      <div className="content">
        <div className="todoHeader">
          <h1 className="todoTitle">Lista de tarefas</h1>
          <button 
            className="todoButton"
            onClick={cleanTodos}
          >
            Limpar
          </button>
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
