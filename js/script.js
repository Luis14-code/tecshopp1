const products = [
    { id: 1, name: 'Smartphone Galaxy S21', category: 'Smartphones', price: 4999.99, description: 'O Galaxy S21 é o smartphone que você precisa, com câmera de alta qualidade e desempenho excepcional.', image: 'images/Captura de tela 2024-11-05 173236-Photoroom.png' },
    { id: 2, name: 'iPhone 13 Pro', category: 'Smartphones', price: 6999.99, description: 'O iPhone 13 Pro é o último modelo da Apple, com processador poderoso e excelente qualidade de câmera.', image: 'images/iphone_13_pro-removebg-preview.png' },
    { id: 3, name: 'MacBook Pro 16"', category: 'Computadores', price: 12999.99, description: 'O MacBook Pro é perfeito para profissionais que necessitam de um desempenho potente.', image: 'images/Macbook-pro-m1-13-pulgadas-Photo (1).png' },
    { id: 4, name: 'Tablet iPad Pro', category: 'Tablets', price: 7999.99, description: 'O iPad Pro é o tablet mais poderoso da Apple, ideal para criadores de conteúdo.', image: 'images/ipad_2_2_1-Photoroom.png' },
    { id: 5, name: 'TV Samsung 55" 4K', category: 'Televisores', price: 3999.99, description: 'TV 4K da Samsung com excelente qualidade de imagem e recursos inteligentes.', image: 'images/210024-Photoroom.png' },
    { id: 6, name: 'Fone de Ouvido Bluetooth', category: 'Áudio', price: 299.99, description: 'Fone de ouvido Bluetooth com som de alta qualidade e conforto.', image: 'images/fone-de-ouvido-multilaser-ph246-bluetooth-preto-5716-Photoroom.png' },
    { id: 7, name: 'Powerbank Carregamento Portátil 10000mah Múltiplas Saídas Cor Preto', category: 'powerbank', price: 58.99, description: 'Power Bank 10000mAh portátil com cabos inclusos, ideal para manter seus dispositivos carregados com segurança e praticidade onde você estiver.', image: 'images/oie_transparent (5).png' },
    { id: 8, name: 'Altifalante inteligente Alexas echo dot 4ª geração', category: 'Computadores', price: 499.99, description: 'Assistente virtual inteligente Alexa com controle por voz, compatível com diversos dispositivos, para organizar tarefas, reproduzir música, verificar o clima e garantir segurança e privacidade.', image: 'images/oie_transparent (10).png' },
    { id: 9, name: 'Cadeira Escritório Gamer Ergonômica Reclinável', category: 'escritorio', price: 638.99, description: 'Cadeira ergonômica e versátil da Led Tools, ideal para conforto e postura adequada em longas horas de trabalho ou jogo.', image: 'images/oie_transparent (8).png' },
    
];

let cart = [];

// Função para carregar o carrinho do localStorage
function loadCart() {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart) : [];
}

