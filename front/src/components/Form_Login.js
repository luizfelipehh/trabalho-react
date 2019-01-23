import React, {Component} from 'react';
import {Button, Input, Alert} from 'reactstrap';

class Form_Login extends Component {

    constructor(props){
        super(props);

        this.state = {};

        this.onLoginClick = () => {
            const {email,senha} = this.state;
            this.props.onLogin({email,senha});
        }
          
        this.onInputChange = event => {
            const { name, value } = event.target;
            this.setState({
                [name]:value
            });
        }

    }
    
    render(){
        
        return (
            <div className="login-page">
        <h1>Login</h1>

        <Input type="text" name="email" placeholder="email" onChange={this.onInputChange}/>
        <Input type="password" name="senha" placeholder="senha" onChange={this.onInputChange} />

        <center>
        {this.props.erros && <Alert color='danger'> {this.props.erros} </Alert> }
        <Button outline color="success" onClick={this.onLoginClick}> entrar </Button> 
        <Button outline color="primary" onClick={this.props.cadastro}> cadastro </Button> 
        </center>

            
        </div>
        );
        
    }
    
}   
    

export default Form_Login;