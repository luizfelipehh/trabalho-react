import React from 'react';
import { Nav, NavItem} from 'reactstrap';
import {
  Link,
  withRouter,
} from 'react-router-dom';

const Menu = (props) => {
    return (
        <div>
        <Nav>
            <NavItem>
                <Link className="nav-link" to="/"> Usuário </Link>
            </NavItem>

            <NavItem>
                <Link className="nav-link" to="/tarefas"> Tarefas </Link>
            </NavItem>

            <NavItem>
                <Link className='nav-link' to='/' onClick={()=>{props.LoginLogout()}}>Sair</Link>
            </NavItem>
        </Nav>
        </div>
    );

}

export default withRouter(Menu);