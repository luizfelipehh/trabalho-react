import React,{Component} from 'react';
import {Alert, Input, Button, InputGroup} from 'reactstrap';
import { FaUserAlt,FaAt,FaMoneyCheck,FaKey,FaCalendarAlt  } from "react-icons/fa";
import {cadUsuario} from '../components/Api';


class Form_Cadastro extends Component {

    constructor(props){
        super(props);
        this.state = {};

        this.onSubmit = (e) => {
            cadUsuario(this.state)
            .then(res => {
              let {email, senha} = this.state;
              let dados = {email,senha};
              this.props.onLogin(dados);
            })
            .catch(err => {
              let erros = []
              Object.values(err.response.data.validationErrors).map(err => erros.push(err))
              this.setState({erros})
            })
          }
        
        this.onChange = (e) => {
            this.setState({[e.target.name]:e.target.value});
        }
    } 

    render(){
        const {erros} = this.state;
        return (
            <div>
                <h1>Novo Cadastro</h1>
           <InputGroup>
            <label><FaUserAlt /></label>
            <Input placeholder="nome" name="nome" type="text" onChange={this.onChange} required />
            </InputGroup>

            <InputGroup>
            <label><FaAt /></label>
            <Input placeholder="e-mail" name="email" type="email" onChange={this.onChange} required />
            </InputGroup>

            <InputGroup>
            <label><FaMoneyCheck /></label>
            <Input placeholder="cpf" name="cpf" type="text" onChange={this.onChange} required />
            </InputGroup>

            <InputGroup>
            <label><FaCalendarAlt /></label>
            <Input placeholder="data de nascimento" name="nascimento" type="date" onChange={this.onChange} required />
            </InputGroup>

            <InputGroup>
            <label><FaKey /></label>
            <Input placeholder="senha" name="senha" type="password" onChange={this.onChange} required />
            </InputGroup>

            {
                  erros !== undefined && erros.length > 0 && (
                      <Alert color="danger"> 
                          { erros.map(erro => <p>{erro.msg}</p> ) }
                      </Alert>
                  )
            }
            <center>
            <Button outline color="success" onClick={this.onSubmit}>Cadastrar</Button>
            <Button outline color="danger" onClick={this.props.cancela}>Cancelar</Button>
            </center>

       </div>
    )
    }
}

export default Form_Cadastro;