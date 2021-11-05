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

  > .profile {
    height: 4vh;
    line-height: 4vh;
    margin-right: 18vw;
  }
  img {
    height: 8vh;
  }
  .test {
    margin-left: 18vw;
  }
  .userinfo {
    font-size: 1.2rem;
    font-weight: bold;
    position: relative;
  }
  .profile_img {
    margin-right: 1rem;
    height: 5vh;
    border: 1px solid #eee;
    border-radius: 50%;
  }

  ul {
    width: 100%;
    padding-top: 6vh;
    font-size: 1rem;
    font-weight: normal;
    position: absolute;
    top: 0;
    right: 0;
  }

  li {
    text-align: center;
    line-height: 2;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid #eee;
    cursor: pointer;
  }
  li:first-child {
    border-bottom: none;
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
  // Advanced: dropdown icon 삽입
  return <StyledHeader className="header">
    <div>
      <Link to='/' className="logo test"><img src={Symbol} alt="Symbol" /></Link>
    </div>
    <div className="profile" onMouseLeave={hideDropdown} show={show ? 1 : 0}
      onMouseEnter={showDropdown}>
      <div className="userinfo">
        {isLogedIn
          ? <div>
              <img className="profile_img" src={JSON.parse(localStorage.getItem('userInfo')).image} alt="프로필 이미지" />
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