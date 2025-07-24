const vendas = [
    { produto: "Notebook", preco: 4500, quantidade: 3, vendedor: "Sara" },
    { produto: "Smartphone", preco: 2300, quantidade: 5, vendedor: "Matheus" },
    { produto: "Monitor", preco: 1200, quantidade: 2, vendedor: "Gabriel" },
    { produto: "Teclado Mecânico", preco: 350, quantidade: 4, vendedor: "Sara" },
    { produto: "Notebook", preco: 4500, quantidade: 6, vendedor: "Gabriel" },
    { produto: "Monitor", preco: 1200, quantidade: 3, vendedor: "Matheus" }
];


const formatarMoeda = (valor) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);


// Questão 1
const gerarRelatorio = (vendas) => {
    let totalGeral = 0;
    let relatorio = "Relatório de Vendas:\n\n";
    
    vendas.forEach(venda => {
        const total = venda.preco * venda.quantidade;
        totalGeral += total;
        
        relatorio += `- Produto: ${venda.produto}\n`;
        relatorio += `  Quantidade: ${venda.quantidade}\n`;
        relatorio += `  Preço Unitário: ${formatarMoeda(venda.preco)}\n`;
        relatorio += `  Total: ${formatarMoeda(total)}\n`;
        relatorio += `  Vendedor: ${venda.vendedor}\n\n`;
    });
    
    relatorio += `...\n\nTotal Geral: ${formatarMoeda(totalGeral)}\n\n`;
    
    // Comissão de 5% é: * 0.05
    const comissoes = {};
    vendas.forEach(venda => {
        const total = venda.preco * venda.quantidade;
        const comissao = total * 0.05;
        
        if (!comissoes[venda.vendedor]) {
            comissoes[venda.vendedor] = 0;
        }
        comissoes[venda.vendedor] += comissao;
    });
    
    relatorio += "Total de comissão (5%):\n";
    for (const [vendedor, comissao] of Object.entries(comissoes)) {
        relatorio += `${vendedor}: ${formatarMoeda(comissao)}\n`;
    }
    
    return relatorio;
};


// Questão 2
const clientes = [
    { nome: "Davi", email: "davi@email.com", plano: "Premium", ativo: true },
    { nome: "Mariana", email: "mariana@email.com", plano: "Básico", ativo: false },
    { nome: "Gabriel", email: "gabriel@email.com", plano: "Padrão", ativo: true },
    { nome: "Ana", email: "ana@email.com", plano: "Premium", ativo: false },
    { nome: "Huandrey", email: "huandrey@email.com", plano: "Padrão", ativo: true }
];


console.log(gerarRelatorio(vendas));


const gerarEmail = (cliente) => {
    if (cliente.ativo) {
        return `Para: ${cliente.email}
Olá, ${cliente.nome}!

Obrigado por ser um assinante do nosso plano ${cliente.plano}! Estamos felizes em tê-lo conosco.

Caso precise de suporte, estamos à disposição.

Atenciosamente,
Equipe StreamingWeb.`;
    } else {
        return `Para: ${cliente.email}
Olá, ${cliente.nome}!

Notamos que sua assinatura do plano ${cliente.plano} está inativa. Que tal voltar e aproveitar nossos conteúdos exclusivos?

Reative agora e continue sua experiência conosco!

Atenciosamente,
Equipe StreamingWeb.`;
    }
};

clientes.forEach(cliente => {
    console.log(gerarEmail(cliente));
    console.log("\n---\n");
});


// Questão 3
const usuarios = [
    { nome: "Cleciana", idade: "25", ativo: "true", saldo: "1234.56" },
    { nome: "Gustavo", idade: 30, ativo: true, saldo: 980 },
    { nome: "Rayane", idade: null, ativo: "false", saldo: "1500.90" },
    { nome: "Igor", idade: "NaN", ativo: 1, saldo: undefined },
    { nome: "Samuel", idade: "22 anos", ativo: false, saldo: "0" }
];

const normalizarUsuario = (usuario) => {
    let idade = usuario.idade;
    if (typeof idade === 'string') {
        idade = parseInt(idade, 10);
        if (isNaN(idade)) {
            idade = null;
        }
    } else if (typeof idade !== 'number' || isNaN(idade)) {
        idade = null;
    }
    
    let ativo = usuario.ativo;
    if (typeof ativo === 'string') {
        ativo = ativo.toLowerCase() === 'true' || ativo === '1';
    } else if (typeof ativo === 'number') {
        ativo = ativo === 1;
    }
    
    let saldo = usuario.saldo;
    if (saldo === undefined || saldo === null) {
        saldo = 0;
    } else if (typeof saldo === 'string') {
        saldo = parseFloat(saldo);
        if (isNaN(saldo)) {
            saldo = 0;
        }
    }
    saldo = parseFloat(saldo.toFixed(2));
    
    return {
        nome: usuario.nome,
        idade,
        ativo,
        saldo
    };
};

const processarUsuario = (lista) => {
    const usuariosNormalizados = lista.map(normalizarUsuario);
    console.log(usuariosNormalizados);
    return usuariosNormalizados;
};

processarUsuario(usuarios);


// Questão 5
const exportacao = {
    paisDestino: "Estados Unidos",
    produto: {
        nome: "aço",
        valorEmDolares: 100000,
        taxalmposta: 0.25
    },
    empresa: "Siderúrgica Brasil Ltda"
};

// Desestruturação
const { produto: { nome, valorEmDolares, taxalmposta }, empresa } = exportacao;

const valorComTarifa = valorEmDolares * (1 + taxalmposta);

console.log(`Produto: ${nome}`);
console.log(`Empresa: ${empresa}`);
console.log(`Valor original: US$ ${valorEmDolares}`);
console.log(`Taxa: ${taxalmposta * 100}%`);
console.log(`Valor com tarifa: US$ ${valorComTarifa}`);