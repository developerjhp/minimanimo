import { useState, useEffect } from 'react'; 
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
                //우리가 입력한 값 (보낼값)               //개별 유효성 체크(boolean)
const Input = ({signUpInputInfo, setSignUpInputInfo, signUpValid, setSignUpValid}) => {
  
  const idExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const pwdExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/;
  const nicknameExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;

  // TODO: 서버에 signin 요청 후 잘못됐을때 ValidText 표출 및 input outline 붉은색으로 변경
  // const [signUpValid, setSignUpValid] = useState({id: false, password: false, passwordCheck: false, nickname: false});  참고용 
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  useEffect(() => {
    //email 검증 useEffect
    if (idExp.test(signUpInputInfo.id)) {
      axios.post('/api/validate/email', { email : signUpInputInfo.id }, config)
        .then(res => { 
          //가입가능한 이메일이니 이것도 문구하나 띄워야됨
          console.log(res) })
        .catch(err => {
          //중복된 이메일이니 문구하나 띄워야됨.
        })
    }

    //nickname 검증 useEffect
    if(nicknameExp.test(signUpInputInfo.nickname)){
      axios.post( '/api/validate/nickname', { nickname : signUpInputInfo.nickname}, config)
      .then(res => {
        //사용 가능한 닉네임이니 문구하나 띄우기
        console.log(res)
      })
      .catch(err => {
        //중복된 닉네임이니 문구하나 띄우기
      })
    }

  }, [signUpInputInfo])
  
  const validId = (e) => {
    setSignUpInputInfo({ ...signUpInputInfo, id: e.target.value })
    if (!idExp.test(signUpInputInfo.id))
      setSignUpValid({ ...signUpValid, id: false })
    else {
      setSignUpValid({ ...signUpValid, id: true })
    }
  }


  const validPassword = (e) => {
    
    setSignUpInputInfo({...signUpInputInfo, password: e.target.value})
    
    if (!pwdExp.test(e.target.value))
      setSignUpValid({...signUpValid, password: false})
    else
      setSignUpValid({...signUpValid, password: true})
  }

  const validPasswordCheck = (e) => {
    setSignUpInputInfo({...signUpInputInfo, passwordCheck: e.target.value})

    if (e.target.value === signUpInputInfo.password)
      setSignUpValid({...signUpValid, passwordCheck: true})
    else
      setSignUpValid({...signUpValid, passwordCheck: false})
  }

  const validNickName = (e) => {
    setSignUpInputInfo({...signUpInputInfo, nickname: e.target.value})

    if (!nicknameExp.test(e.target.value))
      setSignUpValid({...signUpValid, nickname: false})
    else
      setSignUpValid({...signUpValid, nickname: true})
  }

  return (
    <InputWrap>
      {/* ADVENCED: 서버랑 통신해서 받아온걸 업데이트 해줄 상태 생성 => 결과에 따라 문구 표출 */}
      <label for="clickemail">Email</label>
      <input id="clickemail" type="email" placeholder="email" value={signUpInputInfo.id} onChange={validId}/>
      { signUpInputInfo.id === '' || signUpValid.id ?  null : <span>올바른 이메일 형식이 아닙니다.</span> }

      <label for="clickpwd2">Password</label>
      <input id="clickpwd2" type="password" placeholder="password" value={signUpInputInfo.password} onChange={validPassword}/>
      { signUpInputInfo.password === '' || signUpValid.password ? null : <span>알파벳, 숫자, 특수문자를 포함하여 8~20글자를 입력해주세요.</span> }
      
      <label for="clickpwdcheck">Password Check</label>
      <input id="clickpwdcheck" type="password" placeholder="password Check" value={signUpInputInfo.passwordCheck} onChange={validPasswordCheck}/>
      { signUpInputInfo.passwordCheck === '' || signUpValid.passwordCheck ? null : <span>비밀번호와 일치하지 않습니다.</span> }

      <label for="clicknickname">Nickname</label>
      <input id="clicknickname" type="nickname" placeholder="nickname" value={signUpInputInfo.nickname} onChange={validNickName}/>
      { signUpInputInfo.nickname === '' || signUpValid.nickname  ? null : <span>닉네임은 공백제외 2글자 이상 10글자 이하여야 합니다.</span> }
    </InputWrap>
  )
}

export default Input;