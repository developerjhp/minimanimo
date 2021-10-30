import Header from '../components/Header';
import BoardInput from '../components/BoardInput';
import BoardList from '../components/BoardList';

const Main = ({ isLogedIn, isLogedInhandler }) => {
  return <>
    <Header isLogedIn={isLogedIn} isLogedInhandler={isLogedInhandler} />
    <BoardInput isLogedIn={isLogedIn} />
    <BoardList isLogedIn={isLogedIn} />
  </>
}

export default Main;