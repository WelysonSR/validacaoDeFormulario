function global() {

    class ValidaFormulario {
        constructor() {
            this.formulario = document.querySelector('.formulario');

            this.eventos();
        }

        eventos() {
            this.formulario.addEventListener('submit', e => {
                this.handleSubmit(e);
            });
        }

        handleSubmit(e) {
            e.preventDefault();
            const camposValidos = this.camposSaoValidos();
            const senhaValidas = this.senhaSaoValidos();

            if(camposValidos && senhaValidas){
                alert(`Formulário enviado com sucesso.`);
                this.formulario.submit();
            }
        }

        senhaSaoValidos(){
            let valid = true;

            const senha = this.formulario.querySelector('.senha');
            const repetirSenha = this.formulario.querySelector('.repetirSenha');

            if(senha.value.length < 6 || senha.value.length > 12){
                this.criarErro(senha, `Senha precisa esta entre 6 e 12 caracteres.`);
                valid = false;
            }

            if(senha.value !== repetirSenha.value){
                this.criarErro(repetirSenha, `Campos senha e repetir percisa ser iguais.`);
                valid = false;
            }

            return valid;
        }

        camposSaoValidos() {
            let valid = true;

            for (let errorTexr of this.formulario.querySelectorAll('.alert-danger')) {
                errorTexr.remove();
            }

            for (let campo of this.formulario.querySelectorAll('.validar')) {
                let label = campo.previousElementSibling.innerText;

                if (!campo.value) {
                    this.criarErro(campo, `Campo "${label}" não pode estar em branco`);
                    valid = false;
                }

                if (campo.classList.contains('cpf')) {
                    if (!this.validaCPF(campo)) valid = false;
                }

                if (campo.classList.contains('usuario')) {
                    if (!this.validaUsuario(campo)) valid = false;
                }
            }
            return valid;
        }

        validaUsuario(campo){
            const usuairo = campo.value;
            let valid = true;

            if(usuairo.length < 3 || usuairo.length > 12){
                this.criarErro(campo, `Usuaário deverá ter entre 3 e 12 caracteres.`)
                valid = false;
            }

            if(!usuairo.match(/^[a-zA-Z0-9]+$/g)){
                this.criarErro(campo, `Nome de usuário precisa conter apenas letras e/ou números.`)
                valid = false;
            }

            return valid;
        }

        validaCPF(campo){
            const cpf = new ValidaCPF(campo.value);

            if(!cpf.valida()){
                this.criarErro(campo, `CPF inválido.`)
                return false;
            }
            return true;
        }

        criarErro(campo, msg) {
            const div = document.createElement('div');
            div.innerHTML = msg;
            div.classList.add('alert-danger');
            campo.insertAdjacentElement('afterend', div);
        }

    }
    const valida = new ValidaFormulario();

}
global()