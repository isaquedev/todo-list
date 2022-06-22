import { useState } from "react";

import "./App.scss"

function App() {

  let list = ["Comprar pão", "Botar água pro gato", "Jogar fora o lixo"]

  const [text, setText] = useState("")
  const [todos, setTodos] = useState(list)

  function handleSubmitForm(event) {
    event.preventDefault()
    addTodo(text)
    setText("")
  }

  function handleChangeText(event) {
    setText(event.target.value)
  }

  function addTodo(text) {
    todos.push(text)
    setTodos([...todos])
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
        <div>
          {
            todos.map(item => {
              return (
                <p 
                  key={item}
                  className="todoItem"
                >
                  {item}
                </p>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
