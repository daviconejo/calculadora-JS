    // ligações para acessar elementos DOM
const calculateButton = document.getElementById('calculate');
const userInput = document.getElementById('userInput');

    //Variáveis globais
let displayCSS = document.querySelector('.displayCSS');

    // Botão que executa a função que calcula
calculateButton.addEventListener('click', function() {
    userInput.textContent = calculate(parseCalculationString(userInput.textContent));
});

    // Insere os números no display
function insert(val) {

    if (userInput.textContent.length >= 13) {
        return;

    } else if (userInput.textContent.length >= 9){
        displayCSS.style.fontSize = '30px'; 
        displayCSS.style.paddingTop = '60px';
        userInput.textContent += val;

    } else if (userInput.textContent.length >= 7){
        displayCSS.style.fontSize = '40px'; 
        displayCSS.style.paddingTop = '50px';
        userInput.textContent += val;

    } else {
        userInput.textContent += val;
    }
}

    //Insere os operadores no display
function insertOps(ops) {

    if (userInput.textContent == '' || userInput.textContent.slice(-1) == ops) {
        return;   
    } else {
        userInput.textContent += ops;
    }
}

    // Limpa o display
function allClear() {
    userInput.textContent = '';
    displayCSS.style.fontSize = "50px";
    displayCSS.style.paddingTop = "40px";
}

    // Apaga o último valor digitado
function backspace() {
    if(userInput.textContent){
        userInput.textContent = userInput.textContent.substring(0, userInput.textContent.length - 1);
    } 
}

    // Mostra a porcentagem do número
function percent() {
    if (userInput.textContent) {
        userInput.textContent /= 100;
    }
}

    // Inverte o sinal do número
function changeSign() {
    if (userInput.textContent) {
        userInput.textContent *= -1;
    } 
}

    //Adiciona ponto pra utilizar números decimais
function appendPoint() {

    if (userInput.textContent == '') {
        userInput.textContent += '0.';
    } else if (userInput.textContent.slice(-1) == '.') {
       return;
    } else {
        userInput.textContent += '.';
    } 
}


    // Analisa string do cálculo
function parseCalculationString(s) {

    let calculation = [];
    let current = '';
    for (let i = 0, ch; ch = s.charAt(i); i++) {

        if ('*/+-'.indexOf(ch) > -1) {
            
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(Number(current), ch);
                current = '';
            }

        } else {
            current += s.charAt(i);
        }
    }
    if (current != '') {
        calculation.push(Number(current));
    }
    return calculation;
}

    // Realiza o cálculo expresso como um array de operadores e números executando a ordem de precedência correta dos operadores na expressão 
function calculate(calc) {

    let ops = [{'*': (a, b) => a * b, '/': (a, b) => a / b}, 
                {'+': (a, b) => a + b, '-': (a, b) => a - b}];
    let newCalc = [];
    let currentOp;

    for (let i = 0; i < ops.length; i++) {
        for (let j = 0; j < calc.length; j++) {

            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];

            } else if (currentOp) {
                newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;

            } else {
                newCalc.push(calc[j]);
            }
        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error: unable to resolve calculation');
        return calc;
    } else {
        return calc[0];
    }
};
