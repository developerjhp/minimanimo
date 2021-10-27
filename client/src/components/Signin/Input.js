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
const ValidText = styled.div`
  margin: 0 0 0.2rem 0.2rem;
  font-size: 0.8rem;
  color: #387099;
`

const Input = ({inputInfo, setInputInfo}) => {

  const InputuserInfo = (e) => {
    if (e.target.type === 'email') {
      setInputInfo({ id: e.target.value, password: inputInfo.password })
    } else {
      setInputInfo({ id: inputInfo.id, password: e.target.value })
    }
  }

  return (
    <InputWrap>
      <label for="clickid">Username or Email</label>
      <input id="clickid" type="email" placeholder="id(email)" value={inputInfo.id} onChange={InputuserInfo} />
      <label for="clickpwd">Password</label>
      <input id="clickpwd" type="password" placeholder="password" value={inputInfo.password} onChange={InputuserInfo} />
      <ValidText>&#42;아이디 또는 비밀번호가 잘못 입력 되었습니다. <br /><b>아이디</b>와 <b>비밀번호</b>를 정확히 입력해 주세요.</ValidText>
    </InputWrap>
  )
}

export default Input;