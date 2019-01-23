
const { Tarefa } = require('../models');
const Sequelize = require('sequelize');

function cadastro(request, response, next) {

	const { body:{ titulo, descricao }, usuarioLogado: { id } } = request;

	const concluido = 0;

	Tarefa.create({
        titulo, descricao, usuarioId:id, concluido
    })
    .then( tarefa => {
        response.status(201).json(tarefa)
    })
    .catch( ex => {
        console.error(ex);
        response.status(412).send('Não foi possível incluir a tarefa')
    })

}

function listagem(request, response, next) {

	const { usuarioLogado: { id }, query:{titulo}  } = request;

    const tarefaQuery = {
        where:{ usuarioId: id }
    }

    if (titulo){
        tarefaQuery.where.titulo = {
            [Sequelize.Op.like]: `%${titulo}%`
        },
        tarefaQuery.where.usuarioId = id
    }

	Tarefa.findAll(tarefaQuery).then(tarefa => {
		if(!tarefa){
			response.status(404).send('Tarefa não encontrada')
		}else{
			response.status(200).json(tarefa);
		}
	})
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('Não foi possível consular os dados')
    })

}

function buscaPorId(request, response, next) {

	const { params:{tarefaId} } = request

    Tarefa.findById(tarefaId)
    .then(tarefa => {
        if (!tarefa){
            response.status(404).send('Tarefa não encontrada')
        }else{
            response.status(200).json(tarefa)
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('Não foi possível consultar os dados')
    })

}

function edicao(request, response, next) {
	const { params:{ tarefaId }, body:{ titulo, descricao }} = request;

	Tarefa.findById(tarefaId)
    .then( tarefa => {
        if (!tarefa){
            response.status(404).send('Tarefa não encontrada')
        }else{
            return tarefa.update({
                titulo, descricao
            })
            .then(()=>{
                response.status(200).json(tarefa)
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('Não foi possível consultar os dados')
    })
}

function remocao(request, response, next) {

    const { params:{tarefaId} } = request;

    Tarefa.destroy({
        where: {
            id: tarefaId
        }
    })
    .then( deletados => {
        if(deletados > 0)
        {
            response.status(204).send()
        }
        else
        {
            response.status(404).send('Tarefa deletada')
        }
    })
    .catch(ex => {
        console.error(ex)
        response.status(412).send('Não foi possivel deletar a tarefa')
    })

}

function marcarConcluida(request, response, next) {

	const { params:{ tarefaId }, body:{ titulo, descricao }} = request;

	Tarefa.findById(tarefaId)
    .then( tarefa => {
        if (!tarefa){
            response.status(404).send('Tarefa não encontrada')
        }else{
            return tarefa.update({
                concluida:1
            })
            .then(()=>{
                response.status(200).json(tarefa)
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('Não foi possível consultar os dados')
    })

}

function desmarcarConcluida(request, response, next) {

	const { params:{ tarefaId }, body:{ titulo, descricao }} = request;

	Tarefa.findById(tarefaId)
    .then( tarefa => {
        if (!tarefa){
            response.status(404).send('Tarefa não encontrada')
        }else{
            return tarefa.update({
                concluida:0
            })
            .then(()=>{
                response.status(200).json(tarefa)
            })
        }
    })
    .catch(ex=>{
        console.error(ex)
        response.status(412).send('Não foi possível consultar os dados')
    })

}

module.exports = {
    cadastro,
    listagem,
    buscaPorId,
    edicao,
    remocao,
    marcarConcluida,
    desmarcarConcluida,
};
