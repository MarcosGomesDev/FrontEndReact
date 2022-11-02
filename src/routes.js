import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandScreen from './pages/Cliente/landscreen/index';
/*Cliente*/
import MainCliente from './pages/Admin/clientes/index';
import DetalhesCliente from './pages/Admin/detalhesC/index';
import CriarCliente from './pages/Cliente/cadastro/index';
import EditarCliente from './pages/Cliente/atualizar/index';
import DeletarCliente from './pages/Cliente/deletarCliente/index';
/*Produtos*/
import EstoqueProdutos from './pages/Cliente/produtos/index';
import DetalheProduto from './pages/Cliente/detalheProduto/index';
import CadastrarProduto from './pages/Cliente/cadastroProduto/index';
import DeletarProduto from './pages/Cliente/deletarProduto/index';

import NovoPedido from './pages/Cliente/novoPedido/index';
import Pedidos from './pages/Cliente/meusPedidos/index';
import PedidoCliente from './pages/Cliente/clientePedidos/index';
import DeletarPedido from './pages/Cliente/deletarPedido/index';


const Routes = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={LandScreen}/>

            <Route exact path="/clientes" component={MainCliente}/>
            <Route exact path="/clientes/:id" component={DetalhesCliente}/>
            <Route exact path="/criarCliente" component={CriarCliente}/>
            <Route exact path="/editarCliente/:id" component={EditarCliente}/>
            <Route exact path="/deleteCliente/:id" component={DeletarCliente}/>

            <Route path="/produtos" component={EstoqueProdutos}/>
            <Route exact path="/produtosDetail/:idProduto" component={DetalheProduto}/>
            <Route exact path="/cadastroProduto" component={CadastrarProduto}/>
            <Route exact path="/deleteProduto/:idProduto" component={DeletarProduto}/>

            <Route exact path="/novoPedido" component={NovoPedido}/>
            <Route exact path="/pedidos" component={Pedidos}/>
            <Route exact path="/pedidos/:idCliente" component={PedidoCliente}/>
            <Route exact path="/deletePedido/:idPedido" component={DeletarPedido}/>

        </Switch>
    
    </BrowserRouter>
)

export default Routes;