// Função para salvar o carrinho no localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Exibir produtos
// Exibir produtos
function displayProducts(productList) {
    const productContainer = document.getElementById('product-list');

    if (!productContainer) {
        console.error("Elemento 'product-list' não encontrado.");
        return; // Para a função se o contêiner não existir
    }

    productContainer.innerHTML = ''; // Limpa o conteúdo existente
    productList.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>R$${product.price.toFixed(2)}</p>
            <button id="view-details-${product.id}" onclick="viewProductDetails(${product.id})">Ver Detalhes</button>
            <button onclick="addToCart(${product.id})">🛒</button>
        `;
        productContainer.appendChild(productDiv);
    });
}


// Garante que o displayProducts só seja chamado após o carregamento do DOM
document.addEventListener("DOMContentLoaded", () => {
    loadCart(); // Carrega o carrinho salvo ao iniciar a página
    displayProducts(products);
    updateCartInfo(); // Atualiza o ícone do carrinho
});

// Função para redirecionar para a página de detalhes
function viewProductDetails(productId) {
    localStorage.setItem('selectedProductId', productId); // Armazena o ID do produto
    console.log("ID armazenado no localStorage:", localStorage.getItem('selectedProductId')); // Verifique o valor armazenado
    window.location.href = 'product-details.html'; // Redireciona para a página de detalhes
}

// Carrinho
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        saveCart(); // Salva o carrinho atualizado
        updateCartInfo();
    }
}

function updateCartInfo() {
    const totalItems = cart.length;
    const totalPrice = cart.reduce((sum, product) => sum + product.price, 0);
    document.querySelector(".icon").innerHTML = `🛒 Total: R$${totalPrice.toFixed(2)} (${totalItems} itens)`;
}

function toggleCart() {
    document.getElementById('cart-modal').classList.toggle('hidden');
    displayCartItems();
}

function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total-container');
    const emptyMessage = document.querySelector('.cart-empty-message');

    cartContainer.innerHTML = ''; // Limpa o conteúdo existente
    if (cart.length === 0) {
        emptyMessage.classList.remove('hidden');
        totalContainer.classList.add('hidden');
    } else {
        emptyMessage.classList.add('hidden');
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item'; // Adiciona uma classe para estilização
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">R$${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-item" onclick="removeFromCart(${index})">Remover</button>
            `;
            cartContainer.appendChild(cartItem);
        });
        totalContainer.classList.remove('hidden');
        document.getElementById('cart-total').innerText = `Total: R$${cart.reduce((sum, product) => sum + product.price, 0).toFixed(2)}`;
    }
}


function removeFromCart(index) {
    cart.splice(index, 1); // Remove o item do carrinho
    saveCart(); // Salva o carrinho atualizado
    displayCartItems();
    updateCartInfo();
}

function checkout() {
    alert("Compra finalizada!");
    cart = []; // Esvazia o carrinho
    saveCart(); // Salva o carrinho vazio
    toggleCart();
    updateCartInfo();
}

// Função para buscar produtos por categoria
function filterByCategory(category) {
    const filteredProducts = products.filter(product => product.category === category);
    displayProducts(filteredProducts);
}

function showAllProducts() {
    displayProducts(products);
}

// Função de busca de produtos
function searchProducts() {
    const query = document.getElementById('search-bar').value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(query));
    displayProducts(filteredProducts);
}

// Carrega os detalhes do produto na página de detalhes
if (window.location.pathname.includes('product-details.html')) {
    const selectedProductId = localStorage.getItem('selectedProductId');
    console.log("ID do Produto Selecionado na Página de Detalhes:", selectedProductId);

    if (selectedProductId) {
        const selectedProduct = products.find(product => product.id == selectedProductId);
        console.log("Produto Encontrado:", selectedProduct);

        const productDetailContainer = document.getElementById('product-detail-container');

        if (selectedProduct) {
            productDetailContainer.innerHTML = `
                <div class="product-detail">
                    <h2>${selectedProduct.name}</h2>
                    <img src="${selectedProduct.image}" alt="${selectedProduct.name}" class="product-image">
                    <p class="price">Preço: R$${selectedProduct.price.toFixed(2)}</p>
                    <p class="description">${selectedProduct.description}</p>
                    <button onclick="addToCart(${selectedProduct.id})">Adicionar ao Carrinho</button>
                    <button onclick="window.history.back()">Voltar</button>
                </div>
            `;
        } else {
            productDetailContainer.innerHTML = '<p>Produto não encontrado.</p>';
        }
    } else {
        console.error("ID do produto não encontrado no localStorage.");
    }
}


        let darkmode = document.querySelector ('#darkmode');

darkmode.onclick = () => {
    if(darkmode.classList.contains('bx-moon')){
        darkmode.classList.replace ('bx-moon', 'bx-sun');
        document.body.classList.add ('color');
    } else{
        darkmode.classList.replace('bx-sun','bx-moon');
        document.body.classList.remove('color');
    }
};

let menu = document.querySelector('#menu-icon');
let Links = document.querySelector ('.Links');

menu.onclick = () => {
    menu.classList.toggle ('bx-x');
    Links.classList.toggle ('open');
};

window.onscroll = () => {
    menu.classList.remove ('bx-x');
    Links.classList.remove('open');
};

function toggleCategorias() {
    const categoriasList = document.getElementById('categorias-list');
    categoriasList.classList.toggle('mostrar');
}


