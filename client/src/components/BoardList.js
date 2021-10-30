import { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Board from './Board';

const BoardListWrap = styled.div`
  height: 60vh;
  margin: 2rem 2rem 0;
  padding: 1.5rem;
  text-align: left;
  align-items: center;
  background: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 0.4rem 0.2rem #eee;
  display: flex;
  flex-direction: row;
`;

export default function BoardList({ isLogedIn }) {
  const [boardListData, setBoardListData] = useState('');

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    axios
      .get('/api/posts', config)
      .then((res) => {
        //res.data에 들어가 있음,
        console.log(res);
        // setBoardListData(res.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <BoardListWrap>
      <Board boardListData={boardListData} />
    </BoardListWrap>
  );
}
