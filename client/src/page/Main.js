import Header from '../components/Header';
import BoardInput from '../components/BoardInput';
import BoardList from '../components/BoardList';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const BoardWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
    
const Main = ({ isLogedIn, isLogedInhandler }) => {
  const [boardListData, setBoardListData] = useState([]);
  
  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/posts', config)
      .then((res) => {
        setBoardListData([...res.data])
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <>
    <Header isLogedIn={isLogedIn} isLogedInhandler={isLogedInhandler} />
    <BoardWrap>
      <BoardInput isLogedIn={isLogedIn} setBoardListData={setBoardListData} />
      <BoardList isLogedIn={isLogedIn} boardListData={boardListData} />
    </BoardWrap>
  </>
}

export default Main;