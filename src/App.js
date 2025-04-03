import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './components/MenuComponent';
import {DISHES} from './shared/dishes';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux'; 
import { ConfigureStore } from './redux/configureStore'; 
import Main from './components/MainComponent';

const store = ConfigureStore();

class App extends Component {
 

  render() { 
    return ( 
      <Provider store={store}>
        <BrowserRouter>
          <div> 
            <Main />
          </div> 
        </BrowserRouter>
      </Provider>
      
    )
  } 
}

export default App;
