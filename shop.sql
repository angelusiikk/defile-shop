-- Створення бази данихDROP database shop;
-- DROP DATABASE shop;
CREATE DATABASE IF NOT EXISTS shop;
USE shop;
-- Таблиця для збереження товарів
CREATE TABLE IF NOT EXISTS products (
    default_id INT AUTO_INCREMENT PRIMARY KEY,
    product_type VARCHAR(255),
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10 , 2 ) NOT NULL,
    sale DECIMAL(10 , 2 ) DEFAULT NULL,
    image VARCHAR(255),
    color VARCHAR(50),
    colorUA VARCHAR(50),
    size VARCHAR(10),
    count INT(10),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблиця для збереження користувачів
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблиця для збереження замовлень
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Таблиця для збереження деталей замовлення
CREATE TABLE IF NOT EXISTS order_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(default_id) ON DELETE CASCADE
);

CREATE OR REPLACE VIEW new_collection AS
SELECT 
    default_id,
    product_type,
    name,
    price,
    sale,
    image,
    color,
    colorUA,
    size,
    count,
    created_at
FROM products
WHERE created_at >= NOW() - INTERVAL 1 MONTH;


-- Наповнення таблиці товарів тестовими даними
-- INSERT INTO products (product_type, name, price, image, color, colorUA, size, count) VALUES
-- ('costume', 'Костюм Спортивний', 1200.00, 'sport_suit.jpg', 'red','Червоний', 'L', 5),
-- ('costume', 'Костюм GIGA', 600.00, 'sport_suit.jpg', 'blue','Синій', 'M', 2),
-- ('costume', 'Костюм SPORT', 8900.00, 'sport_suit.jpg', 'green','Зелений', 'XL', 3),
-- ('costume', 'Костюм LOL', 1200.00, 'sport_suit.jpg', 'blue', 'Синій','L', 1),
-- ('costume', 'POST Спортивний', 100.00, 'sport_suit.jpg', 'yellow','Жовтий', 'XS', 4),
-- ('costume', 'GOGO DHDFHDF', 20.00, 'sport_suit.jpg', 'blue', 'Синій', 'L', 0);

INSERT INTO products (product_type, name, price, sale, image, color, colorUA, size, count) VALUES
('tshirt', 'Футболка 1', 600, 400, 'blue_tshirt.jpg', 'blue', 'Синій', 'L', 4);

-- Наповнення таблиці користувачів тестовими даними
INSERT INTO users (name, email, password) VALUES
('Олена', 'olena@example.com', 'password123'),
('Іван', 'ivan@example.com', 'securepassword'),
('Анна', 'anna@example.com', 'mypassword');

-- Наповнення таблиці замовлень тестовими даними
INSERT INTO orders (user_id, total_price) VALUES
(1, 1800.00),
(2, 300.00);

-- Наповнення таблиці деталей замовлення тестовими даними
INSERT INTO order_details (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 300.00),
(1, 3, 1, 1500.00),
(2, 2, 1, 300.00);

select * from new_collection;