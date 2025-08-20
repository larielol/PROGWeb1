const colocarTodasLetrasEmMaiusculoEm500ms = (texto) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof texto !== 'string') {
                reject(new Error("O parâmetro deve ser uma string"));
            } else {
                resolve(texto.toUpperCase());
            }
        }, 500);
    });
};

const inverteTodasLetras = (texto) => {
    return new Promise((resolve) => {
        resolve(texto.split('').reverse().join(''));
    });
};

colocarTodasLetrasEmMaiusculoEm500ms("javascript")
    .then(inverteTodasLetras)
    .then(resultado => console.log("Resultado:", resultado))
    .catch(erro => console.error("Erro:", erro.message));