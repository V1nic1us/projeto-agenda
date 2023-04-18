const Contato = require('../models/ContatoModel');

exports.index = (request, response) => {
    response.render('contato', {contato:{}});
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
        request.session.save(() => response.redirect(`/contato/index/${contato.contato._id}`));
        return;   
    } catch (error) {
        console.log(error);
        return response.render('error');
    }
    
}

exports.editIndex = async(request, response) =>{
    if (!request.params.id) return response.reder('error');
    const contato = await Contato.buscarPorId(request.params.id);
    if (!contato) return response.render('error');
    response.render('contato', { contato });
}

exports.edit = async(request, response) =>{
    try {
        if (!request.params.id) return response.render('error');
        const contato = new Contato(request.body);
        await contato.edit(request.params.id);
        if (contato.errors.length > 0) {
            request.flash('errors', contato.errors);
            request.session.save(() => response.redirect('back'));
            return;
        }
    
        request.flash('success', 'Contato Editado com sucesso');
        request.session.save(() => response.redirect(`/contato/index/${contato.contato._id}`));
        return;
    } catch (error) {
        console.log(error);
        return response.render('error');
    }
}