import React, { Component } from 'react';
import { Container } from 'reactstrap';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

import './App.css';

import Home from './Home';
import Login from './Login';

import Menu from "../components/Menu";
import PrivateRoute from '../components/PrivateRoute';
import Tarefas from './Tarefas';

import { isAutenticado, setAutenticado } from '../utils/LoginManager';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {aut:isAutenticado()};

    this.logout = () => {
      setAutenticado(false);
      props.history.push('/');
      console.log('logout');
    }

    this.LoginLogout = () => {
      if (this.state.aut) {
        setAutenticado(false);
        this.setState({aut:false})
      } else {
        setAutenticado(true);
        this.setState({aut:true});
      }
    }

  }

  render() {
    return (
      <BrowserRouter>
        <Container>
          <header>
            <h1>Monitor de Tarefas </h1>
          </header>

          { 
            this.state.aut 
            ? 
            <div>
            <Menu LoginLogout={this.LoginLogout} />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <PrivateRoute path="/tarefas" component={TarefasPage} />
              <Route path="/login" exact component={LoginPage} />
              <Route render={()=>{
                return (
                  <div>Página não encontrada</div>
                );
              }} />
            </Switch>
            </div>
            : 
            <LoginPage LoginLogout={this.LoginLogout} />
          }
          
         

        </Container>
      </BrowserRouter>
    );
  }
}
export default App;