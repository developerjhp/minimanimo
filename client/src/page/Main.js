import Header from '../components/Header';

const Main = ({ isLogedIn, isLogedInhandler }) => {
  return <>
    <Header isLogedIn={isLogedIn} isLogedInhandler={isLogedInhandler} />
  </>
}

export default Main;