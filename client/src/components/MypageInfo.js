import styled from 'styled-components';

export default function MypageInfo () {
  
  return <>
    <img src={JSON.parse(localStorage.getItem('userInfo')).image}/>
    <div>{JSON.parse(localStorage.getItem('userInfo')).nickname}</div>
    <button>정보수정</button>
    <button>회원탈퇴</button>
  </>
};