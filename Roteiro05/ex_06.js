const combinarEOrdenarAsync = async (...arrays) => {
    return [].concat(...arrays).sort((a, b) => a - b);
};

(async () => {
    const resultado = await combinarEOrdenarAsync([3, 5], [1, 6, 2]);
    console.log("Array combinado e ordenado:", resultado);
})();