import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FaEdit, FaTrashAlt, FaCheckCircle } from 'react-icons/fa';

const BoardWrap = styled.div`
  height: 16vh;
  margin: 2rem 2rem 0;
  padding: 1.5rem;
  text-align: left;
  align-items: center;
  background: #fff;
  border-radius: 0.4rem;
  box-shadow: 0 0 0.4rem 0.2rem #eee;
  display: flex;
  flex-direction : row;
  position: relative;
  width: 60vw;

  &.delete {
    display: none;
  }
  
  img {
    width: 5rem;
    height: 5rem;
    border: 1px solid #eee;
    border-radius: 50%;
  }

  textarea {
    height: 10vh;
    resize: none;
    margin-left: 1rem;
    padding: 0;
    border: 1px solid #EDC51E;
  }
  
  textarea:focus {
    outline: 1px solid #EDC51E;
  }

  button {
    font-size: 1.2rem;
    color: #387099;
    margin-left: 0.5rem;
    background: none;
  }
  button:hover {
    color: #EDC51E;
  }
`
const ImgNickWrap = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex: 7;
  overflow: auto;
  word-wrap: break-word;
  `
const BtnWrap = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`
const Nickname = styled.div`
  height: 100%;
  margin: 0 1rem;
  font-weight: bold;
  flex: 1 0 0;
  margin-top: 0.2rem;
`
const Content = styled.div`
  height: 10vh;
  margin-left: 1rem;
  width: 46vw;
`
const CreatedAt = styled.div`
  font-size: 0.8rem;
  letter-spacing: 0.05rem;
  color: #CBCBCB;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
`

export default function Board({ isLogedIn, board }) {
  const [updatedAt, setUpdatedAt] = useState(board.updatedAt)
  const [editable, setEditable] = useState(false);
  const [editValue, setEditValue] = useState(board.content);
  const [canUSeeMe, setCanUSeeMe] = useState(true);
  //포스트 정보다 가져오기 API : /api/posts

  const [year, month, day] = updatedAt.split('-');
  const hour = day.split('T')[1].split(':')[0]
  const min = day.split('T')[1].split(':')[1]
  
  const [year2, month2, day2] = board.createdAt.split('-');
  const hour2 = day2.split('T')[1].split(':')[0]
  const min2 = day2.split('T')[1].split(':')[1]

  const editHandler = () => {
    setEditable(!editable)
  }
  const editValueHandler = (e) => {
    setEditValue(e.target.value);
  }
  
  const newInputInfo = JSON.parse(localStorage.getItem('userInfo'))

  const config = {
    headers: {
      Authorization: isLogedIn ? `Bearer ${newInputInfo.token}` : undefined,
      'Content-Type': 'application/json',
    },
  };

  const postAxios = () => {
    function dateFormat(date) {
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hour = date.getHours();
      let minute = date.getMinutes();
      let second = date.getSeconds();

      month = month >= 10 ? month : '0' + month;
      day = day >= 10 ? day : '0' + day;
      hour = hour >= 10 ? hour : '0' + hour;
      minute = minute >= 10 ? minute : '0' + minute;
      second = second >= 10 ? second : '0' + second;

      return date.getFullYear() + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second +'.777Z';
    }

    // console.log(dateFormat(new Date()))
    axios.put('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/posts/edit', { _id: board._id, content: editValue, updatedAt : dateFormat(new Date()) }, config)
      .then(res => {
        setEditable(!editable)
        setUpdatedAt(res.data.updatedAt)
      })
      .catch(err => {
        console.log(err);
      })
  }
  
  const deleteAxios = () => {
    axios.delete('http://ec2-3-37-98-188.ap-northeast-2.compute.amazonaws.com/api/posts/delete', {
      ...config,
      data: {_id : board._id} 
    })
      .then(res => {
        setCanUSeeMe(false)
      })
      .catch(err => {
        console.log(err)
      })
  }
  
  return <BoardWrap className={canUSeeMe ? '' : 'delete'}>
      <ImgNickWrap><img src={board.user.image} alt="프로필 이미지" />
        <Nickname >{board.user.nickname}</Nickname>
      </ImgNickWrap>
      <ContentWrap>
        {editable
        ? <textarea type="text" value={editValue} onChange={editValueHandler} maxLength={255}/>
        : <Content>{editValue}</Content>}
      </ContentWrap>
      {isLogedIn && board.user._id === JSON.parse(localStorage.getItem('userInfo'))._id
      ? <BtnWrap>
          {editable
          ? <button onClick={postAxios}><FaCheckCircle /></button>
          : <button onClick={editHandler}><FaEdit size='22'/></button>
        }
        <button onClick={deleteAxios}><FaTrashAlt /></button>
        </BtnWrap>
      : null}
      {!editable
      ? <CreatedAt>
        { board.createdAt === updatedAt 
        ? `작성일: ${year2}/${month2}/${day2.split('T')[0]} ${hour2}:${min2}`
        : `수정일: ${year}/${month}/${day.split('T')[0]} ${hour}:${min}`}
        </CreatedAt> 
      : null }
  </BoardWrap>
}


