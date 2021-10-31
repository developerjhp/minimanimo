import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const BoardWrap = styled.div`
  height: 16vh;
  margin: 2rem 2rem 0;
  padding: 1.5rem;
  text-align: left;
  align-items: center;
  background: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 0.4rem 0.2rem #eee;
  display: flex;
  flex-direction : row;
  position: relative;

  &.delete {
    display: none;
  }
  
  img {
    width: 5rem;
    height: 5rem;
    border: 1px solid #eee;
    border-radius: 50%;
  }

  textarea {
    width: 100%;
    height: 10vh;
    resize: none;
    margin-left: 1rem;
    border: 1px solid #e6e6e6;
  }
  
  textarea:focus {
    outline: 1px solid #EDC51E;
  }

  button {
    margin-left: 1rem;
  }
  button:hover {
    background: #aaa;
  }
`
const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`
const BtnWrap = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
const Nickname = styled.div`
  height: 100%;
  margin: 0 1rem;
  font-weight: bold;
  flex: 1 0 0;
`
const Content = styled.div`
  height: 10vh;
  margin-left: 1rem;
`
const CreatedAt = styled.div`
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  color: #444;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`

export default function Board({ isLogedIn, board }) {
  const [updatedAt, setUpdatedAt] = useState(board.updatedAt)
  const [editable, setEditable] = useState(false);
  const [editValue, setEditValue] = useState(board.content);
  const [canUSeeMe, setCanUSeeMe] = useState(true);
  //포스트 정보다 가져오기 API : /api/posts

  const [year, month, day] = updatedAt.split('-');
  const hour = day.split('T')[1].split(':')[0]
  const min = day.split('T')[1].split(':')[1]
  
  const [year2, month2, day2] = board.createdAt.split('-');
  const hour2 = day2.split('T')[1].split(':')[0]
  const min2 = day2.split('T')[1].split(':')[1]

  const editHandler = () => {
    setEditable(!editable)
  }
  const editValueHandler = (e) => {
    setEditValue(e.target.value);
  }
  
  const newInputInfo = JSON.parse(localStorage.getItem('userInfo'))

  const config = {
    headers: {
      Authorization: isLogedIn ? `Bearer ${newInputInfo.token}` : undefined,
      'Content-Type': 'application/json',
    },
  };

  const postAxios = () => {
    function dateFormat(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();

      month = month >= 10 ? month : '0' + month;
      day = day >= 10 ? day : '0' + day;
      hour = hour >= 10 ? hour : '0' + hour;
      minute = minute >= 10 ? minute : '0' + minute;
      second = second >= 10 ? second : '0' + second;

      return date.getFullYear() + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second +'.777Z';
    }

    // console.log(dateFormat(new Date()))
    axios.put('/api/posts/edit', { _id: board._id, content: editValue, updatedAt : dateFormat(new Date()) }, config)
      .then(res => {
        setEditable(!editable)
        setUpdatedAt(res.data.updatedAt)
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  const deleteAxios = () => {
    axios.delete('/api/posts/delete', {
      ...config,
      data: {_id : board._id} 
    })
      .then(res => {
        setCanUSeeMe(false)
        console.log(res)
      })
      .catch(err => 
        console.log(err)
        )
  }
  
  return <BoardWrap className={canUSeeMe ? '' : 'delete'}>
      <div><img src={board.user.image} alt="프로필 이미지" /></div>
      <ContentWrap>
        <Nickname >{board.user.nickname}</Nickname>
        {editable
        ? <textarea type="text" value={editValue} onChange={editValueHandler} maxLength={255}/>
        : <Content>{editValue}</Content>}
      </ContentWrap>
      {isLogedIn && board.user._id === JSON.parse(localStorage.getItem('userInfo'))._id
      ? <BtnWrap>
          <button onClick={deleteAxios}>delete</button>
          {editable
          ? <button onClick={postAxios}>ok</button>
          : <button onClick={editHandler}>edit</button>
          }
        </BtnWrap>
      : null}
      { board.createdAt === updatedAt 
      ? <CreatedAt>{`생성일: ${year2}/${month2}/${day2.split('T')[0]} ${hour2}:${min2}`}</CreatedAt> 
      : <CreatedAt>{`수정일: ${year}/${month}/${day.split('T')[0]} ${hour}:${min}`}</CreatedAt> }
  </BoardWrap>
}