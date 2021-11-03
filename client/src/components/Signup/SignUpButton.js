// import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
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

const SignUpButton = ({ signUpInputInfo, signUpAllCheck }) => {
  // const { email, password, nickname } = req.body;
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  // console.log(signUpInputInfo)

  const history = useHistory();

  const signUpReqHandler = () => {
    const { password, nickname } = signUpInputInfo
    const payload = { email: signUpInputInfo.email, password, nickname }

    if (signUpAllCheck) {
      axios.post('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/users', {
        ...payload
      }, config)
        .then(res => {
          // 회원가입 후 로그인 페이지로 갱신
          history.replace('/signin')
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

export default SignUpButton;