// import { useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { FaFeatherAlt, FaTrashAlt, FaCheckCircle } from 'react-icons/fa';

// const BoardWrap = styled.div`
//   height: 16vh;
//   margin: 2rem 2rem 0;
//   padding: 1.5rem;
//   text-align: left;
//   align-items: center;
//   background: #fff;
//   /* border-radius: 0.4rem; */
//   /* box-shadow: 0 0 0.4rem 0.2rem #eee; */
//   border-bottom: 1px solid #eee;
//   display: flex;
//   flex-direction : row;
//   position: relative;
//   width: 60vw;
//   padding-bottom: 4rem;
//   padding-top: 2rem;


//   &.delete {
//     display: none;
//   }
  
//   img {
//     width: 5rem;
//     height: 5rem;
//     border: 1px solid #eee;
//     border-radius: 50%;
//   }

//   textarea {
//     height: 10vh;
//     resize: none;
//     margin-left: 1rem;
//     padding: 0;
//     border: 1px solid #EDC51E;
//   }
  
//   textarea:focus {
//     outline: 1px solid #EDC51E;
//   }

//   button {
//     font-size: 1.2rem;
//     color: #387099;
//     margin-left: 1rem;
//     background: none;
//   }
//   button:hover {
//     color: #EDC51E;
//   }
// `
// const ContentWrap = styled.div`
//   display: flex;
//   flex-direction: column;
//   flex: 7;
//   overflow: auto;
//   word-wrap: break-word;
//   /* margin-left: 1rem; */
//   `
// const BtnWrap = styled.div`
//   position: absolute;
//   top: 0rem;
//   right: 5.2rem;
// `
// const Nickname = styled.div`
//   height: 100%;
//   /* margin: 0 1rem; */
//   margin-top: 0.2rem;
//   font-weight: bold;
//   /* flex: 1 0 0; */
//   text-align: center;
// `
// const Content = styled.div`
//   height: 14vh;
//   margin-left: 1rem;
//   /* width: 20vw; */
//   /* width: 300px; */
//   /* margin: 50px auto; */
//   background: #b42e24;
//   padding: 1rem;
//   text-align: center;
//   font-weight: 900;
//   color: #fff;
//   font-family: arial;
//   position:relative;
//   margin-right: 3rem;
//   border-radius: 0.5rem;
//   margin-left: 2.3rem;

//   &.sb1:before {
//   content: "";
//   width: 0px;
//   height: 0px;
//   position: absolute;
//   border-left: 1rem solid transparent;
//   border-right: 1rem solid #b42e24;
//   border-top: 1rem solid #b42e24;
//   border-bottom: 1rem solid transparent;
//   left: -2rem;
//   top: 2rem;
//   /* border-top: solid 1px; */
//   /* border-left: solid 1px; */
// }
// `
// const CreatedAt = styled.div`
//   font-size: 0.8rem;
//   letter-spacing: 0.05rem;
//   color: #444;
//   position: absolute;
//   bottom: 1rem;
//   right: 1rem;
// `

