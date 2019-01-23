import React, { Component } from 'react';
import Usuario from './Usuario';
import { isAutenticado } from '../utils/LoginManager';

class Home extends Component {

  constructor(props){
    super(props);
    this.state = {aut:isAutenticado(), erros:null};    
  }

  render() {
    return (<UsuarioPage />);
  }
}

export default Home;


