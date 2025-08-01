const frases = [
    "JavaScript é poderoso!",
    "Callbacks são úteis.",
    "Arrow functions são mais curtas."
];

const analisarTexto = (array, callback) => {
    return callback(array);
};

const contarPalavras = (array) => {
    return array.reduce((total, frase) => {
        return total + frase.split(' ').length;
    }, 0);
};

const maiorFrase = (array) => {
    return array.reduce((maior, frase) => {
        return frase.split(' ').length > maior.split(' ').length ? frase : maior;
    }, '');
};

console.log(analisarTexto(frases, contarPalavras)); // 10
console.log(analisarTexto(frases, maiorFrase)); // "Arrow functions são mais curtas."