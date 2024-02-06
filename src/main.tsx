import { render } from 'preact'
import './index.css'

import Router, { Route } from 'preact-router'

import User from './components/All/User';
import ControlPanel from './components/All/ControlPanel';
import { auth, role } from './components/helpers/middleware';
import Navbar from './components/All/Navbar';
import Dasboard from './components/Admin/Dasboard';
import Selling from './components/All/Selling';
import Casier from './components/All/Casier';


function App() {

  return (
    <Router>
      {/* @ts-ignore */}
      <User path="/user"/>

      {/* Need auth */}
      <Router onChange={auth()} path='/'>
        {/* @ts-ignore*/}
        <ControlPanel path="/control-panel"/>

        <Router path='/:role' onChange={role}>
          {/* @ts-ignore */}
          <Navbar path="*" />

          {/* @ts-ignore */}
          <Dasboard path="/dasboard" />

          {/* @ts-ignore */}
          <Selling path="/sold" />

          {/* @ts-ignore */}
          <Casier />

        </Router>
      </Router>

      <Route path="*" component={()=><></>}/>
    </Router>
   )
 }

render(<App />, document.getElementById('app')!)
