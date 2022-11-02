import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Landscreen.css';
import Engrenagem from "./engrenagem.png";

export default class Main extends Component {

    render () {
        return (
            <div className="landing">
                <div className="title">
                    <h1> Painel de Controle</h1>
                </div> 
                <div className="rotate">
                    <img src={Engrenagem} width="30" height="30" />
                </div>
                <div className="base-controls">
                    <div className="controls">
                        <Link to="/sistema/clientes"><button className="control"> Clientes </button></Link>
                        <Link to="/produtos"><button className="control">Produtos Vitrine</button></Link>
                        <Link to="/pedidos"><button className="control">Pedidos</button></Link>
                    </div>
                </div>
            </div>
        )
    };
}