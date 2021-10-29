import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import SignUpInput from '../components/Signup/SignUpInput';
import Logo from '../assets/images/Logo.svg';
import SignUpButton from '../components/Signup/SignUpButton';
import { FaArrowLeft } from 'react-icons/fa';

const SignupContainer = styled.div`
  height: 100vh;
  background: #EFF1F1;
  display: flex;
  justify-content: center;
  align-items: center;
`
const SignupWrap = styled.div`
  width: 50vh;
  padding: 2rem;
  border-radius: 0.8rem;
  background: #ffffff;
  position: relative;
`

const LogoImg = styled.img`
  width: 12vh;
  margin-bottom: 1.5rem;
`

const PrevBtn = styled.div`
  font-size: 1.2rem;
  position: absolute;
  top: 1.2rem;
  left: 2rem;
  `

const Signup = ({isLogedIn, isLogedInhandler}) => {
  const [signUpInputInfo, setSignUpInputInfo] = useState({ email: '', password: '', passwordCheck: '', nickname: '' });
  const [signUpValid, setSignUpValid] = useState({ email: false, password: false, passwordCheck: false, nickname: false });
  const [signUpAllCheck, setSignUpAllCheck] = useState(false); // useEffect로 변경
  // useEffect로 signUpValid 감시 => 다 트루면 변경 => 버튼으로 내려주기

  useEffect(() => {
    console.log(Object.entries(signUpValid).flat().every(el=> el))
    //signUpvalid가 변경될떄마다, 체크하고 만약 signUpvalid의 모든 value값이 true가 될 경우 signUpAllCheck를 트루를 바꿔야됨. 
    // if(Object.entries(signUpValid).every()) {  // [[],[],[],[]]
    if(Object.entries(signUpValid).flat().every(el=> el)){
      setSignUpAllCheck(true)
    }
    else {
      setSignUpAllCheck(false)
    }
  },[signUpValid])
  
  return <SignupContainer>
    <SignupWrap>
    <PrevBtn><Link to='/signin'><FaArrowLeft/></Link></PrevBtn>
      <LogoImg src={Logo} alt="Logo" />
      <SignUpInput signUpInputInfo={signUpInputInfo} setSignUpInputInfo={setSignUpInputInfo} signUpValid={signUpValid} setSignUpValid={setSignUpValid} />
      <SignUpButton signUpInputInfo={signUpInputInfo} signUpAllCheck={signUpAllCheck} />
    </SignupWrap>
  </SignupContainer>
}

export default Signup;