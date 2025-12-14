// ===== ГЛОБАЛЬНЫЕ ДАННЫЕ =====
let cart = JSON.parse(localStorage.getItem('smokeBobCart')) || [];

// ===== СОХРАНЕНИЕ =====
function saveCart() {
    localStorage.setItem('smokeBobCart', JSON.stringify(cart));
    updateCartCount();
}

// ===== СЧЁТЧИК КОРЗИНЫ =====
function updateCartCount() {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cartCount').textContent = count;
}

// ===== ДОБАВЛЕНИЕ В КОРЗИНУ =====
function addToCart(productName) {
    const products = [
        { name:'Soak', sku:'001', price:245, image:'Soak.jpg', description:'Освежающий вкус с легкой кислинкой. Идеален для вечернего релакса.' },
        { name:'Dota', sku:'002', price:245, image:'Dota.jpg', description:'Фруктовый вкус, идеален для вечернего релакса.' },
        { name:'grex', sku:'003', price:245, image:'grex.jpg', description:'Кремовый, сладкий и очень уютный.' },
        { name:'inu', sku:'004', price:245, image:'inu.jpg', description:'Насыщенный вкус спелого банана.' },
        { name:'isterika', sku:'005', price:245, image:'isterika.jpg', description:'Уникальный вкус арбузной жевательной резинки.' },
        { name:'Podonki', sku:'006', price:245, image:'Podonki.jpg', description:'Чистый, сочный вкус спелого арбуза.' },
        { name:'samoybitsa', sku:'007', price:245, image:'samoybitsa.jpg', description:'Кисло-сладкий вкус виноградной газировки.' },
        { name:'Samoybitsia', sku:'008', price:245, image:'Samoybitsia.jpg', description:'Идеальное сочетание кислой вишни и цитрусового лимона.' },
    ];

    const product = products.find(p => p.name === productName);
    if (!product) return;

    const existing = cart.find(item => item.productId === product.name);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            productId: product.name,
            name: product.name,
            sku: product.sku,
            price: product.price,
            image: product.image,
            description: product.description,
            quantity: 1
        });
    }
    saveCart();
    alert(`✅ "${product.name}" добавлен в корзину!`);
}

// ===== ИНИЦИАЛИЗАЦИЯ =====
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Поиск
    document.getElementById('searchBtn')?.addEventListener('click', applySearchFilter);
    document.getElementById('searchInput')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') applySearchFilter();
    });
});

