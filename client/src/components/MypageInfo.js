import { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import Modal from 'react-modal';
import axios from 'axios';
import { FaTimes } from 'react-icons/fa';

const InfoWrap = styled.div`
  >img {
    width: 30vh;
    height: 30vh;
    border-radius: 50%;
    border: 1px solid #eee;
  }
  >div {
    margin-top: 0.2rem;
    font-size: 1.4rem;
    font-weight: bold;
  }
  >button {
    margin: 0.5rem;
    padding: 0.4rem 1rem;
    color: #fff;
    font-weight: bold;
    background: #387099;
    box-sizing: border-box;
  }
  >button:hover {
    background: #EDC51E;
  }
`
const ContentWrap = styled.div`
  height: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const ContentBox = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    padding: 0.2rem 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  input:focus {
    border: 1px solid #EDC51E;
    outline: 1px solid #EDC51E;
  }
  >img {
    width: 10vh;
    height: 10vh;
    margin-bottom: 1rem;
    border-radius: 50%;
    border: 3px solid #387099;
  }
`
const ImgWrap = styled.div`
  overflow: auto;
  margin-bottom: 1.5rem;

  img:hover {
    border: 2px solid #EDC51E;
  }

`
const Img = styled.img`
  width: 5rem;
  height: 5rem;
  margin: 0.5rem;
  border-radius: 50%;
  border:  2px solid #eee;
`
const CloseBtn = styled.div`
  font-size: 1.5rem;
  position: absolute;
  top: 0.3rem;
  right: 1rem;
  cursor: pointer;
  
  &:hover {
    color: #EDC51E;
  }
`
const BtnWrap = styled.div`
  display: flex;
`
const ReSignBtn = styled.button`
  flex: 1 0 0;
  margin-left: 1rem;
  padding: 0.4rem 0;
  color: #ffffff;
  font-weight: bold;
  letter-spacing: 0.2rem;
  background: #387099;
  border: 0.2rem solid #387099;

  &:hover {
    color: #EDC51E;
    background: #fff;
    border: 0.2rem solid #EDC51E;
  }
  &:active {
    color: red;
    background: #fff;
    border: 0.2rem solid red;
  }
`
const CancelBtn = styled.button`
  flex: 1 0 0;
  padding: 0.2rem 0;
  color: #ffffff;
  font-weight: bold;
  letter-spacing: 0.2rem;
  background: #888;
  border: 0.2rem solid #888;

  &:hover {
    color: #888;
    background: #fff;
    border: 0.2rem solid #888;
  }
`

export default function MypageInfo ({ isLogedInhandler }) {
  const newInputInfo = JSON.parse(localStorage.getItem('userInfo'))
  const [reSignIsOpen, setReSignIsOpen ] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [editNewNickname, setEditNewNickname] = useState('')
  const [validNickname, setValidNickname] = useState(false)
  const [isExistNickname, setIsExistNickname] = useState(false)
  const [selectImg , setSelectImg] = useState(newInputInfo.image.split("/")[3].split('.')[0])

  const history = useHistory()
  
  const reSignModalhandler = () => {
    setReSignIsOpen(!reSignIsOpen)
  }

  const editModalhandler = () => {
    setEditIsOpen(!editIsOpen)
  }
  
  const editNewNicknameHandler = (e) => {
    setEditNewNickname(e.target.value)
    const nicknameExp = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

      if (!nicknameExp.test(e.target.value)) {
        setValidNickname(false)
        //이 상태일떄는 유효성 검사를 통과하지 않았으므로 유효성 통과하라는 메시지를 띄워줘야함.
      }
      else {
        //서버에 axios포스트로 중복되었는지 봐야됨.
        axios.post('/api/validate/nickname', { nickname : e.target.value}, config)
        .then(res => {
          setIsExistNickname(false)
          setValidNickname(true)
        })
        .catch(err => {
          setIsExistNickname(true)
        })
      }
  }

  const selectImgHanlder = (e) => {
    setSelectImg(e.target.dataset.name)
  }
  
  const reSignhandler = () => {
    axios.delete('/api/users/profile', {
      headers: {
        Authorization: `Bearer ${newInputInfo.token}`,
        'Content-Type': 'application/json',
      }}
      )
      .then(res => {
        reSignModalhandler()
        isLogedInhandler()
        localStorage.removeItem('userInfo')
      }).catch(err=> console.log(err))
  }

  const editUserInfoHandler = () => {
    //setIsExistNickname (true))이거나 selectImg 상태 (true) 일때 아니면 둘다 true 일때 작동하게끔 해야됨.
    
    if(editNewNickname === '' && !isExistNickname && selectImg !== newInputInfo.image.split("/")[3].split('.')[0]){
      //이미지만 변경한 경우 닉네임 변경하지 않음.
      axios.put('/api/users/profile', 
      {
        image : `/images/users/${selectImg}.jpeg`,
        nickname : newInputInfo.nickname
      }, {
        headers: {
          Authorization: `Bearer ${newInputInfo.token}`,
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        console.log(1)
        console.log(res.data)
        setEditIsOpen(false)
        //닉네임이랑 image가 찍혀있었음. 기존꺼 에서 닉네임하고 이미지만 바꿔서 저장해주면 됨.
        localStorage.setItem('userInfo', JSON.stringify({...newInputInfo, image:res.data.image}))
        window.location.reload()
      })
      .catch(err => {
        
      })
    }
    else if (editNewNickname !== '' && !isExistNickname && validNickname) {
      axios.put('/api/users/profile', 
      {
        image : `/images/users/${selectImg}.jpeg`,
        nickname : editNewNickname
      }, {
        headers: {
          Authorization: `Bearer ${newInputInfo.token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(res => {
        console.log(2)
        console.log(res.data)
        setEditIsOpen(false)
        localStorage.setItem('userInfo', JSON.stringify({...newInputInfo, image:res.data.image, nickname: res.data.nickname}))
        window.location.reload()
      })
    }
  }

  // Advanced: 회원정보수정 또는 탈퇴 클릭시 비밀번호 입력 후 진행하도록 플로우 수정
  return <InfoWrap>
    <img src={JSON.parse(localStorage.getItem('userInfo')).image} alt="유저이미지"/>
    <div>{JSON.parse(localStorage.getItem('userInfo')).nickname}</div>
    
{/************ 회원정보 수정 모달창 ************/}
    { editIsOpen 
    ? <Modal isOpen={editIsOpen} onRequestClose={editModalhandler}  ariaHideApp={false} contentLabel="Selected Option"
    style={{
      overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      },
      content: {
        width: '50vw',
        height: '50vh',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '0',
        position: 'relative',
        inset: '0'
      }
    }}>
      <CloseBtn onClick={editModalhandler}><FaTimes /></CloseBtn>
      <ContentWrap>
        {/* 이미지 */}
        <ContentBox>
          <ImgWrap>
            {Array(8).fill().map((v,i) => i+1).map((el) => {
              return <Img src={`/images/users/${el}.jpeg`} alt="프로필 이미지" key={el} data-name={el} onClick={selectImgHanlder}/>
            })}
          </ImgWrap>
          {/* input */}
          <img src={`/images/users/${selectImg}.jpeg`} alt="프로필 이미지" />
          <input type="nickname" placeholder="Edit New Nickname" value={editNewNickname} onChange={editNewNicknameHandler}/>
          { editNewNickname === '' || validNickname  ? null : <span>닉네임은 공백제외 2글자 이상 10글자 이하여야 합니다.</span> }
          { isExistNickname ? <span>중복된 닉네임입니다.</span> : null}
        </ContentBox>
        <BtnWrap>
          <CancelBtn onClick={editModalhandler}>Cancle</CancelBtn>
          <ReSignBtn onClick={editUserInfoHandler} >OK</ReSignBtn>
        </BtnWrap>
      </ContentWrap>
    </Modal>
  : <button onClick={editModalhandler}>정보수정</button>
    }
    
{/************ 탈퇴 요청 모달창 ************/}
    { reSignIsOpen 
    ? <Modal isOpen={reSignIsOpen} onRequestClose={reSignModalhandler}  ariaHideApp={false} contentLabel="Selected Option"
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        },
        content: {
          width: '40vw',
          height: '30vh',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '0',
          position: 'relative',
          inset: '0'
        }
      }}>
        <CloseBtn onClick={reSignModalhandler}><FaTimes /></CloseBtn>
        <ContentWrap>
          <ContentBox><span>탈퇴 시 게시글도 모두 삭제됩니다.<br />탈퇴하시겠습니까?</span></ContentBox>
          <BtnWrap>
            <CancelBtn onClick={reSignModalhandler}>Cancel</CancelBtn>
            <ReSignBtn onClick={reSignhandler}>ReSign</ReSignBtn>
          </BtnWrap>
        </ContentWrap>
      </Modal>
    : <button onClick={reSignModalhandler}>회원탈퇴</button> }
  </InfoWrap>
};
