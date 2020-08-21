import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navbar from './Components/Layout/Navbar'
import MobileSpacing from './Components/Layout/MobileSpacing'
import Home from './Components/Pages/Home'
import Profile from './Components/Pages/Profile'
import RestaurantesLista from './Components/Restaurante/RestaurantesLista'
import RestauranteDetalles from './Components/Restaurante/RestauranteDetalles'
import ProductoDetalles from './Components/Productos/Detalles'
import Login from './Components/Auth/SignIn'
import Register from './Components/Auth/SignUp'
import Recovery from './Components/Auth/Recovery'
import Agregar from './Components/Productos/Agregar'

// ADMIN
import Admin from './Components/Pages/Admin'
// import SignUpResto from './Components/Auth/SignUpResto'


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <MobileSpacing />
      </div>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route exact path="/admin" component={Admin} />
        {/* <Route path="/admin/restaurante" component={SignUpResto} /> */}
        
        <Route path="/recovery" component={Recovery} />
        <Route exact path="/productos/nuevo" component={Agregar} />
        <Route exact path="/restaurantes" component={RestaurantesLista} />
        <Route exact path="/restaurantes/:id" component={RestauranteDetalles} />
        <Route exact path="/restaurantes/:id/:productoid" component={ProductoDetalles} />
        
      </Switch>
    </BrowserRouter>
    
  );
}

export default App;
