const { async } = require('regenerator-runtime');
const Login = require('../models/LoginModel');

exports.index = (request, response) => {
    return response.render('login');
}

exports.register = async function(request, response) {
    try {
        const login = new Login(request.body);
        await login.register();

        if (login.errors.length > 0) {
            request.flash('errors', login.errors);
            request.session.save(function() {
                return response.redirect('back');
            });
            return;
        }
        request.flash('success', 'Seu Usuario foi criado com sucesso');
        request.session.save(function() {
            return response.redirect('back');
        });  
    } catch (error) {
        return response.render('error');
    }   
}