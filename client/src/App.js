import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Main from './page/Main';
import Mypage from './page/Mypage';
import Signin from './page/Signin';
import Signup from './page/Signup';


const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path = '/'>
          <Main/>
        </Route>
        <Route path = '/signin'>
          <Signin/>
        </Route>
        <Route path = '/signup'>
          <Signup/>
        </Route>
        <Route path = '/mypage'>
          <Mypage/>
        </Route>
      </Switch>
    </BrowserRouter>
  )
}

export default App;