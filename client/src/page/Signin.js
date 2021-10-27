import { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import Input from '../components/Signin/Input';
import Logo from '../assets/images/Logo.svg';
import Button from '../components/Signin/Button';
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

const Signin = ({isLogedIn, setIsLogedIn, isLogedInhandler}) => {
  
  const [inputInfo, setInputInfo] = useState({ id: '', password: '' });
  
  return <SigninContainer>
    <SigninWrap>
      <PrevBtn><Link to='/'><FaArrowLeft/></Link></PrevBtn>
      <LogoImg src={Logo} alt="Logo" />
      <Input inputInfo={inputInfo} setInputInfo={setInputInfo}/>
      <Button inputInfo={inputInfo} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} isLogedInhandler={isLogedInhandler}/>
    </SigninWrap>
  </SigninContainer>
}
// EFF1F1
export default Signin;