// ===== ПОИСК =====
function applySearchFilter() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
    const container = document.getElementById('catalog');
    if (!container) return;

    if (!searchTerm) {
        // Показать все товары
        const allProducts = `
            <h2 class="category-header">Все товары</h2>
            <div class="product-item">
                <img src="Soak.jpg" class="product-image" onerror="this.src='https://via.placeholder.com/50?text=Soak'">
                <div class="product-info">
                    <div class="product-name">Soak</div>
                    <div class="product-sku">Артикул: 001</div>
                    <div class="product-description">Освежающий вкус с легкой кислинкой. Идеален для вечернего релакса.</div>
                </div>
                <div class="product-price">245 ₽</div>
                <button class="add-to-cart-btn" onclick="addToCart('Soak')">+</button>
            </div>
            <div class="product-item">
                <img src="Dota.jpg" class="product-image" onerror="this.src='https://via.placeholder.com/50?text=Dota'">
                <div class="product-info">
                    <div class="product-name">Dota</div>
                    <div class="product-sku">Артикул: 002</div>
                    <div class="product-description">Фруктовый вкус, идеален для вечернего релакса.</div>
                </div>
                <div class="product-price">245 ₽</div>
                <button class="add-to-cart-btn" onclick="addToCart('Dota')">+</button>
            </div>
            <div class="product-item">
                <img src="grex.jpg" class="product-image" onerror="this.src='https://via.placeholder.com/50?text=grex'">
                <div class="product-info">
                    <div class="product-name">grex</div>
                    <div class="product-sku">Артикул: 003</div>
                    <div class="product-description">Кремовый, сладкий и очень уютный.</div>
                </div>
                <div class="product-price">245 ₽</div>
                <button class="add-to-cart-btn" onclick="addToCart('grex')">+</button>
            </div>
            <div class="product-item">
                <img src="inu.jpg" class="product-image" onerror="this.src='https://via.placeholder.com/50?text=inu'">
                <div class="product-info">
                    <div class="product-name">inu</div>
                    <div class="product-sku">Артикул: 004</div>
                    <div class="product-description">Насыщенный вкус спелого банана.</div>
                </div>
                <div class="product-price">245 ₽</div>
                <button class="add-to-cart-btn" onclick="addToCart('inu')">+</button>
            </div>
            <div class="product-item">
                <img src="isterika.jpg" class="product-image" onerror="this.src='https://via.placeholder.com/50?text=isterika'">
                <div class="product-info">
                    <div class="product-name">isterika</div>
                    <div class="product-sku">Артикул: 005</div>
                    <div class="product-description">Уникальный вкус арбузной жевательной резинки.</div>
                </div>
                <div class="product-price">245 ₽</div>
                <button class="add-to-cart-btn" onclick="addToCart('isterika')">+</button>
            </div>
            <div class="product-item">
                <img src="Podonki.jpg" class="product-image" onerror="this.src='https://via.placeholder.com/50?text=Podonki'">
                <div class="product-info">
                    <div class="product-name">Podonki</div>
                    <div class="product-sku">Артикул: 006</div>
                    <div class="product-description">Чистый, сочный вкус спелого арбуза.</div>
                </div>
                <div class="product-price">245 ₽</div>
                <button class="add-to-cart-btn" onclick="addToCart('Podonki')">+</button>
            </div>
            <div class="product-item">
                <img src="samoybitsa.jpg" class="product-image" onerror="this.src='https://via.placeholder.com/50?text=samoybitsa'">
                <div class="product-info">
                    <div class="product-name">samoybitsa</div>
                    <div class="product-sku">Артикул: 007</div>
                    <div class="product-description">Кисло-сладкий вкус виноградной газировки.</div>
                </div>
                <div class="product-price">245 ₽</div>
                <button class="add-to-cart-btn" onclick="addToCart('samoybitsa')">+</button>
            </div>
            <div class="product-item">
                <img src="Samoybitsia.jpg" class="product-image" onerror="this.src='https://via.placeholder.com/50?text=Samoybitsia'">
                <div class="product-info">
                    <div class="product-name">Samoybitsia</div>
                    <div class="product-sku">Артикул: 008</div>
                    <div class="product-description">Идеальное сочетание кислой вишни и цитрусового лимона.</div>
                </div>
                <div class="product-price">245 ₽</div>
                <button class="add-to-cart-btn" onclick="addToCart('Samoybitsia')">+</button>
            </div>
        `;
        container.innerHTML = allProducts;
        return;
    }

    // Фильтрация
    const filtered = [
        { name:'Soak', sku:'001', price:245, image:'Soak.jpg', description:'Освежающий вкус с легкой кислинкой. Идеален для вечернего релакса.' },
        { name:'Dota', sku:'002', price:245, image:'Dota.jpg', description:'Фруктовый вкус, идеален для вечернего релакса.' },
        { name:'grex', sku:'003', price:245, image:'grex.jpg', description:'Кремовый, сладкий и очень уютный.' },
        { name:'inu', sku:'004', price:245, image:'inu.jpg', description:'Насыщенный вкус спелого банана.' },
        { name:'isterika', sku:'005', price:245, image:'isterika.jpg', description:'Уникальный вкус арбузной жевательной резинки.' },
        { name:'Podonki', sku:'006', price:245, image:'Podonki.jpg', description:'Чистый, сочный вкус спелого арбуза.' },
        { name:'samoybitsa', sku:'007', price:245, image:'samoybitsa.jpg', description:'Кисло-сладкий вкус виноградной газировки.' },
        { name:'Samoybitsia', sku:'008', price:245, image:'Samoybitsia.jpg', description:'Идеальное сочетание кислой вишни и цитрусового лимона.' },
    ].filter(p =>
        p.name.toLowerCase().includes(searchTerm) ||
        p.sku.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm)
    );

    if (filtered.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:40px; color:#777;">Товары не найдены</p>';
    } else {
        let html = '<h2 class="category-header">Все товары</h2>';
        filtered.forEach(p => {
            html += `
                <div class="product-item">
                    <img src="${p.image}" class="product-image" onerror="this.src='https://via.placeholder.com/50?text=${p.name}'">
                    <div class="product-info">
                        <div class="product-name">${p.name}</div>
                        <div class="product-sku">Артикул: ${p.sku}</div>
                        <div class="product-description">${p.description}</div>
                    </div>
                    <div class="product-price">${p.price} ₽</div>
                    <button class="add-to-cart-btn" onclick="addToCart('${p.name}')">+</button>
                </div>
            `;
        });
        container.innerHTML = html;
    }
}