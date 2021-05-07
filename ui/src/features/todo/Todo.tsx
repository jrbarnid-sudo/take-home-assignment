import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAsync, TodoStatusEnum, getAllAsync } from './todoSlice';
import styled from 'styled-components';
import { store } from '../../app/store';

const RowDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
`;

const RowLabel = styled.label`
  flex: 0 0 20%;
  padding-right: 0.5rem;
  max-width: 20%;
`;

const RowInput = styled.input`
  flex: 0 0 75%;
  max-width: 75%;
`;

const Button = styled.button`
  font-family: News Cycle, Arial Narrow Bold, sans-serif;
  font-weight: 700;
  color: #fff;
  background-color: #eb6864;
  border-color: #eb6864;
  cursor: pointer;
`;

export default () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState(TodoStatusEnum.Inactive);

  console.log(store.getState());

  const _options = () => {
    const options = [];

    for (const value in TodoStatusEnum) {
      options.push(
        <option key={value} value={value}>
          {value}
        </option>,
      );
    }

    return options;
  };

  return (
    <form
      onSubmit={() =>
        dispatch(addAsync({ title, status, lastUpdatedAt: 0, createdAt: 0 }))
      }
    >
      <RowDiv>
        <RowLabel htmlFor='title'>Title</RowLabel>
        <RowInput
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </RowDiv>
      <RowDiv>
        <RowLabel htmlFor='status'>Status</RowLabel>
        <select
          id='status'
          value={status}
          onChange={(e) => {
            switch (e.target.value) {
              case TodoStatusEnum.Active:
                setStatus(TodoStatusEnum.Active);
                break;
              case TodoStatusEnum.Inactive:
                setStatus(TodoStatusEnum.Inactive);
                break;
              case TodoStatusEnum.Archived:
                setStatus(TodoStatusEnum.Archived);
                break;
              default:
                setStatus(TodoStatusEnum.Inactive);
            }
          }}
        >
          {_options().map((o) => o)}
        </select>
      </RowDiv>
      <RowDiv>
        <Button type='submit'>Add</Button>
      </RowDiv>
    </form>
  );
};