// const ImgNickWrap = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
// `

// export default function Board({ isLogedIn, board }) {
//   const [updatedAt, setUpdatedAt] = useState(board.updatedAt)
//   const [editable, setEditable] = useState(false);
//   const [editValue, setEditValue] = useState(board.content);
//   const [canUSeeMe, setCanUSeeMe] = useState(true);
//   //포스트 정보다 가져오기 API : /api/posts

//   const [year, month, day] = updatedAt.split('-');
//   const hour = day.split('T')[1].split(':')[0]
//   const min = day.split('T')[1].split(':')[1]
  
//   const [year2, month2, day2] = board.createdAt.split('-');
//   const hour2 = day2.split('T')[1].split(':')[0]
//   const min2 = day2.split('T')[1].split(':')[1]

//   const editHandler = () => {
//     setEditable(!editable)
//   }
//   const editValueHandler = (e) => {
//     setEditValue(e.target.value);
//   }
  
//   const newInputInfo = JSON.parse(localStorage.getItem('userInfo'))

//   const config = {
//     headers: {
//       Authorization: isLogedIn ? `Bearer ${newInputInfo.token}` : undefined,
//       'Content-Type': 'application/json',
//     },
//   };

//   const postAxios = () => {
//     function dateFormat(date) {
//       let month = date.getMonth() + 1;
//       let day = date.getDate();
//       let hour = date.getHours();
//       let minute = date.getMinutes();
//       let second = date.getSeconds();

//       month = month >= 10 ? month : '0' + month;
//       day = day >= 10 ? day : '0' + day;
//       hour = hour >= 10 ? hour : '0' + hour;
//       minute = minute >= 10 ? minute : '0' + minute;
//       second = second >= 10 ? second : '0' + second;

//       return date.getFullYear() + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':' + second +'.777Z';
//     }

//     // console.log(dateFormat(new Date()))
//     axios.put('http://localhost:3000/api/posts/edit', { _id: board._id, content: editValue, updatedAt : dateFormat(new Date()) }, config)
//       .then(res => {
//         setEditable(!editable)
//         setUpdatedAt(res.data.updatedAt)
//       })
//       .catch(err => {
//         console.log(err);
//       })
//   }
  
//   const deleteAxios = () => {
//     axios.delete('http://localhost:3000//api/posts/delete', {
//       ...config,
//       data: {_id : board._id} 
//     })
//       .then(res => {
//         setCanUSeeMe(false)
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }
  
//   return <BoardWrap className={canUSeeMe ? '' : 'delete'}>
//       <ImgNickWrap><img src={board.user.image} alt="프로필 이미지" />
//         <Nickname >{board.user.nickname}</Nickname>
//       </ImgNickWrap>
//       <ContentWrap>
//         {editable
//         ? <textarea type="text" value={editValue} onChange={editValueHandler} maxLength={255}/>
//         : <Content className='sb1'>{editValue}</Content>}
//       </ContentWrap>
//       {isLogedIn && board.user._id === JSON.parse(localStorage.getItem('userInfo'))._id
//       ? <BtnWrap>
//           {editable
//           ? <button onClick={postAxios}><FaCheckCircle /></button>
//           : <button onClick={editHandler}><FaFeatherAlt /></button>
//         }
//         <button onClick={deleteAxios}><FaTrashAlt /></button>
//         </BtnWrap>
//       : null}
//       {!editable
//       ? <CreatedAt>
//         { board.createdAt === updatedAt 
//         ? `작성일: ${year2}/${month2}/${day2.split('T')[0]} ${hour2}:${min2}`
//         : `수정일: ${year}/${month}/${day.split('T')[0]} ${hour}:${min}`}
//         </CreatedAt> 
//       : null }
//   </BoardWrap>
// }