const funcionarios = [
    { nome: "Ana", cargo: "Desenvolvedora", salario: 7000 },
    { nome: "Carlos", cargo: "Gerente", salario: 12000 },
    { nome: "Beatriz", cargo: "Analista", salario: 5000 }
];

const gerarRelatorio = (funcionarios) => {
    const totalFuncionarios = funcionarios.length;
    const salarioMedio = funcionarios.reduce((sum, func) => sum + func.salario, 0) / totalFuncionarios;
    
    const formatarSalario = (salario) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
            minimumFractionDigits: 2
        }).format(salario);
    };
    
    const detalhesFuncionarios = funcionarios.map(func => 
        `Nome: ${func.nome} - Cargo: ${func.cargo} - Salário: ${formatarSalario(func.salario)}`
    ).join('\n');
    
    return `Relatório de Funcionários
---
${detalhesFuncionarios}
---
Total de funcionários: ${totalFuncionarios}
Salário médio: ${formatarSalario(salarioMedio)}`;
};

console.log(gerarRelatorio(funcionarios));