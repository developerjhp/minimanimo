import { useState } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components'
import Input from '../components/Signin/Input';
import Logo from '../assets/images/Logo.svg';
import Button from '../components/Signin/Button';
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
  margin-bottom: 1rem;
`

const PrevBtn = styled.div`
  font-size: 1.2rem;
  position: absolute;
  top: 1.2rem;
  left: 2rem;
  `

const Signup = ({isLogedIn, setIsLogedIn, isLogedInhandler}) => {
  const [inputInfo, setInputInfo] = useState({ id: '', password: '' });
  
  return <SignupContainer>
    <SignupWrap>
    <PrevBtn><Link to='/'><FaArrowLeft/></Link></PrevBtn>
      <LogoImg src={Logo} alt="Logo" />
      <Input inputInfo={inputInfo} setInputInfo={setInputInfo}/>
      <Button inputInfo={inputInfo} isLogedIn={isLogedIn} setIsLogedIn={setIsLogedIn} isLogedInhandler={isLogedInhandler}/>
    </SignupWrap>
  </SignupContainer>
}

  //  const [Valid, Idvalid] = useState(false);
  // const strongPassword = (str) = {
  //   regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  // }
  // const checkPassword = (e) => {
  //   //  8 ~ 10자 영문, 숫자 조합
  //   let regExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{8,10}$/
  //   // 형식에 맞는 경우 true 리턴
  //   if (regExp.test(e.target.value))
  //     setValid = false;
  //   else
  //     setValid = true;
  // }
  //onBlur={checkPassword}
  
  // var regExp = /^0-9a-zA-Z@0-9a-zA-Z.[a-zA-Z]{2,3}$/i;  이메일 reg
  // var regExp = /^[a-z0-9_]{4,20}$/; // 비밀번호
  // var regExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/; 비밀번호 체크

export default Signup;


// import { useState } from 'react'; 
// import styled from 'styled-components';
// import { Link } from 'react-router-dom';

// const BtnWrap = styled.div`
//   margin-top: 1.5rem;
//   display: flex;
// `
// const SignInBtn = styled.button`
//   flex: 1 0 0;
//   margin-left: 0.5rem;
//   padding: 0.5rem 0;
//   font-weight: bold;
//   color: #fff;
//   background-color: #387099;
  
//   &:hover {
//     background-color: #EDC51E;
//   }
//   >a:hover {
//     color: #fff;
//   }
// `
// const SignUpBtn = styled.button`
//   flex: 1 0 0;
//   margin-right: 0.5rem;
//   padding: 0.5rem 0;

//   &:hover {
//     color: #ffffff;
//     background-color: #4D2C21;
//   }
// `

// const Button = ({inputInfo, isLogedIn,setIsLogedIn, isLogedInhandler}) => {
//   //버튼을 클릭하면, 현재 가지고있는 inputInfo를 가지고 서버에게 axios post 요청을 함.
//   //

//   return (
//     <BtnWrap>
//       <SignUpBtn><Link to='/signup'>Sign Up</Link></SignUpBtn>
//       <SignInBtn>Sign In</SignInBtn>
//     </BtnWrap>
//   )
// }

// export default Button;