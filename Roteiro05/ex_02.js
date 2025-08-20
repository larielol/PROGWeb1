const buscarDados = () => {
const temDuplicados = (...params) => {
    return params.some((param, index) => {
        return params.slice(index + 1).some(outroParam => {
            return typeof param === typeof outroParam && param === outroParam;
            });
        });
    };
};

console.log(temDuplicados(1, 2, 3, 1)); 
console.log(temDuplicados('a', 'b', 'c')); 
console.log(temDuplicados(5, '5'));