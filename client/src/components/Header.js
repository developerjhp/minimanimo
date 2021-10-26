import { Link } from 'react-router-dom'
// import { Nav, , NavDropdown, Container, Navbar } from 'react-bootstrap'
// import { LinkContainer } from 'react-router-bootstrap';
import { useState } from 'react'
import styled from 'styled-components'

const StyledHeader = styled.header`
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: start;

  li {
    padding: 2px 0px;
    text-align: center;
  }
`

export default function Header () {
  const [show, setShow] = useState(false);
  const showDropdown = () => {
    setShow(!show);
  }
  const hideDropdown = () => {
    setShow(false);
  }
  // 프로필 이미지, 닉네임
  // hover => drop down 기능 구현
  return <StyledHeader className="header">
    <div>
      <Link to='/' className="logo">Minimanimo</Link>
    </div>
    <div className="profile" onMouseLeave={hideDropdown} show={show}
      onMouseEnter={showDropdown}>
      <div>hover 영역
    {show ? 
    <ul>
      <li><Link to="/mypage">Mypage</Link></li>
      <li>Logout</li>
    </ul>
    : null }
    </div>
    </div>
  </StyledHeader>
};