const map = L.map('map').setView([-15.7942, -47.8822], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

const carrinhoIcon = document.getElementById('carrinho-icon');
const carrinhoEl = document.getElementById('carrinho');
const contador = document.getElementById('carrinho-contador');
const lista = document.getElementById('itens-carrinho');
const cepInput = document.getElementById('cep');
const enderecoInput = document.getElementById('endereco');

let marcador;

const carrinho = [];

const adicionarCarrinho = (livro) => {
    carrinho.push(livro);
    atualizarCarrinho();
    alert(`Livro "${livro}" adicionado ao carrinho!`);
}

const atualizarCarrinho = () => {
    contador.textContent = carrinho.length;
    lista.innerHTML = carrinho.map(livro => `<li>${livro}</li>`).join('');
};

const toggleCarrinho = () => {
    carrinhoEl.style.display = carrinhoEl.style.display === 'block' ? 'none' : 'block';
};

const esvaziarCarrinho = () => {
    carrinho.length = 0;
    atualizarCarrinho();
}

const buscarCEP = async (cep) => {
    try {
        const response = await fetch(`https://viacep.com.br/ws${cep}/json/`);
        const data = await responde.json();

        if (data.erro) {
            throw new Error('CEP não encontrado');
        }
        return data;
    } catch (error) {
        console.error('Erro ao buscar CEP:', error);
        alert('CEP`não encontrado ou erro na consulta. Verifique o CEP digitando.');
        return null;
    }
}

const calcularDistancia = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
};

const localizarEndereco = async () => {
    const cep = cepInput.value.replace(/\D/g, '');
    const endereco = enderecoInput.value;

    if (!cep) {
        alert("Por favor, preencha o CEP.");
        return;
    }

    try {
        const cepData = await buscarCEP(cep);
        
        if (!cepData) return;
        
        enderecoInput.value = `${cepData.logradouro || ''}, ${cepData.bairro || ''}`;
        
        const query = encodeURIComponent(`${cepData.logradouro}, ${cepData.bairro}, ${cepData.localidade}, ${cep}`);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
        const data = await response.json();
        
        if (data.length > 0) {
            const { lat, lon } = data[0];
            map.setView([lat, lon], 16);

            if (marcador) map.removeLayer(marcador);
            marcador = L.marker([lat, lon]).addTo(map)
                .bindPopup("Endereço de entrega").openPopup();

            const lcc3Lat = -7.2156;
            const lcc3Lon = -35.9087;
            
            const distancia = calcularDistancia(lcc3Lat, lcc3Lon, lat, lon);
            const custoEntrega = (distancia * 1.2).toFixed(2);
            
            document.getElementById('info-entrega').innerHTML = `
                <h3>Informações de Entrega</h3>
                <p><strong>Endereço:</strong> ${cepData.logradouro}, ${cepData.bairro}</p>
                <p><strong>Cidade:</strong> ${cepData.localidade}/${cepData.uf}</p>
                <p><strong>Distância do LCC3/UFCG:</strong> ${distancia.toFixed(2)} km</p>
                <p><strong>Custo de entrega:</strong> R$ ${custoEntrega}</p>
            `;
        } else {
            alert("Endereço não encontrado no mapa. Verifique os dados.");
        }
    } catch (err) {
        console.error(err);
        alert("Erro ao buscar localização. Tente novamente mais tarde.");
    }
};

carrinhoIcon.addEventListener('click', toggleCarrinho);

cepInput.addEventListener('blur', async () => {
    const cep = cepInput.value.replace(/\D/g, '');
    if (cep.length === 8) {
        const cepData = await buscarCEP(cep);
        if (cepData) {
            enderecoInput.value = `${cepData.logradouro || ''}, ${cepData.bairro || ''}`;
        }
    }
});