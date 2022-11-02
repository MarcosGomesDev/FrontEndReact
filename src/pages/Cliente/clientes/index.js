import React, { Component } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { Link } from 'react-router-dom';
import './Clientes.css';

export default class Main extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            cliente: [],
            erro: null
        };
    }

    componentDidMount () {/*Aparentemente verifica o componente td vez q foi montado pra ver se n tem nenhum erro*/
        fetch(`https://pobrs-api.herokuapp.com/sistema/clientes`)
            .then(cliente =>
                cliente.json().then(cliente => this.setState({ cliente }))
                )
                .catch(erro => this.setState({ erro }))
    }

    render () {
        const { cliente } = this.state;

        return(
            <>
            <div className="Clientes-Options">
                <Link to={`/criarCliente`}><button className="newclient">Novo Cliente</button></Link>
            </div>
            
            <body>
                {cliente.map((cliente, index) => (

                    <div className="cliente-list">
                        <div key={index} className="cards">                            
                            <article key={cliente._id}>
                                <div className="content-client">
                                    <h3>{cliente.nome}</h3>
                                    <h4>ID - {cliente.idCliente}</h4>
                                </div> 
                                    <div className="controls-client">                        
                                        <Link to={`/clientes/${cliente.idCliente}`}>
                                            <button className="btn-details">Clique para detalhes</button>
                                        </Link>
                                        <Link to={`/novoPedido`}>
                                            <button className="btn-pedido">Adicionar Pedido</button>
                                        </Link>
                                        <Link to={`/pedidos/${cliente.idCliente}`}>
                                            <button className="btn-show">Mostrar Pedidos</button>
                                        </Link>
                                        <Link to={`/deleteCliente/${cliente.idCliente}`}>
                                            <button className="btn-deletar">Deletar</button>
                                        </Link>
                                    </div>
                            </article>
                        </div>
                    </div>
                ))}
            </body>
            </>
        )
    };
}