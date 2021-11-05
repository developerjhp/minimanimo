import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom'

const NewTweetWrap = styled.div`
  height: 20vh;
  margin: 2rem 2rem 0;
  padding: 1.5rem;
  text-align: left;
  align-items: center;
  background: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 0.4rem 0.2rem #eee;
  display: flex;
  flex-direction : row;
  width: 60vw;
  
  img {
    width: 6.2rem;
    height: 6.2rem;
    border: 1px solid #eee;
    border-radius: 50%;
  }

  textarea {
    margin-top: 1rem;;
    height: 12vh;
    resize: none;
    line-height: 1.2;
    border: 1px solid #e6e6e6;
    width: 45vw;
    /* flex: 7 0 0; */
  }
  
  textarea:focus {
    outline: 1px solid #EDC51E;
  }
  textarea::placeholder {
    color :  #cccccc;
    font-style: italic;
  }
`
const ImgNickWrap = styled.div`
  margin : 0 1rem 0 1rem;
  flex: 1.5;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Nickname = styled.div`
  height: 100%;
  margin: 0rem;
  font-weight: bold;
  /* flex: 1 0 0; */
  text-align: center;
  margin-top: 0.5rem;
`
const SubmitBtn = styled.button`
  height: 3vh;
  width: 4vw;
  /* margin-left: 1rem; */
  padding: 0.2rem;
  font-weight: bold;
  color: #fff;
  background: #387099;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  /* flex: 2 0 0; */

  &:hover {
    background: #EDC51E;
  }
  &:disabled {
    background: #aaa;
  }
`

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: row; */
  /* align-items: flex-end; */
  flex : 8.5;
  `
const TextButtonWrap = styled.div`
  display:flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1.5rem;
  margin-right: 3rem;
  margin-top: 0.5rem;
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
      axios.post('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/posts/new', { content: newInputValue }, config)
        .then(res => {
          console.log("잘되었어요")
          setNewInputValue('')
          // 여기서 Main 상태변경을 알려줘야 함.
          // setCreateInputState(!createInputState)
          axios.get('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/posts', config2)
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
    <ImgNickWrap><img src={isLogedIn ? JSON.parse(localStorage.getItem('userInfo')).image : `/images/users/${Math.floor(Math.random() * 8) + 1}.jpeg`} alt="프로필 이미지" />
        <Nickname >{isLogedIn ? JSON.parse(localStorage.getItem('userInfo')).nickname : <Link to='/signin'>로그인을 해주세요</Link>}</Nickname>
    </ImgNickWrap>
    <TextWrap>{isLogedIn
      ? <TextButtonWrap><textarea type="text" value={newInputValue} onChange={newInputValueHandler} maxLength={255} /><SubmitBtn disabled={isLogedIn ? false : true} onClick={submitBtnHandler}>Submit</SubmitBtn></TextButtonWrap>
      : <TextButtonWrap><textarea type="text" value="" disabled placeholder="로그인 후 작성 가능합니다." /><SubmitBtn disabled={isLogedIn ? false : true} onClick={submitBtnHandler}>Submit</SubmitBtn></TextButtonWrap>}
    </TextWrap>
  </NewTweetWrap>
  )
};