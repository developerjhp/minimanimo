import { Link } from 'react-router-dom'
// import { Nav, , NavDropdown, Container, Navbar } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react'
import styled from 'styled-components'
import Symbol from '../assets/images/Symbol.svg';
import { useHistory } from 'react-router-dom';

const StyledHeader = styled.header`
  height: 10vh;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  > .profile {
    height: 4vh;
    line-height: 4vh;
  }
  img {
    height: 8vh;
  }
  .userinfo {
    font-size: 1.2rem;
    font-weight: bold;
  }
  .profile_img {
    margin-right: 1rem;
    height: 5vh;
    border: 1px solid #eee;
    border-radius: 50%;
  }

  ul {
    font-size: 1rem;
    font-weight: normal;
    background: rgba(255, 255, 255, 0.8);
  }

  li {
    width: 10vh;
    text-align: center;
    line-height: 2;
    border: 1px solid #eee;
    cursor: pointer;
  }
  li:hover {
    background: #eee;
  }
`

export default function Header({ isLogedIn, isLogedInhandler }) {

  const history = useHistory();

  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(!show);
  }
  const hideDropdown = () => {
    setShow(false);
  }

  const logOutHandler = () => {
    // 로그아웃 -> localStorage 삭제
    localStorage.removeItem('userInfo');
    isLogedInhandler();
    history.replace('/')
    alert("로그아웃이 완료되었습니다.")
  }

  // 프로필 이미지(api 랜덤이미지), 닉네임
  // hover => drop down 기능 구현
  return <StyledHeader className="header">
    <div>
      <Link to='/' className="logo"><img src={Symbol} alt="Symbol" /></Link>
    </div>
    <div className="profile" onMouseLeave={hideDropdown} show={show}
      onMouseEnter={showDropdown}>
      <div className="userinfo">
        {isLogedIn
          ? <div>
              <img className="profile_img" src={isLogedIn ? JSON.parse(localStorage.getItem('userInfo')).image : '/images/users/1.jpeg'} alt="프로필 이미지" />
              {JSON.parse(localStorage.getItem('userInfo')).nickname}
            </div>
          : <Link to='/signin'>Sign in</Link>
        }
        {isLogedIn && show ?
          <ul>
            <li><Link to="/mypage">MyPage</Link></li>
            <li><Link to='/' onClick={logOutHandler}>LogOut</Link></li>
          </ul>
          : null}
      </div>
    </div>
  </StyledHeader>
};