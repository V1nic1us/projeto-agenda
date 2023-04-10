exports.middlewareGlobal = (request, response, next) => {
    response.locals.umaVariavelLocal = 'Este e o valor da variavel local';
    next();
};

exports.outroMiddleware = () =>{
    console.log('Outro middleware');
    next();
};

exports.checkCsrfError = (error ,request ,response, next) => {
    if (error && error.code == 'EBADCSRFTOKEN') {
        return response.render('404');
    }
}

exports.csrfMiddleware = (request ,response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next();
}