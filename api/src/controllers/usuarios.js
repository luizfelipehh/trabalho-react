const { Usuario } = require ('../models');
const {gerarToken} = require('../utils/token');
const bcrypt = require('bcryptjs');


function cadastro(request, response, next) {

    const { body:{ nome, email, cpf, nascimento, senha } } = request

    const salt = bcrypt.genSaltSync(10);

    const senha2 = bcrypt.hashSync(senha, salt);

    Usuario.create({
        nome, email, cpf, nascimento, senha
    })
    .then( usuario => {
        response.status(201).json(usuario)
    })
    .catch( ex => {
        console.error(ex);
        response.status(412).send('Não foi possível gravar o usuário')
    })
}

function buscaPorId(request, response, next) {
   
    const { params:{usuarioId} } = request

    Usuario.findById(usuarioId)
    .then(usuario => {
        if (!usuario){
            response.status(404).send('Usuário não encontrado')
        }else{
            response.status(200).json(usuario)
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('não foi possível consultar os dados')
    })

}

function edicao(request, response, next) {

    const {params:{usuarioId}, body:{nome, email, cpf, nascimento, senha}} = request

    Usuario.findById(usuarioId)
    .then( usuario => {
        if (!usuario){
            response.status(404).send('Usuário não encontrado')
        }else{
            return usuario.update({
                nome, email, cpf, nascimento, senha
            })
            .then(()=>{
                response.status(200).json(usuario)
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('Não foi possível consultar o banco de dados')
    })
}

function login(request, response, next) {
    
    const {body:{ email, senha }} = request;

    Usuario.findOne({
        where:{
            email
        }
    })
    .then(usuario => {
        if(usuario.senha == senha) {
            const token = gerarToken(usuario);
            response.status(200).json({token, usuario});
        } else {
            response.status(401).send('Senha incorreta');
        }
    })
    .catch(ex=> {
        console.error(ex)
        response.status(412).send('E-mail inválido')
    })
}

function usuario(request, response, next){
    response.json(request.usuarioLogado);
}

function logout (request, response, next){
    request.usuarioLogado = null;
    response.status(200).cookie('token',null).send('usuário deslogado')
}

module.exports = {
    cadastro,
    buscaPorId,
    usuario,
    edicao,
    login,
    logout
};
