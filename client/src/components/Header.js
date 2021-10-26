import { Link } from 'react-router-dom'

export default function Header () {
  return <header>
    <Link to='/main'>Minimanimo</Link>
    <div>
      {/* 프로필 이미지, 닉네임 */}
      {/* hover => drop down 기능 구현 */}
    </div>
    <ul className="nav">
      <li><Link to="/mypage">Mypage</Link></li>
      <li>Logout</li>
    </ul>
  </header>
}