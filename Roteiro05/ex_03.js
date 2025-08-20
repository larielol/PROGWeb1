const combinarObjetos = (obj1, obj2, callback) => {
    const combinado = { ...obj1, ...obj2 };
    callback(combinado);
};

const pessoa = { nome: "João" };
const endereco = { cidade: "São Paulo" };

combinarObjetos(pessoa, endereco, resultado => {
    console.log("Objetos combinados:", resultado);
});