const API_URL = "https://demo.mockable.io";

const buscarProdutos = async () => {
    try {
        const resposta = await fetch(`${API_URL}/produtos`);
        if (!resposta.ok) throw new Error("Erro ao buscar produtos");
        
        const produtos = await resposta.json();
        
        produtos.forEach(produto => {
            console.log(`Produto: ${produto.nome} | Preço: R$ ${produto.preco.toFixed(2)}`);
        });
        
        return produtos;
    } catch (erro) {
        console.error("Erro na requisição GET:", erro);
        throw erro;
    }
};

const cadastrarProduto = async (novoProduto) => {
    try {
        const resposta = await fetch(`${API_URL}/produtos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(novoProduto)
        });
        
        if (!resposta.ok) throw new Error("Erro ao cadastrar produto");
        
        const produtoCriado = await resposta.json();
        console.log(`Produto "${produtoCriado.nome}" criado com sucesso! Status: ${produtoCriado.status}`);
        
        return produtoCriado;
    } catch (erro) {
        console.error("Erro na requisição POST:", erro);
        throw erro;
    }
};

(async () => {
    try {
        const produtos = await buscarProdutos();
        
        const novoProduto = {
            nome: "Headset",
            preco: 250.00,
            categoria: "Acessórios"
        };
        
        produtos.push(novoProduto);
        
        await cadastrarProduto(novoProduto);
        
    } catch (erro) {
        console.error("Erro no fluxo principal:", erro);
    }
})();