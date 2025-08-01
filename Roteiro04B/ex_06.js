const crypto = require('crypto');

const criptografarNumero = (numero) => {
    const chaveSecreta = 'minhaChaveSecreta123';
    const algorithm = 'aes-256-cbc';
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(chaveSecreta), iv);
    let encrypted = cipher.update(numero.toString(), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${iv.toString('hex')}:${encrypted}`;
};

const processarNumeros = (numeros, callbackFunction) => {
    const pares = numeros.filter(num => num % 2 === 0);
    return pares.map(num => callbackFunction(num));
};

// Exemplo de uso:
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numerosCriptografados = processarNumeros(numeros, criptografarNumero);
console.log(numerosCriptografados);