import { useState } from 'react'; 
import styled from 'styled-components';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const BtnWrap = styled.div`
  margin-top: 1.5rem;
  display: flex;
`
const SignUpBtn = styled.button`
  flex: 1 0 0;
  padding: 0.5rem 0;
  font-weight: bold;
  color: #fff;
  background-color: #387099;
  
  &:hover {
    background-color: #EDC51E;
  }
`
const ValidText = styled.div`
  margin: 0 0 0.2rem 0.2rem;
  font-size: 0.8rem;
  color: #387099;
  display: none;

  &.valid {
    display: block;
  }
`

const Button = ({ signUpInputInfo, signUpAllCheck }) => {
  // const { email, password, nickname } = req.body;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // console.log(signUpInputInfo)
  const signUpReqHandler = () => {
    const {password, nickname} = signUpInputInfo
    const payload = {email : signUpInputInfo.id , password, nickname}

    if (signUpAllCheck) {
      axios.post('/api/users', {
      ...payload
      }, config)
      .then(res => {
        // 이거 잘되면 로그인 화면으로 리다이렉트..?
        // history replace로 뒤로가기 안되게 
        document.location.href = '/signin'
  
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  
  return <>
    <BtnWrap>
      <SignUpBtn onClick={signUpReqHandler}>Sign Up</SignUpBtn>
    </BtnWrap>
  </>
}

export default Button;