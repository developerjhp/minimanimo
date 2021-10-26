import { useHistory  } from 'react-router'

export default function Header () {
  const history = useHistory();
  return <>
    <h1>Minimanimo</h1>
    <ul>
      <li>Mypage</li>
      <li>로고</li>
      <li>로고</li>
    </ul>
  </>
}