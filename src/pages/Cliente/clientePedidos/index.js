import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './clientePedidos.css';

export default class PedidoCliente extends Component {
    state = { /*PQ AQUI DIFERENTE DO QUE MOSTRA TODOS OS CLIENTES É SÓ STATE E NÃO UM CONSTRUTOR*/
        pedido: [],
        erro: null
    };

    componentDidMount () {/*Aparentemente verifica o componente td vez q foi montado pra ver se n tem nenhum erro*/
        const { idCliente } = this.props.match.params; /*Pesquisar sobre esse tipo*/
        
        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos/${idCliente}`)
            .then(pedido =>
                pedido.json().then(pedido => this.setState({ pedido }))
                )
                .catch(erro => this.setState({ erro }))
    }

    render () {
        const { pedido, index } = this.state;
        
        return (
            <>
            <body>
                {pedido.map((pedido, index) => (
                
                    <div className="info-base">
                        <div className="pedido-info">
                        <h2>Pedido Cliente</h2>
                            <h1>Produto: {pedido.nomeProd}</h1>
                            <h3>ID Cliente: {pedido.idCliente}</h3>
                            <h3>Preço: R$ {pedido.precoVenda}</h3>
                            <Link to={`/clientes`}><button className="btn-pedido-infos">Voltar</button></Link>
                        </div>
                    </div>
                ))}
            </body>
            </>
        )
    };
}