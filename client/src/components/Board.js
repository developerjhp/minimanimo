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
  
  img {
    width: 5rem;
    height: 5rem;
    border: 1px solid #eee;
    border-radius: 50%;
  }

  input {
    height: 10vh;
    line-height: 1;
    border: 1px solid #e6e6e6;
    flex: 7 0 0;
  }
  
  input:focus {
    outline: 1px solid #EDC51E;
  }
  input::placeholder {
    color :  #cccccc;
    font-style: italic;
  }
`
const Nickname = styled.div`
  height: 100%;
  margin: 0 1rem;
  font-weight: bold;
  flex: 1 0 0;
`
// const Content = styled.div`
  
// `



export default function Board({ isLogedIn, boardListData }) {
 //포스트 정보다 가져오기 API : /api/posts
  console.log(boardListData)
  return <BoardWrap>
      <div><img src='#' alt="프로필 이미지" />유저들 이미지 받아와야함</div>
      <Nickname >d</Nickname>
      {/* <Content > </Content> */}
      {/* <SubmitBtn disabled={isLogedIn ? false : true} onClick={submitBtnHandler}>Submit</SubmitBtn> */}
      {/* <CreatedAt> </CreatedAt> */}
  </BoardWrap>
};