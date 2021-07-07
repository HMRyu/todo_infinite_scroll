/* 기본적인 틀을 형성하는 컴포넌트 */

import React from 'react'; // 리액트 추가
import styled from 'styled-components'; // 스타일 추가

const TodoTemplateBlock = styled.div`
  width: 512px;
  height: 768px;

  position: relative; 
  background: white;
  border-radius: 16px;

  margin: 0 auto;

  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
`;

function TodoTemplate({ children }) {
  return <TodoTemplateBlock>{children}</TodoTemplateBlock>;
}

export default TodoTemplate;