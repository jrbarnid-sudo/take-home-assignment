import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import style from 'styled-components';
import { selectTodos, getAllAsync } from './todoSlice';
import { store } from '../../app/store';

export function TodoTable(props: any) {
  const dispatch = useDispatch();

  const { todos } = store.getState().todo;

  useEffect(() => {
    dispatch(getAllAsync());
  }, [props]);

  return (
    <div>
      {todos.map((todo, idx) => {
        return (
          <span key={`todo-${idx}`}>
            {todo.title}, {todo.status}, {todo.createdAt}, {todo.lastUpdatedAt}
          </span>
        );
      })}
    </div>
  );
}
