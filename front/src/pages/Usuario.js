import React, { Component } from 'react'
import {Input, Button, InputGroup} from 'reactstrap'
import {getUsuario,  editarUsuario} from '../components/Api'
import { FaUserAlt,FaAt,FaMoneyCheck,FaKey,FaCalendarAlt  } from "react-icons/fa";


class Usuario extends Component {

    constructor(){

      super();

      this.state = {
        usuario:[],
        edit: false,
        id: localStorage.getItem('id'),
      }

      this.dadosUsuario = () => {
        getUsuario(this.state.id)
        .then(res => this.setState({usuario:res.data}));
      } 

      this.editar = () => {
        this.setState({edit:true});
        document.getElementById('nome').disabled = false;
        document.getElementById('email').disabled = false;
        document.getElementById('cpf').disabled = false;
        document.getElementById('nascimento').disabled = false;
      }

      this.cancela = () => {
        this.setState({edit:false});
        this.dadosUsuario();
        document.getElementById('nome').disabled = true;
        document.getElementById('email').disabled = true;
        document.getElementById('cpf').disabled = true;
        document.getElementById('nascimento').disabled = true;
      }

      this.onChange = (e) => {
        let {usuario} = this.state;
        usuario[e.target.name] = e.target.value;
        this.setState({usuario:usuario});  
      }

      this.onSubmit = () => {
        editarUsuario(this.state.usuario);
        this.setState({edit:false});
        this.cancela();
      }

    }

    componentDidMount(){
      this.dadosUsuario();
      this.cancela();
    }
  
    render() {
      
      const {usuario, edit} = this.state;

    return (
      <div>

        <h1>Dados do Usuário</h1>

        <InputGroup>
        <label><FaUserAlt /></label>
          <Input type="text" id="nome" name="nome" value={usuario.nome} onChange={this.onChange} />
        </InputGroup>
        
        <InputGroup>
        <label><FaAt /></label>
          <Input type="email" id="email" name="email" value={usuario.email} onChange={this.onChange} />
        </InputGroup>
        
        <InputGroup>
        <label><FaMoneyCheck /></label>
          <Input name="cpf" id="cpf" value={usuario.cpf} onChange={this.onChange} />
        </InputGroup>
        
        <InputGroup>
        <label><FaCalendarAlt /></label>
          <Input type="date" id="nascimento" name="nascimento" value={usuario.nascimento} onChange={this.onChange} />
        </InputGroup>

        {
          edit && 
          <InputGroup>
          <label><FaKey /></label>
            <Input type="password" name="senha" value={usuario.senha} onChange={this.onChange} />
          </InputGroup>
        }

        <center>
        {
          !edit 
          ? <Button outline color="warning" onClick={this.editar}>editar</Button> 
          : 
          (<div><Button outline color="success" onClick={this.onSubmit}>salvar</Button>
          <Button outline color="danger" onClick={this.cancela}>cancelar</Button></div>)
        }
        </center>

      </div>
    )
  }
}

export default Usuario;