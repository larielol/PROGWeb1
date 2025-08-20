const simularRequisicao = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Resposta recebida do servidor!");
        }, 2000);
    });
}
