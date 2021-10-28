import { useState } from 'react'; 
import styled from 'styled-components';

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

const Input = ({inputInfo, setInputInfo}) => {
  // TODO: 서버에 signin 요청 후 잘못됐을때 ValidText 표출 및 input outline 붉은색으로 변경

  const InputuserInfo = (e) => {
    if (e.target.type === 'email') {
      setInputInfo({ id: e.target.value, password: inputInfo.password })
    } else {
      setInputInfo({ id: inputInfo.id, password: e.target.value })
    }
  }

  return (
    <InputWrap>
      {/* 입력 내용 : 이메일, 비밀번호, 비밀번호 확인, 닉네임 */}
      {/* onChange => 유효성 검사 / focusOut => 이메일, 닉네임 중복확인 */}
      <label for="clickid">Email</label>
      <input id="clickid" type="email" placeholder="email" value={inputInfo.id} onChange={InputuserInfo}/>
      <label for="clickpwd">Password</label>
      <input id="clickpwd" type="password" placeholder="password" value={inputInfo.password} onChange={InputuserInfo}/>
    </InputWrap>
  )
}

export default Input;