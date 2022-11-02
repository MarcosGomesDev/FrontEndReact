import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './atualizar.css';

class EditarCliente extends Component {
    constructor (props) {
        super(props);

        this.state = {
            cliente: {
                nome: "",
                end: "",
                email: "",
                telefone: "",
                cpf: "",
                cep: ""
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
                    Erro de conexão com o servidor
                </div>
            );
        }
    }

    componentDidMount() {
        const {id} = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/clientes/${id}`)
        .then(data => {
            data.json().then(data => {
                if (data.error) {
                    this.setState({ erro: data.error });
                } else {
                    this.setState({ cliente: data });
                } //else
            });
        })
        .catch(erro => this.setState({ erro: erro}));
    }

    render () {
        const {redirect} = this.state;
        console.log("Linha 53 this.state = " + this.state)
        if (redirect) { // n entendi esse if aq
            return <Redirect to="/clientes" />
        } else { 
            return (
                <div className="take">
                    <form onSubmit={this.handleSubmit}>
                        <div>
                            <h1>Atualize seus dados</h1>
                            <div className="cliente-insert">
                                <label htmlFor="nome">Nome* </label>
                                <input 
                                    type="text" id= "nome" name="nome" placeholder="nome" minLength="3" 
                                    maxLength="100" required value={this.state.cliente.nome} 
                                    onChange={this.handleInputChange} className="name" />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="end">Endereço* </label>
                                <input 
                                type="text" id= "end" name= "end" placeholder= "endereco" minLength = "5" 
                                maxLength = "100" required value= {this.state.cliente.end} 
                                onChange={this.handleInputChange} />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="email">E-mail* </label>
                                <input type="email" id= "email" name="email" placeholder ="e-mail" minLength = "11"
                                maxLength = "100" required value = {this.state.cliente.email} 
                                onChange={this.handleInputChange} className="email" />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="telefone">Telefone</label>
                                <input type= "tel" id="telefone" name="telefone" placeholder="Telefone" minLength="8" 
                                maxLength="13" value={this.state.cliente.telefone}
                                onChange={this.handleInputChange} className="tel" />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="cpf">CPF*</label>
                                <input type="text" id="cpf" name="cpf" placeholder="CPF" minLength="11" 
                                maxLength="14" required value={this.state.cliente.cpf} 
                                onChange={this.handleInputChange} className="cpfw" />
                            </div>
                            <div className="cliente-insert">
                                <label htmlFor="cep">CEP*</label>
                                <input type="text" id="cep" name="cep" placeholder="CEP" minLength="7" 
                                maxLength="8" required value={this.state.cliente.cep} 
                                onChange={this.handleInputChange} className="cepw" />
                            </div>

                            <button type="submit" className="btn-atualiza">Atualizar</button>
                        </div>
                    </form>
                </div>
            );
        }
    }//fim render

    handleInputChange = event =>{ //handle = lidar
        const target = event.target;
        console.log("Valores event = " + event);
        console.log("Valores target = " + event.target);

        const name = target.name; //nome declarado na class input
        const value = target.value; //valor definido na class input

        this.setState(prevState => ({
            cliente: {...prevState.cliente, [name]: value}
        }));//no estado anterior do cliente, ele fica se chamando, pegando o nome do input (coluna) e adicionando o valor digitado
    };
    
    handleSubmit = event => {
        const { idCliente } = this.state.cliente;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/atualizarCliente/${idCliente}`, {
            method: "put",
            body: JSON.stringify(this.state.cliente),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then(data => {
                if(data.ok){
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default EditarCliente;