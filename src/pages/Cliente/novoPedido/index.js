import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './novoPedido.css';

class NovoPedido extends Component{
    constructor(props){
        super(props);

        this.state = {
            pedido: {
                nomeProd: "",
                precoVenda: null,
                catProduto: null,
                idCliente: ""
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() { 
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Ops! Erro de conexão com o servidor
                </div>
            );
        }
    }

    render() {
        const {redirect} = this.state;

        if(redirect){
            return <Redirect to="/clientes"/>
            // COLOCAR AQUI TBM UM RETURN QUE NEM O DO FORMS DE BAIXO QUE MOSTRA QUE O PEDIDO FOI FEITO
        } else {
            return (
                <div className="base-products">
                    <form onSubmit={this.handleSubmit}>
                        <div className="main-products">
                            <div className="main-title">
                                <h2>Cadastrar novo pedido</h2>
                            </div>
                            <div className="separator">
                                <div className="pedido-insert">
                                    <label htmlFor="nomeProduto">Produto: </label>
                                    <input type="text" id= "nomeProd" name="nomeProd" placeholder="Produto" 
                                        minLength="3" maxLength="100" required value={this.state.pedido.nomeProd} 
                                        onChange={this.handleInputChange} className="product" />
                                </div>
                                <div className="pedido-insert"> 
                                    <label htmlFor="nomeProduto">Preço: </label>
                                    <input type="text" id= "precoVenda" name="precoVenda" placeholder="preço" 
                                        minLength="2" maxLength="100" required value={this.state.pedido.precoVenda} 
                                        onChange={this.handleInputChange} className="price" />
                                </div>
                                <div className="pedido-insert"> 
                                    <label htmlFor="nomeProduto">Categoria: </label>
                                    <input type="text" id= "catProduto" name="catProduto" placeholder="categoria" 
                                        minLength="1" maxLength="100" required value={this.state.pedido.catProduto} 
                                        onChange={this.handleInputChange} className="category" />
                                </div>
                                <div className="pedido-insert"> 
                                    <label htmlFor="nomeProduto">ID do cliente: </label>
                                    <input type="text" id= "idCliente" name="idCliente" placeholder="ID do cliente" 
                                        minLength="0" maxLength="10" required value={this.state.pedido.idCliente} 
                                        onChange={this.handleInputChange} className="client-id" />
                                </div>
                                <button type="submit" className="btn-CP">Cadastrar Pedido</button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            pedido: {...prevState.pedido, [name]: value}//no campo que tem o atributa "name" do value ele armazena o valor da box
        }));
        console.log(value);
    };

    handleSubmit = event => { // Usar isso na rota /id/produtos para usar a rota pro carrinho com metodo post
        fetch(`${process.env.REACT_APP_API_URL}/sistema/novoPedido/${this.state.pedido.idCliente}`, {
            method: "post",
            body: JSON.stringify(this.state.pedido),
            headers: {
                "Content-Type": "application/json"
            }
        })

            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error ) {
                            this.setState({erro: data.error});
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default NovoPedido;