/* 각 할 일을 보여주는 컴포넌트 */

import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone, MdDelete } from 'react-icons/md';
import { useTodoDispatch, useTodoState } from '../TodoContext';
import axios from 'axios';

const Remove = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  color: #dee2e6;
  font-size: 24px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  display: none;  
`;

const TodoItemBlock = styled.div `  
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const CheckCircle = styled.div `  
  width: 32px;
  height: 32px;
  border-radius: 16px;
  border: 1px solid #ced4da;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 21px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #ced4da;
    `}
`;

function TodoItem({ id, done, text }) {
  
  const todos = useTodoState();
  const dispatch = useTodoDispatch();
  const onToggle = () => {
    dispatch({ type: 'TOGGLE', id });
    console.log('test', todos);
    toggleTodo(id);
  }
  const onRemove = () => {
    dispatch({ type: 'REMOVE', id });
    console.log('test', todos);
    removeTodo(id);
  }

  /* 할 일 Toggle */
  const toggleTodo = id => {
    axios.post(`http://localhost:8000/api/update/${id}`, []).then(response => {
      console.log('response', response);
      const { data } = response || {data: {}};
      alert(response.data.message);
    }).catch(() => {
      alert('수정 실패!');
    })
  }

  /* 할 일 Remove */
  const removeTodo = id => {
    axios.delete(`http://localhost:8000/api/remove/${id}`, []).then(response => {
      console.log('response', response);
      const { data } = response || {data: {}};
      alert(response.data.message);
    }).catch(() => {
      alert('삭제 실패!');
    })
  }

  return (
    <TodoItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </TodoItemBlock>
  );
}

export default TodoItem;
