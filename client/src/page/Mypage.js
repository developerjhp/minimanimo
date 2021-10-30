import { Link } from 'react-router-dom'
import Header from '../components/Header';

const Mypage = ({ isLogedIn, isLogedInhandler }) => {
  return <>
    <Header isLogedIn={isLogedIn} isLogedInhandler={isLogedInhandler} />
  </>
}

export default Mypage;