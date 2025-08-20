const combinarEOrdenar = (...arrays) => {
    return [].concat(...arrays).sort((a, b) => a - b);
};

const numeros1 = [3, 5, 1];
const numeros2 = [4, 2, 6];
console.log(combinarEOrdenar(numeros1, numeros2));