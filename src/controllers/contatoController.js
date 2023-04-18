const Contato = require('../models/ContatoModel');

exports.index = (request, response) => {
    response.render('contato');
}

exports.register = async(request, response) => {
    try {
        const contato = new Contato(request.body);
        await contato.register();
        if (contato.errors.length > 0) {
            request.flash('errors', contato.errors);
            request.session.save(() => response.redirect('back'));
            return;
        }

        request.flash('success', 'Contato Registrado com sucesso');
        request.session.save(() => response.redirect('back'));
        return;   
    } catch (error) {
        console.log(error);
        return response.render('error');
    }
    
}