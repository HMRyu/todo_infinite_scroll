/* 새로운 일을 등록할 수 있게 해 주는 컴포넌트 
   react-icons에 있는 MdAdd 사용 => + 아이콘
   useState 사용 => 토글 가능한 open 값 생성  */

   import React, { useState, useEffect } from 'react';
   import styled, { css } from 'styled-components';
   import { MdAdd } from 'react-icons/md';
   import { useTodoDispatch, useTodoNextId, useTodoState } from '../TodoContext';
   import axios from 'axios';
   
   /* z-index : 아이콘들이 겹쳐 있을 때 제일 먼저 올 우선순위 결정 
      */
   const CircleButton = styled.button`
     background: #38d9a9;
     &:hover {
       background: #63e6be;
     }
     &:active {
       background: #20c997;
     }
     z-index: 5;
     cursor: pointer;
     width: 80px;
     height: 80px;
     display: block;
     align-items: center;
     justify-content: center;
     font-size: 60px;
     position: absolute;
     left: 50%;
     bottom: 0px;
     transform: translate(-50%, 50%);
     color: white;
     border: none;
     display: flex;
     align-items: center;
     justify-content: center;
     border-radius: 50%;
     transition: 0.125s all ease-in;
       
     ${props =>                     // props를 전달하는 구문이다. props는 닫혀있는데 전달되면 open으로 변경되고 open일 때의 css를 정의한다. 
       props.open &&                
       css`
         background: #ff6b6b;
         &:hover {
           background: #ff8787;
         }
         &:active {
           background: #fa5252;
         }
         transform: translate(-50%, 50%) rotate(45deg);
       `}
   `;
   
   const InsertFormPositioner = styled.div`
     width: 100%;
     bottom: 0;
     left: 0;
     position: absolute;
   `;
   
   const InsertForm = styled.form`
     background: #f8f9fa;
     padding-left: 32px;
     padding-top: 32px;
     padding-right: 32px;
     padding-bottom: 72px;
     border-bottom-left-radius: 16px;
     border-bottom-right-radius: 16px;
     border-top: 1px solid #e9ecef;
   `;
   
   const Input = styled.input`
     padding: 12px;
     border-radius: 4px;
     border: 1px solid #dee2e6;
     width: 100%;
     outline: none;
     font-size: 18px;
     box-sizing: border-box;
   `;
      
   function TodoCreate() {
   
     /* useState가 true 이면 + 아이콘을 돌려서 x 표시를 보여주고 버튼을 빨간색으로 변경
     false 라면 원상태로 복구한다. */
     
     const [open, setOpen] = useState(false);
     const [value, setValue] = useState('');
   
     const dispatch = useTodoDispatch();
     const nextId = useTodoNextId();
   
     const onToggle = () => setOpen(!open);
     const onChange = (e) => {
       setValue(e.target.value);
     };

     const onSubmit = e => {
       e.preventDefault();
       const todo = {
         id: nextId.current,
         text: value,
         done: false
       };

       dispatch({
         type: 'CREATE',
         todo 
       });
       submitTodo(todo);              
     };

     /* todo context를 받아와 local storage에 저장 */
     const todos = useTodoState();
     //window.localStorage.setItem('todo', JSON.stringify(todos)); // local storage에 저장     

     const submitTodo = params =>{
      axios.post('http://localhost:8000/api/insert', params).then(response =>{
        alert('등록 완료!');
        console.log('response', response);
      
        setValue('');
        setOpen(false);
        nextId.current += 1;   
      });
    };
     
     return (
       <>
         {open && (
           <InsertFormPositioner>          
             <InsertForm onSubmit={onSubmit}>
               <Input
                 autoFocus
                 placeholder="할 일을 입력 후, Enter 를 누르세요"
                 onChange={onChange}
                 value={value}       
               />
             </InsertForm>
           </InsertFormPositioner>
         )}
         <CircleButton onClick={onToggle} open={open}>
           <MdAdd />
         </CircleButton>
       </>
     );
   }
   
   export default TodoCreate;