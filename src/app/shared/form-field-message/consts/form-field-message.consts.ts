export const formFieldMessages = {
    name: {
        required: 'Informe seu Nome.',
    },
    lastname: {
        required: 'Informe seu Sobrenome.',
    },
    email: {
        required: 'Informe seu endereço de e-mail.',
        email: 'Informe um endereço de e-mail válido.',
    },
    phone: {
        required: 'Informe seu telefone fixo ou móvel.',
        minlength: 'Informe um número de telefone válido com DDD.',
    },
    cpf: {
        required: 'Informe seu CPF.',
        minlength: 'CPF incompleto.'
    },
    password: {
        required: 'Cadastre sua senha de acesso ao aplicativo.'
    },
    passwordConfirm: {
        required: 'Confirme sua senha de acesso ao aplicativo.',
        pattern: 'A confirmação está diferente da senha informada.'
    }
}