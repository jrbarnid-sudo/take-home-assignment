import React from 'react';
import Todo from './features/todo/Todo';
import style from 'styled-components';
import TodoTableContainer from './features/todo/TodoTableContainer';

const HeaderDiv = style.div`
  padding-top: 4em;
`;

const CenterH1 = style.h1`
  text-align: center;
`;

function App() {
  return (
    <HeaderDiv>
      <header>
        <CenterH1>Todo App</CenterH1>
        <Todo />
        <TodoTableContainer />
      </header>
    </HeaderDiv>
  );
}

export default App;
