document.querySelector('.close-btn').addEventListener('click', () => {
    document.getElementById('registration-form').setAttribute('aria-hidden', 'true');
});
  
function toggleFavorite(button) {
    button.classList.toggle('liked');
}
  
document.getElementById('toggle-filters').addEventListener('click', function () {
      document.getElementById('filters').classList.toggle('active');
});

async function fetchProducts() {
    try {
        const response = await fetch('http://localhost:5000/products');
        const products = await response.json();
        const productsContainer = document.querySelector('.products');

        productsContainer.innerHTML = '';

        const productIds = new Set();

        products.forEach(product => {
            if (!productIds.has(product.default_id)) {
                productIds.add(product.default_id);
                
                
                const productCard = `
                    <div class="product-card" data-color="${product.color ? product.color.toLowerCase() : ''}" data-size="${product.size ? product.size.toLowerCase() : ''}">
                        <img src="images/${product.image}" alt="${product.name}" class="product-image" />
                        <button class="favorite-btn" onclick="toggleFavorite(this)">
                            <i class="fas fa-heart"></i>
                        </button>
                        <h3 class="product-title">${product.name}</h3>
                        
                        <div class="product-info">
                            <span class="product-price" data-price="${product.price ? product.price.toLowerCase() : ''}">${product.price} грн</span>
                            <button class="add-to-cart-btn">До кошику</button>
                        </div>
                    </div>
                `;
                console.log(productCard);
                productsContainer.innerHTML += productCard;
            }
        });
    } catch (error) {
        console.error('Помилка отримання товарів:', error);
    }
}
  async function fetchNewCollection() {
    try {
        const response = await fetch('http://localhost:5000/new_collection');
        const products2 = await response.json();
        const productsContainer = document.querySelector('.new_collection');

        productsContainer.innerHTML = '';

        const productIds = new Set();

        products2.forEach(product => {
            if (!productIds.has(product.default_id)) {
                productIds.add(product.default_id);

                const productCard = `
                <div class="product-card" data-color="${product.color ? product.color.toLowerCase() : ''}" data-size="${product.size ? product.size.toLowerCase() : ''}">
                    <img src="images/${product.image}" alt="${product.name}" class="product-image" />
                    <button class="favorite-btn" onclick="toggleFavorite(this)">
                        <i class="fas fa-heart"></i>
                    </button>
                    <h3 class="product-title">${product.name}</h3>
                    
                    <div class="product-info">
                        <span class="product-price" data-price="${product.price ? product.price.toLowerCase() : ''}">${product.price} грн</span>
                        <button class="add-to-cart-btn">До кошику</button>
                    </div>
                </div>
            `;
                productsContainer.innerHTML += productCard;
            }
        });
        
    } catch (error) {
        console.error('Помилка отримання товарів:', error);
    }
}

// Додавання кольорів до фільтра на основі отриманих товарів
async function populateColorFilter() {
    try {
        const response = await fetch('http://localhost:5000/products');
    const products = await response.json();

    const colorFilter = document.getElementById('color-filter');
    const colorMap = new Set(); // Використовуємо Set для унікальних пар (color, colorUA)

    const sizeFilter = document.getElementById('size-filter');
    const sizeSet = new Set();

    products.forEach(product => {
        if (product.color && product.colorUA) {
            // Додаємо пару (color, colorUA) в Set для уникнення дублікатів
            colorMap.add(JSON.stringify({ color: product.color, colorUA: product.colorUA }));
            sizeSet.add(product.size);
        }
    });

    colorFilter.innerHTML = '<option value="">Всі</option>';
    
    // Перетворюємо Set в масив і використовуємо map для створення опцій
    Array.from(colorMap).map(item => {
        const parsedItem = JSON.parse(item);  // Парсимо JSON рядок назад в об'єкт
        colorFilter.innerHTML += `<option value="${parsedItem.color}">${parsedItem.colorUA}</option>`;
    });
        console.log('Кольори для фільтра завантажено:', Array.from(colorMap));

        sizeFilter.innerHTML = '<option value="">Всі</option>';
        sizeSet.forEach(size => {
            sizeFilter.innerHTML += `<option value="${size}">${size}</option>`;
        });
        console.log('Розміри для фільтра завантажено:', Array.from(sizeSet));
    } catch (error) {
        console.error('Помилка отримання кольорів:', error);
    }
}

// Функція фільтрації товарів за назвою та кольором
const nameSearchInput = document.getElementById('name-search');
const colorFilter = document.getElementById('color-filter');
const sizeFilter = document.getElementById('size-filter');
const priceFilter = document.getElementById('price-filter');

function filterProducts() {
    const searchTerm = nameSearchInput.value.toLowerCase();
    const selectedColor = colorFilter.value.toLowerCase();
    const selectedSize = sizeFilter.value.toLowerCase();
    const selectedPrice = priceFilter.value.toLowerCase();
    const productCards = document.querySelectorAll('.product-card');

    console.log('Пошуковий термін:', searchTerm);
    console.log('Вибраний колір:', selectedColor);
    console.log('Вибраний розмір:', selectedSize);
    console.log('Вибрана ціна:', selectedPrice);

    productCards.forEach(card => {
        const productName = card.querySelector('.product-title').textContent.toLowerCase();
        const productColor = card.dataset.color?.toLowerCase();
        const productSize = card.dataset.size?.toLowerCase();
        const productPriceText = card.querySelector('.product-price').textContent.toLowerCase();

        const productPrice = parseFloat(productPriceText.replace(/[^\d.-]/g, ''));

        console.log('Товар:', productName, '| Колір товару:', productColor, '| Розмір товару:', productSize, '| Ціна товару:', productPrice);

        // Показуємо товар тільки якщо він відповідає обом критеріям
        if (productName.includes(searchTerm) && (!selectedColor || productColor === selectedColor) && (!selectedSize || productSize === selectedSize) && (!selectedPrice || productPrice <= selectedPrice)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Додаємо обробники подій
nameSearchInput.addEventListener('input', filterProducts);
colorFilter.addEventListener('change', filterProducts);
sizeFilter.addEventListener('change', filterProducts);
priceFilter.addEventListener('change', filterProducts);


fetchProducts();
fetchNewCollection();
populateColorFilter();
  