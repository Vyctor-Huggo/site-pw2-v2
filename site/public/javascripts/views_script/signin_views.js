(() => {
    'use strict'  
    const forms = document.querySelectorAll('.needs-validation')

    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
        }

        //form.classList.add('was-validated')
        }, false)
    })
})()


const inputCEP = document.getElementById('cep');
const inputTelefone = document.getElementById('telefone')
const inputData = document.getElementById('nascimento')

// "-" automático no CEP
inputCEP.addEventListener('input', function(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');

    if (value.length > 5) {
        value = value.substring(0, 5) + '-' + value.substring(5);
    }
    event.target.value = value;
});

// "()" e "-" automático no telefone
inputTelefone.addEventListener('input', function(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');

    if (value.length > 2) {
        value = '(' + value.substring(0, 2) + ')' + value.substring(2);
    }
    if (value.length > 9) {
        value = value.substring(0, 9) + '-' + value.substring(9);
    }
    event.target.value = value;
});

// "/" automático na data
inputData.addEventListener('input', function(event) {
    let value = event.target.value;
    value = value.replace(/\D/g, '');

    if (value.length > 2) {
        value = value.substring(0, 2) + '/' + value.substring(2);
    }
    if (value.length > 5) {
        value = value.substring(0, 5) + '/' + value.substring(5);
    }
    event.target.value = value;
});

//senha
document.addEventListener('DOMContentLoaded', function() {
    const senhaInput = document.getElementById('senha');

    senhaInput.addEventListener('input', function(event) {
        const senha = senhaInput.value;

        // Expressão regular para validar a senha
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (regex.test(senha)) {
            senhaInput.classList.remove('is-invalid');
            senhaInput.classList.add('is-valid');
        } else {
            senhaInput.classList.remove('is-valid');
            senhaInput.classList.add('is-invalid');
        }
    });

    const form = document.getElementById('meuForm');

    form.addEventListener('submit', function(event) {
        // Verificar se a senha está válida
        const senhaValida = document.getElementById('senha').classList.contains('is-valid');
        const c_senhaValida = document.getElementById('confirmar_senha').classList.contains('is-valid');
        const telefoneValido = document.getElementById('telefone').classList.contains('is-valid');
        const cepValido = document.getElementById('cep').classList.contains('is-valid');
        
        // Se a senha não estiver válida, cancelar o envio do formulário
        if (!senhaValida || !c_senhaValida || !telefoneValido || !cepValido) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Adicionar a classe 'was-validated' ao formulário para exibir mensagens de validação
        //form.classList.add('was-validated');
    });
});


//checar campos
function ChecarCampos(x) {
    const campo = document.getElementById(x);

    switch(x) {
        case 'nome':

            if (campo.value.trim() === '') {
                campo.classList.add('is-invalid');
            }else {
                campo.classList.remove('is-invalid');
                campo.classList.add('is-valid');
            }
            break;

        case 'email':
            const email = campo.value.trim();

            if (!email.includes('@')) {
                campo.classList.add('is-invalid');
            }else {
                campo.classList.remove('is-invalid');
                campo.classList.add('is-valid');
            }
            break;

        case 'confirmar_senha':
            const senha = document.getElementById('senha').value;

            if (senha !== campo.value) {
                campo.classList.add('is-invalid');
            }else {
                campo.classList.remove('is-invalid');
                campo.classList.add('is-valid');

                return true
            }
            break;
            
        case 'telefone':
            if (campo.value.length !== 14) {
                campo.classList.add('is-invalid');
            }else {
                campo.classList.remove('is-invalid');
                campo.classList.add('is-valid');

                return true;
            }
            break;
        
        case 'cep' :
            if (campo.value.length !== 9) {
                campo.classList.add('is-invalid');
            }else {
                campo.classList.remove('is-invalid');
                campo.classList.add('is-valid');
            }
            break;

        case 'nascimento' :
            if (campo.value.length !== 10) {
                campo.classList.add('is-invalid');
            }else {
                campo.classList.remove('is-invalid');
                campo.classList.add('is-valid');
            }
            break;
    }
}





// DDDs
const DDDs = [
    "+55",
    "+1",
    "+44"
];

const dddSelect = document.getElementById('dddSelect');

DDDs.forEach(ddd => {
    const option = document.createElement('option');
    option.value = ddd;
    option.textContent = ddd;
    dddSelect.appendChild(option);
});