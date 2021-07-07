/* 할 일 리스트를 보여주는 컴포넌트 */

import React from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState } from '../TodoContext';
/* flex:1 => 자신이 차지하고 있는 영역은 꽉 채운다. */
/* overflow-y 세로의 내용이 더 길 때 어떻게 보일지 선택하는 속성 
   - visible : 특정 요소가 박스를 넘어가도 그대로 보여준다.
   - hidden : 부모 요소의 범위를 넘어가는 자식 요소의 부분은 보이지 않게 한다.
   - scroll : 부모 요소의 범위를 넘어가는 자식 요소의 부분은 보이지 않지만, 사용자가 확인할 수 있도록 스크롤을 표시한다. 
     -- 항상 스크롤바 표시
   - auto : 부모 요소의 범위를 넘어가는 자식 요소의 부분이 있을 경우 해당 부분이 보이지 않게 처리하고 사용자가 해당 부분을 확인할 수 있도록 스크롤바를 표시한다.
     -- 내용이 넘칠 때만 스크롤바 표시 */

const TodoListBlock = styled.div `
  flex: 1;
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;
  background: white;
`;

function TodoList() {
  const todos = useTodoState();  
  return (
    <TodoListBlock>
      {todos.map(todo => (        
        <TodoItem
          key = {todo.id}
          id = {todo.id}
          text = {todo.text}
          done = {todo.done}
        />        
      ))}
    </TodoListBlock>
  );
}

export default TodoList;