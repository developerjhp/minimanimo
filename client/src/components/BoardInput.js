import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'

const NewTweetWrap = styled.div`
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
  
  img {
    width: 5rem;
    height: 5rem;
    border: 1px solid #eee;
    border-radius: 50%;
  }

  textarea {
    height: 10vh;
    resize: none;
    line-height: 1;
    border: 1px solid #e6e6e6;
    flex: 7 0 0;
  }
  
  textarea:focus {
    outline: 1px solid #EDC51E;
  }
  textarea::placeholder {
    color :  #cccccc;
    font-style: italic;
  }
`
const Nickname = styled.div`
  height: 100%;
  margin: 0 1rem;
  font-weight: bold;
  flex: 1 0 0;
  text-align: center;
`
const SubmitBtn = styled.button`
  height: 40%;
  margin-left: 1rem;
  padding: 0.2rem;
  font-weight: bold;
  color: #fff;
  background: #387099;
  flex: 2 0 0;

  &:hover {
    background: #EDC51E;
  }
  &:disabled {
    background: #aaa;
  }
`

export default function BoardInput({ isLogedIn, setBoardListData }) {

  const [newInputValue, setNewInputValue] = useState('')

  const newInputValueHandler = (e) => {
    setNewInputValue(e.target.value)
  }

  const newInputInfo = JSON.parse(localStorage.getItem('userInfo'))

  const config = {
    headers: {
      Authorization: isLogedIn ? `Bearer ${newInputInfo.token}` : undefined,
      'Content-Type': 'application/json',
    },
  };

  const config2 = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const submitBtnHandler = () => {
    //axios post 요청 (_id(localstorage userInfo._id)), 토큰(header), newInputValue 전송)
    //서버에서 외부에서 못들어오도록 막아서 이거 할때 토큰도 같이 보내야 함.
    if (newInputValue !== '') {
      axios.post('api/posts/new', { content: newInputValue }, config)
        .then(res => {
          console.log("잘되었어요")
          setNewInputValue('')
          // 여기서 Main 상태변경을 알려줘야 함.
          // setCreateInputState(!createInputState)
          axios.get('api/posts', config2)
            .then(res => {
              setBoardListData([...res.data])
            })
            .catch(err => {
              console.log(err)
            })
        }).catch(err => {
          console.log(err)
        })
    }
  }

  return (
    <NewTweetWrap>
      <div><img src={isLogedIn ? JSON.parse(localStorage.getItem('userInfo')).image : `/images/users/${Math.floor(Math.random() * 8) + 1
}.jpeg`} alt="프로필 이미지" /></div>
      <Nickname >{isLogedIn ? JSON.parse(localStorage.getItem('userInfo')).nickname : <Link to='/signin'>로그인을 해주세요</Link>}</Nickname>
      {isLogedIn
        ? <textarea type="text" value={newInputValue} onChange={newInputValueHandler} maxLength={255} />
        : <textarea type="text" value="" disabled placeholder="로그인 후 작성 가능합니다." />}
      <SubmitBtn disabled={isLogedIn ? false : true} onClick={submitBtnHandler}>Submit</SubmitBtn>
    </NewTweetWrap>
  )
};