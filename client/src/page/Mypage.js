import { Link } from 'react-router-dom'
import Header from '../components/Header';

const Mypage = ({ isLogedIn }) => {
  return <>
    <Header isLogedIn={isLogedIn}/>
  </>
}

export default Mypage;