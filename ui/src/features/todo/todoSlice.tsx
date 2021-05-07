import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../app/store';
import { get, post } from '../../clients/ApiClient';
import { useDispatch } from 'react-redux';

export interface Todo {
  title: string;
  status: TodoStatusEnum;
  lastUpdatedAt: number;
  createdAt: number;
}

export enum TodoStatusEnum {
  Active = 'Active', // the todo has is not completed
  Inactive = 'Inactive', // the todo is completed
  Archived = 'Archived', // the todo is archived (bonus)
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const getAllTodoAsync = createAsyncThunk('todo/get', async () => {
  const response = await get(`/getAll`);

  return response;
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      const newTodo: Todo = {
        title: action.payload.title,
        status: action.payload.status,
        lastUpdatedAt: action.payload.lastUpdatedAt,
        createdAt: action.payload.createdAt,
      };
      return {
        ...state,
        todos: state.todos.concat(newTodo),
      };
    },
    remove: (state, action: PayloadAction<Todo>) => {
      const updatedTodos: Todo[] = state.todos.filter(
        (todo) => todo.title !== action.payload.title,
      );
      return {
        ...state,
        todos: updatedTodos,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllTodoAsync.fulfilled, (state, action) => {
      state.todos = action.payload;
    });
  },
});

export const { add, remove } = todoSlice.actions;

const addByTodoAsync = createAsyncThunk('todo/create', async (todo: object) => {
  await post(`/create`, todo);

  const dispatch = useDispatch();

  dispatch(getAllAsync());
});

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const addAsync = (todo: Todo): AppThunk => (dispatch) => {
  dispatch(addByTodoAsync(todo));
};

export const getAllAsync = (): AppThunk => (dispatch) => {
  dispatch(getAllTodoAsync());
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectTodos = (state: RootState) => state.todo.todos;

export default todoSlice.reducer;
