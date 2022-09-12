import { v4 as uuid } from "uuid";
import React, { useState } from "react";

import {
  Container,
  ToDoList,
  Input,
  Button,
  ListItem,
  Trash,
  Check,
  H3,
} from "./styles.js";

function App() {
  const [list, setList] = useState([]);
  const [inputTask, setInputTask] = useState("");

  function inputEvent(event) {
    setInputTask(event.target.value);
  }

  function buttonClick() {
    if (inputTask) {
      setList([...list, { id: uuid(), task: inputTask, finished: false }]);
    }
  }

  function finalizarTarefa(id) {
    const newList = list.map((item) =>
      item.id === id ? { ...item, finished: !item.finished } : item
    );

    setList(newList);
  }

  function deleteItem(id) {
    const newList = list.filter((item) => item.id !== id);

    setList(newList);
  }

  return (
    <Container>
      <ToDoList>
        <Input
          onChange={inputEvent}
          placeholder="O que eu tenho para fazer ..."
        />
        <Button onClick={buttonClick}>Adicionar</Button>

        <ul>
          {list.length > 0 ? (
            list.map((item) => (
              <ListItem isFinished={item.finished} key={item.id}>
                <Check onClick={() => finalizarTarefa(item.id)} />
                <li>{item.task}</li>
                <Trash onClick={() => deleteItem(item.id)} />
              </ListItem>
            ))
          ) : (
            <H3>Não há itens na lista</H3>
          )}
        </ul>
      </ToDoList>
    </Container>
  );
}

export default App;
