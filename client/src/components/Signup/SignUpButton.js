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

const Button = ({inputInfo, isLogedIn,isLogedInhandler}) => {
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
  const [displayValidText, setDisplayValidText] = useState(false);
  
  const validcheck = () => {
    let idExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;
    let pwdExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    
    if (idExp.test(inputInfo.id) && pwdExp.test(inputInfo.password)) {
      try{
        axios.post('http://localhost:3000/signin', {id : inputInfo.id , password : inputInfo.password})
        .then((res) => {
          // 로그인이 성공했으면, 
          // 응답 확인하고 로그인 상태 변경 => 메인으로 보내주기
        })
        .then((res) => {
          isLogedInhandler()
          document.location.href = '/'
        })
      }
      catch{
        setDisplayValidText(true)
        // state에 따라서 문구 표출 여부
        // state 관리 .... 
        //*아이디 또는 비밀번호가 잘못 입력 되었습니다.
        // 아이디와 비밀번호를 정확히 입력해 주세요.
      }
    }
    else {
      setDisplayValidText(true)
    }
  }
  
  return <>
    <ValidText className={displayValidText ? "valid" : ""}>&#42;아이디 또는 비밀번호가 잘못 입력 되었습니다.<br /><b>아이디</b>와 <b>비밀번호</b>를 정확히 입력해 주세요.</ValidText> 
    <BtnWrap>
      <SignUpBtn onClick={validcheck}>Sign Up</SignUpBtn>
    </BtnWrap>
  </>
}

export default Button;