import { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import SignInInput from '../components/Signin/SignInInput';
import Logo from '../assets/images/Logo.svg';
import SignInButton from '../components/Signin/SignInButton';
import { FaArrowLeft } from 'react-icons/fa';

const SigninContainer = styled.div`
  height: 100vh;
  background: #EFF1F1;
  display: flex;
  justify-content: center;
  align-items: center;
`
const LogoImg = styled.img`
  width: 12vh;
  margin-bottom: 1.5rem;
`
const SigninWrap = styled.div`
  width: 50vh;
  padding: 2rem;
  border-radius: 0.8rem;
  background: #ffffff;
  position: relative;
`
const PrevBtn = styled.div`
  font-size: 1.2rem;
  position: absolute;
  top: 1.2rem;
  left: 2rem;
`

const Signin = ({isLogedIn,  isLogedInhandler}) => {
  const [signInInputInfo, setSignInInputInfo] = useState({ email: '', password: '' });
  
  return <SigninContainer>
    <SigninWrap>
      <PrevBtn><Link to='/'><FaArrowLeft/></Link></PrevBtn>
      <LogoImg src={Logo} alt="Logo" />
      <SignInInput signInInputInfo={signInInputInfo} setSignInInputInfo={setSignInInputInfo}/>
      <SignInButton signInInputInfo={signInInputInfo} isLogedIn={isLogedIn}  isLogedInhandler={isLogedInhandler} setSignInInputInfo={setSignInInputInfo}/>
    </SigninWrap>
  </SigninContainer>
}
// 
export default Signin;