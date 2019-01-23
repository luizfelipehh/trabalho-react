import React, { Component } from 'react';
import CadastroPage from '../components/FormCadastro';
import FormLogin from '../components/FormLogin';
import {login} from '../components/Api';
import {setAutenticado } from '../utils/LoginManager';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {cadastro:false};

    this.cadastro = () => {
      this.setState({cadastro:true});
    }

    this.cancela = () => {
      this.setState({cadastro:false});
    }

    this.onLogin = (dados) => {
      login(dados)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('id',res.data.usuario.id);
        setAutenticado(true);
        this.setState({aut:true});
        this.setState({erros:null});
        props.LoginLogout();
      })
      .catch(err => {
        this.setState({erros:err.response.data});
      });
    }


  }

  render() {
    const {cadastro} = this.state;

    if (cadastro) {
      return (<CadastroPage onLogin={this.onLogin} cancela={this.cancela} />)
    } else {
      return (<FormLogin cadastro={this.cadastro} onLogin={this.onLogin} erros={this.state.erros} />)
    }

  }
}

export default Login;