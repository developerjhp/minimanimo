import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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
const ValidText = styled.div`
  margin: 0 0 0.2rem 0.2rem;
  font-size: 0.8rem;
  color: #387099;
  display: none;

  &.valid {
    display: block;
  }
`

const SignInButton = ({ signInInputInfo, setSignInInputInfo, isLogedIn, isLogedInhandler }) => {
  // signin 버튼을 클릭하면, 현재 가지고있는 inputInfo를 가지고 서버에게 axios post 요청
  // TODO: inputInfo id, password 유효성검사해서 버튼 눌려도 axios 요청 안가고 바로 문구 표출
  // TODO: input 유효성 검사 
  // id: 이메일 형식이어야 함.
  // password: 최소 8자 이상 20자 이하, 알파벳(대소문자 구분 x)과 숫자 및 특수문자(@$!%*#?&)는 하나 이상 포함해야 합니다
  // id 유효, password 유효 => axios 요청 => 결과 반환

  /*첫번째 고려사항 
  만약 일치하는 유저가 있고 비밀번호도 잘 적었다면 
  isLogedIn상태를 true로 바꾸어줌 (이때 isLogedInhandler를 실행 시키면 false를 true로 변경) 
  */

  /*두번째 고려사항
  만약 일치하는 유저가 없거나 비밀번호를 잘못 적는다면
  isLogedIn상태는 그대로 true이며 에러메시지를 써줘야함.
  */
  // useEffect(() => {
  //   console.log(isLogedIn)
  // }, [isLogedIn])

  const [displayValidText, setDisplayValidText] = useState(false);
  const history = useHistory();

  const validcheck = () => {
    let idExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
    let pwdExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;

    if (idExp.test(signInInputInfo.email) && pwdExp.test(signInInputInfo.password)) {
      axios.post('/api/users/login', { email: signInInputInfo.email, password: signInInputInfo.password })
        .then((res) => {
          const userInfo = res.data // 서버에서 받아온 유저정보
          // localStorge 데이터 저장
          localStorage.setItem('userInfo', JSON.stringify(userInfo))
          isLogedInhandler()
          setSignInInputInfo({ email: '', password: '' })
          history.replace('/')  // token 
        }).catch(err => {
          console.log(err)
          setDisplayValidText(true)
        })
    }
    else {
      setDisplayValidText(true)
    }
  }

  return <>
    <ValidText className={displayValidText ? "valid" : ""}>&#42;아이디 또는 비밀번호가 잘못 입력 되었습니다.<br /><b>아이디</b>와 <b>비밀번호</b>를 정확히 입력해 주세요.</ValidText>
    <BtnWrap>
      <SignUpBtn><Link to='/signup'>Sign Up</Link></SignUpBtn>
      <SignInBtn onClick={validcheck}>Sign In</SignInBtn>
    </BtnWrap>
  </>
}

export default SignInButton;

