import Header from '../components/Header';

const Mypage = ({ isLogedIn, isLogedInhandler }) => {
  //마이페이지에 처음 들어오면 서버에 get요청을 보내서 내 정보와 내가쓴글을 다 받아와야함.
  return <>
    <Header isLogedIn={isLogedIn} isLogedInhandler={isLogedInhandler} />
  </>
}

export default Mypage;