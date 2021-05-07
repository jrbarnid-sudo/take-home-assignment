import { connect } from 'react-redux';
import { TodoTable } from './TodoTable';

const mapStateToProps = (state: { todo: { todos: any } }) => {
  const todos = state.todo.todos || [];

  return { todos };
};

export default connect(mapStateToProps)(TodoTable);
