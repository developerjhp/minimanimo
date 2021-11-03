import Header from '../components/Header';
import BoardInput from '../components/BoardInput';
import BoardList from '../components/BoardList';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Main = ({ isLogedIn, isLogedInhandler }) => {
  const [boardListData, setBoardListData] = useState([]);
  
  useEffect(() => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    axios
      .get('/api/posts', config)
      .then((res) => {
        setBoardListData([...res.data])
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <>
    <Header isLogedIn={isLogedIn} isLogedInhandler={isLogedInhandler} />
    <BoardInput isLogedIn={isLogedIn} setBoardListData={setBoardListData} />
    <BoardList isLogedIn={isLogedIn} boardListData={boardListData} />
  </>
}

export default Main;