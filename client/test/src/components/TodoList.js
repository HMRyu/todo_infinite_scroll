/* 할 일 리스트를 보여주는 컴포넌트 */

import React, { useEffect, useReducer, useState } from 'react';
import styled from 'styled-components';
import TodoItem from './TodoItem';
import { useTodoState,useTodoDispatch } from '../TodoContext';
import axios from 'axios';
import useIntersect from '../useIntersect';
import { sortedIndexOf } from 'lodash';

const fakeFetch = (delay=1000) => new Promise(res => setTimeout(res, delay));

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
  // const [todos, setTodos] = useState([]);
  const todos = useTodoState();
  /* DB에서 가져오기 */
  const [DBtodos, setDBtodos] = useState([]);
  //const [_DBtodos,_setDBtodos] = useState([]);
  const dispatch = useTodoDispatch();

  const [baseState, setbaseState] = useState({
    items: 9,
    preItems: 0,
    preCoverUrl:'',
    coverurl: ''
  });

  useEffect(()=>{
    axios.get('http://localhost:8000/api/get').then((response)=>{ 
      /* 한 번에 9개씩 보여주는 부분*/
      let result = response.data.slice(baseState.preItems, baseState.items); // baseState에서 설정한 대로 9개씩만 보여준다.
      setDBtodos(result); // DBtodos를 변경한다. 
    });
  },[]);
  
  useEffect(() => {
    dispatch ({
      type: 'INIT',
      DBtodos
    });
  },[DBtodos]);
  
  /* Infinite Scoll */    
  const [state, setState] = useState({itemCount: 0, isLoading: false});

  /* fake async fetch */
  const fetchItems = async() => {
    setState(prev => ({...prev, isLoading:true}));
    //setbaseState(prev => ({...prev, isLoading:true}));
    await fakeFetch();
    setState(prev => ({
      itemCount: prev.itemCount + 9,
      isLoading: false
    }));
    
   /*
    setbaseState(prev => ({
      itemCount: prev.itemCount + 9,
      isLoading: false
    }));
    */
  };

  /* 초기 아이템 로딩 */
  useEffect(() => {
    fetchItems();
  }, []);

  const [_, setRef] = useIntersect(async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  }, {});

  const { itemCount, isLoading } = state;
  if (!itemCount) return null;

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
        <div ref={setRef} className="Loading">
          {isLoading && "Loading..."}
        </div>    
      </TodoListBlock>  
  );
}

export default TodoList;