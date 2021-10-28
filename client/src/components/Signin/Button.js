import { useState } from 'react'; 
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const BtnWrap = styled.div`
  margin-top: 1.5rem;
  display: flex;
`
const SignInBtn = styled.button`
  flex: 1 0 0;
  margin-left: 0.5rem;
  padding: 0.5rem 0;
  font-weight: bold;
  color: #fff;
  background-color: #387099;
  
  &:hover {
    background-color: #EDC51E;
  }
`
const SignUpBtn = styled.button`
  flex: 1 0 0;
  margin-right: 0.5rem;
  padding: 0 0 0 0;
  font-weight: bold;

  &:hover {
    background-color: #4D2C21;
    color: #fff;
  }
  > a:hover {
    color: #fff;
  }
  > a {
    height: 40px;
    padding-top: 8px;

  }
`

const Button = ({inputInfo, isLogedIn,setIsLogedIn, isLogedInhandler}) => {
  //버튼을 클릭하면, 현재 가지고있는 inputInfo를 가지고 서버에게 axios post 요청을 함.
  
  /*첫번째 고려사항 
  만약 일치하는 유저가 있고 비밀번호도 잘 적었다면 
  isLogedIn상태를 true로 바꾸어줌 (이때 isLgedInhanler를 실행 시키면 false를 true로 바꾸줌) 
  */

  /*두번째 고려사항
  만약 일치하는 유저가 없거나 비밀번호를 잘못 적는다면
  isLogedIn상태는 그대로 true이며 에러메시지를 써줘야함.
  */
  


  return (
    <BtnWrap>
      <SignUpBtn><Link to='/signup'>Sign Up</Link></SignUpBtn>
      <SignInBtn>Sign In</SignInBtn>
    </BtnWrap>
  )
}

export default Button;