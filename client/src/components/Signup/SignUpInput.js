import { useState } from 'react'; 
import styled from 'styled-components';
import axios from 'axios';

const InputWrap = styled.div`
  display: flex;
  flex-direction : column;
  text-align: left;
  color : #808080;

  input {
    margin: 0.2rem 0 0.5rem;
    padding: 0.4rem 0.5rem;
    border: 1px solid #e6e6e6;
  }
  input:focus {
    outline: 1px solid #EDC51E;
  }
  input::placeholder {
    color :  #cccccc;
    font-style: italic;
  }
  
  b {
    border-bottom: 1px solid #EDC51E;
  }
`
                //우리가 입력한 값 (보낼값)             //개별 유효성 체크(boolean)
const Input = ({signUpInputInfo, setSignUpInputInfo, signUpValid, setSignUpValid}) => {
  
  // TODO: 서버에 signin 요청 후 잘못됐을때 ValidText 표출 및 input outline 붉은색으로 변경
  // const [signUpValid, setSignUpValid] = useState({id: false, password: false, passwordCheck: false, nickname: false});  참고용 
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const vaidId = (e) => {
    let idExp = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/;

    setSignUpInputInfo({...signUpInputInfo, id: e.target.value})
    
    if(!idExp.test(signUpInputInfo.id))
      setSignUpValid({...signUpValid, id : false})
    else {
      setSignUpValid({...signUpValid, id : true})
      axios.post('/api/validate/email', {
        eamil : signUpInputInfo.id
      }, config)
    }
  }


  const validPassword = (e) => {
    let pwdExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
    
    setSignUpInputInfo({...signUpInputInfo, password: e.target.value})
    
    if (!pwdExp.test(e.target.value))
      setSignUpValid({...signUpValid, password: false})
    else
      setSignUpValid({...signUpValid, password: true})
  }

  const validPasswordCheck = (e) => {
    if (e.target.value === signUpInputInfo.password)
      setSignUpValid({...signUpValid, passwordCheck: true})
    else
      setSignUpValid({...signUpValid, passwordCheck: false})
  }

  const validNickName = (e) => {

    setSignUpInputInfo({...signUpInputInfo, nickname: e.target.value})

    if (!e.target.value.length > 10)
      setSignUpValid({...signUpValid, nickname: false})
    else
      setSignUpValid({...signUpValid, nickname: true})
  }

  return (
    <InputWrap>
      {/* 입력 내용 : 이메일, 비밀번호, 비밀번호 확인, 닉네임 */}
      {/* onChange => 유효성 검사 / focusOut => 이메일, 닉네임 중복확인 */}
      <label for="clickemail">Email</label>
      <input id="clickemail" type="email" placeholder="email" value={signUpInputInfo.id} onChange={vaidId}/>
      { signUpInputInfo.id === '' || signUpValid.id ?  null : <span>올바른 이메일 형식이 아닙니다.</span> }

      <label for="clickpwd2">Password</label>
      <input id="clickpwd2" type="password" placeholder="password" value={signUpInputInfo.password} onChange={validPassword}/>
      { signUpInputInfo.password === '' || signUpValid.password ? null : <span>알파벳, 숫자, 특수문자를 포함하여 8~20글자를 입력해주세요.</span> }
      
      <label for="clickpwdcheck">Password Check</label>
      <input id="clickpwdcheck" type="password" placeholder="password Check" value={signUpInputInfo.passwordCheck} onChange={validPasswordCheck}/>
      { signUpValid.passwordCheck || signUpValid.passwordCheck === undefined ? null : <span>비밀번호와 일치하지 않습니다.</span> }

      <label for="clicknickname">Nickname</label>
      <input id="clicknickname" type="nickname" placeholder="nickname" value={signUpInputInfo.nickname} onChange={validNickName}/>
    </InputWrap>
  )
}

export default Input;