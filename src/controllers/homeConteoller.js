exports.paginaInicial = (request, response) => {
    // request.session.usuario = {nome:'marcusvinicius', idade: 12}   
    response.render('index', {
        titulo: 'Esse é o titulo',
        numeros: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    })
    return;
};

exports.trataPost = (request, response) =>{
    response.send(request.body);
    return;
};