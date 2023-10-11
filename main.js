const telaPalavraSecreta = document.querySelector('.secao-palavra-secreta');
const dica = document.querySelector('.secao-dica');


const palavras = { 
    profissoes: [
        'Apicultor', 
        'Agronomo', 
        'Auditor', 
        'Bartender', 
        'Cerimonialista', 
        'Chef', 
        'Coach', 
        'Desembargador', 
        'Despachante', 
        'Endocrinologista',
        'Embaixador', 
        'Gerentologo', 
        'Headhunter', 
        'Interprete', 
        'Juiz', 
        'Nanotecnologo', 
        'Nutrologo', 
        'Pizzaiolo', 
        'Perito', 
        'Quiroprata', 
        'Roteirizador', 
        'Silvicultor', 
        'Trader', 
        'Taquigrafo', 
        'Turismologo'
    ], 
    animais: [
        'Albatroz',
        'Alpaca',
        'Anchova',
        'Bacalhau',
        'Badejo',
        'Barracuda',
        'Beluga',
        'Cagado',
        'Chinchila',
        'Craca',
        'Dromedario',
        'Escaravelho',
        'Gerbo',
        'Gnu',
        'Gralha',
        'Hamster',
        'Lemure',
        'Lhama',
        'Lince',
        'Marreco',
        'Melro',
        'Ocapi',
        'Ourico',
        'Pelicano',
        'Percevejo',
        'Pirilampo',
        'Quati',
        'Rouxinol',
        'Sanguessuga',
        'Surucucu',
        'Tapir',
        'Texugo',
        'Vison',
        'Zebu'
    ]
};
const btnsLetras = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M']; 
const letrasCorretas = [];
const letrasErradas = [];
const palavraSecreta = [];

atualizaJogo();

function atualizaJogo() {
    palavraSecretaTela();    
    verificaTecla();
}

function palavraSecretaTela() {
    let nDica = Math.floor(Math.random() * 2);
    
    if (nDica == 0) {
        palavra = palavras.profissoes[Math.floor(Math.random() * palavras.profissoes.length)];
        dica.innerHTML = `<h2 class="dica_palavra"> DICA: PROFISSÕES </h2>`;
    } else if (nDica == 1) {
        palavra = palavras.animais[Math.floor(Math.random() * palavras.animais.length)];
        dica.innerHTML = `<h2 class="dica_palavra"> DICA: ANIMAIS </h2>`;
    } else {
        sorteiaPalavra();
    };
    
    palavraNaTela = palavra.toUpperCase().split('');
    
    palavraNaTela.forEach((letra) => {
        palavraSecreta.push(letra);
        telaPalavraSecreta.innerHTML += `<p class='palavra-chave'> ▢ </p>`;
    });
};

btnsLetras.forEach(letra => {
   let teclado = document.querySelector('.teclado')
    teclado.innerHTML += `<button class='btn-letra')">${letra}</button>`;
});

const btnsCell = document.querySelectorAll('.btn-letra');

btnsCell.forEach( letra => {
    letra.addEventListener('click', (event) => {
        console.log(event.target.innerHTML);
        validaTecla(event.target.innerHTML);
    });
});
    
function verificaTecla() {
    document.addEventListener('keydown', (event) => {
        let letra = event.key;
        let letraTeclada = letra.toLocaleUpperCase();
        console.log(letraTeclada);

        if (letraTeclada >= 'A' && letraTeclada <= 'Z') {
            validaTecla(letraTeclada);
        }
    });
};

function validaTecla(letraTeclada) {
    if (letrasCorretas.includes(letraTeclada) || letrasErradas.includes(letraTeclada)) {
        alert('Letra repetida!!');

    } else if (palavraSecreta.includes(letraTeclada)) {
        letrasCorretas.push(letraTeclada);
        desvendaPalavra();

    } else {
        letrasErradas.push(letraTeclada);
        mostraTelaletrasErradas();
        mostraBoneco();
        verificaDerrota();
    }
}

function verificaDerrota() {
    if (letrasErradas.length == 6) {
        alert('FIM DE JOGO, Você Perdeu!');
        dica.innerHTML = '';
        dica.innerHTML = `<p class='palavra-chave'> Você Perdeu!</p>`;
        telaPalavraSecreta.innerHTML = '';
        telaPalavraSecreta.innerHTML = `<button class='btn-reinicia' onclick="window.location.reload()">Reiniciar jogo</button>`
    }
};

function desvendaPalavra() {
    telaPalavraSecreta.innerHTML = '';
    let c = 0;

    palavraSecreta.forEach(letra => {

        if (letrasCorretas.includes(letra)) {
            telaPalavraSecreta.innerHTML += `<p class='palavra-chave'>${letra}</p>`;
            c = verificaVitoria(c, palavraSecreta);
        } else {
            telaPalavraSecreta.innerHTML += `<p class='palavra-chave'> ▢ </p>`;
        };
    });
};

function verificaVitoria(c, palavraSecreta) {
    c++;
    if (c == palavraSecreta.length) {
        alert('FIM DE JOGO, Você Ganhou!');
        let membros = document.querySelector('.div-forca');
        membros.innerHTML = '';
        membros.innerHTML = `<p class='palavra-chave'> Você Ganhou!</p>
                             <button class='btn-reinicia' onclick="window.location.reload()"> Reiniciar jogo </button>`;
    };
    return c;
};

function  mostraTelaletrasErradas() {
    const telaLetrasErradas = document.querySelector('.secao-letras-erradas');
    telaLetrasErradas.innerHTML = '';
    letrasErradas.forEach(letra => {
        telaLetrasErradas.innerHTML += `<p>${letra.toLocaleUpperCase()}</p>`;
    });
};

function mostraBoneco() {
    let membros = document.querySelectorAll('.membros');
    membros[letrasErradas.length - 1].style.display = 'block';
};




