import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './Components/Layout/Navbar'
import Dashboard from './Components/Dashboard/Dashboard'
import Home from './Components/Pages/Home'
import Details from './Components/Proyects/Details'
import List from './Components/Proyects/List'
import Login from './Components/Auth/SignIn'
import Register from './Components/Auth/SignUp'
import Create from './Components/Proyects/Create'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path='/proyectos' component={List}/>
        <Route exact path='/proyectos/nuevo' component={Create}/>
        <Route path="/proyectos/:id" component={Details} />
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
