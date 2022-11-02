import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './detalhesC.css';

export default class Cliente extends Component {
    state = { /*PQ AQUI DIFERENTE DO QUE MOSTRA TODOS OS CLIENTES É SÓ STATE E NÃO UM CONSTRUTOR*/
        cliente: {},
    };

    componentDidMount () {/*Aparentemente verifica o componente td vez q foi montado pra ver se n tem nenhum erro*/
        const { id } = this.props.match.params; /*Pesquisar sobre esse tipo*/
        
        fetch(`${process.env.REACT_APP_API_URL}/sistema/clientes/${id}`)
            .then(cliente =>
                cliente.json().then(cliente => this.setState({ cliente }))
                )
                .catch(erro => this.setState({ erro }))
    }

    render () {
        const { cliente, index } = this.state;

        /*if (cliente.telefone <= 0){
            cliente.telefone = "000000"
        }*/

        return (
            <div className="base-details">
                <div className="cliente-info">
                <h1 className="info-nome">{cliente.nome}</h1>
                <p className="info-id">ID: {cliente.idCliente}</p>
                <p className="info-ende">Endereço: {cliente.end}</p>
                <p className="info-email">Email: {cliente.email}</p>
                <p className="info-tel">Telefone: {cliente.telefone}</p>
                <p className="info-CPF">CPF: {cliente.cpf}</p>
                <p className="info-CEP">CEP: {cliente.cep}</p>
                <Link to={`/editarCliente/${cliente.idCliente}`}>
                    <button className="btn-edit">Editar Dados</button>
                </Link>
                <Link to={`/clientes`}>
                    <button className="btn-back">Voltar</button>
                    </Link>
                </div>
            </div>
        )
    };
}