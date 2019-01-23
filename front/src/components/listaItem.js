import React, {Component} from 'react';
import {Button} from 'reactstrap';
import { FaPencilAlt, FaRedo, FaTrash, FaTimes, FaSave} from "react-icons/fa";


class listaItem extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            edit: false, 
            titulo: props.tarefa.titulo,
            descricao: props.tarefa.descricao,
            status: props.tarefa.concluida,
        };

        this.removeTarefa = () => {
            this.props.removeTarefa(this.props.tarefa.id);
        }

        this.editarTarefa = () => {           
            const id = this.props.tarefa.id;
            const {titulo, descricao} = this.state;
            this.props.editarTarefa(id, {titulo, descricao});
            this.setState({edit:false});
        }

        this.abrirForm = () => {
            this.setState({edit: true});
        }

        this.fecharForm = () => {
            this.setState({edit: false});
        }

        this.onChange = (ev) => {
            this.setState({[ev.target.name]: ev.target.value});
        }

        this.alterarEstado = () =>{
            if (this.state.status === 1 ){
                this.setState({status:0});
            } else {
                this.setState({status:1});
            }
            this.props.alterarEstado(this.props.tarefa.id, this.props.tarefa.concluida);
        }

    } 
    
    render(){


        if (!this.state.edit){
            return (
                <tr>
                    <td className={`cor-${this.state.status}`}>
					  {this.props.index+1}
					</td>
                    <td className={`cor-${this.state.status}`}>
						{this.props.tarefa.titulo}
					</td>
					
                    <td className={`cor-${this.state.status}`}>
					  {this.props.tarefa.descricao}
					</td>
					
                    <td className='btn-table'>
                        <Button outline size='sm' color='primary' title='alterar estado' onClick={this.alterarEstado}>
							<FaRedo />
						</Button>
                        <Button outline size='sm' color='warning' title='editar' onClick={this.abrirForm}>
						  <FaPencilAlt />
						</Button>
                        <Button outline size='sm' color='danger' title='deletar' onClick={this.removeTarefa}>
						  <FaTrash />
						</Button>
                    </td>
                </tr>
                );
        }
        return (
            <tr>
                <td className={`cor-${this.state.status}`}>
				{this.props.index+1}
				</td>
				
                <td>
					<input class='input-table' name="titulo" value={this.state.titulo} onChange={this.onChange} />
				</td>
				
                <td>
				  <input class='input-table' name="descricao" value={this.state.descricao} onChange={this.onChange} />
				</td>
				
                <td>                
                    <Button outline size='sm' color='primary' title='alterar estado' onClick={this.alterarEstado}>
						<FaRedo />
					</Button>
					
                    <Button outline size='sm' color='success' title='salvar' onClick={this.editarTarefa}>
						<FaSave />
					</Button>
					
                    <Button outline size='sm' color='danger' title='cancelar' onClick={this.fecharForm}>
						< FaTimes />
					</Button>
                </td>
            </tr>
        );
    }

}

export default listaItem;