import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './Components/Layout/Navbar'
import MobileSpacing from './Components/Layout/MobileSpacing'
import Dashboard from './Components/Dashboard/Dashboard'
import Profile from './Components/Pages/Profile'
import Proyectos from './Components/Dashboard/Proyectos'
import Home from './Components/Pages/Home'
import RestaurantesLista from './Components/Pages/RestaurantesLista'
import Details from './Components/Proyects/Details'
import RestauranteDetalles from './Components/Pages/RestauranteDetalles'
import ProductoDetalles from './Components/Productos/Detalles'
import Login from './Components/Auth/SignIn'
import Register from './Components/Auth/SignUp'
import Recovery from './Components/Auth/Recovery'
import Create from './Components/Proyects/Create'
import Editar from './Components/Proyects/Edit.js'
import Productos from './Components/Productos/Agregar'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <MobileSpacing />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path='/proyectos' component={Proyectos}/>
        <Route exact path='/proyectos/nuevo' component={Create}/>
        <Route path="/proyectos/:id" component={Details} />
        <Route path="/editar/:id" component={Editar} />
        <Route path="/recovery" component={Recovery} />
        <Route path="/productos" component={Productos} />
        <Route exact path="/restaurantes" component={RestaurantesLista} />
        <Route exact path="/restaurantes/:id" component={RestauranteDetalles} />
        <Route exact path="/restaurantes/:id/:productoid" component={ProductoDetalles} />
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
