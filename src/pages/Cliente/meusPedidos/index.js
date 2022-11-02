import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './meusPedidos.css';

export default class Pedidos extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            pedido: [],
            erro: null
        };
    }

    componentDidMount () {/*Aparentemente verifica o componente td vez q foi montado pra ver se n tem nenhum erro*/
        fetch(`${process.env.REACT_APP_API_URL}/sistema/meusPedidos`)
            .then(pedido =>
                pedido.json().then(pedido => this.setState({ pedido }))
                )
                .catch(erro => this.setState({ erro }))
    }

    render () {
        const { pedido } = this.state;
        return pedido.map((pedido, index) => (
                <div className="pedido-list">
                    <div key={index} className="cards-pedidos">
                        <h3 className="card-header">{pedido.nomeProd}</h3>
                        <article key={pedido._id}>
                            <p> Preço: R$ {pedido.precoVenda}</p>
                        </article>
                        <Link to={`/deletePedido/${pedido.idPedido}`}>
                        <button type="button" class="btn-danger btn-outline-danger">Deletar Pedido</button>
                        </Link>
                    </div>
                </div>
        ))
    };
}