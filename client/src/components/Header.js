import { Link } from 'react-router-dom'
// import { Nav, , NavDropdown, Container, Navbar } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react'
import styled from 'styled-components'
import Symbol from '../assets/images/Symbol.svg';

const StyledHeader = styled.header`
  height: 10vh;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  > .profile {
    width: 10vh;
    height: 4vh;
    line-height: 4vh;
  }
  img {
    height: 8vh;
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

export default function Header ({isLogedIn}) {
  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(!show);
  }
  const hideDropdown = () => {
    setShow(false);
  }
  // 프로필 이미지(api 랜덤이미지), 닉네임
  // hover => drop down 기능 구현
  return <StyledHeader className="header">
    <div>
      <Link to='/' className="logo"><img src={Symbol} alt="Symbol" /></Link>
    </div>
    <div className="profile" onMouseLeave={hideDropdown} show={show}
      onMouseEnter={showDropdown}>
      <div><Link to='/signin'>Sing In</Link>
        {isLogedIn ? show ? 
        <ul>
          <li><Link to="/mypage">MyPage</Link></li>
          <li><Link to='/'>LogOut</Link></li>
        </ul>
        : null : null}
      </div>
    </div>
  </StyledHeader>
};