/**
 * ============================================
 * JavaScript Core Concepts & Best Practices
 * ============================================
 * Array Methods, Callback Functions, & Functional Programming
 */

// ========================================
// 1. ARRAY METHODS (map, filter, reduce)
// ========================================

console.log('=== ARRAY METHODS ===\n');

// Sample data
const products = [
    { name: 'Laptop', price: 1000, quantity: 2 },
    { name: 'Phone', price: 500, quantity: 3 },
    { name: 'Tablet', price: 300, quantity: 1 }
];

const numbers = [1, 2, 3, 4, 5];

// --- MAP: Transform each element ---
console.log('1. MAP - Transform elements');
const doubled = numbers.map(num => num * 2);
console.log('Original:', numbers);
console.log('Doubled:', doubled);

const productNames = products.map(p => p.name);
console.log('Product Names:', productNames);

const pricesWithTax = products.map(p => ({
    name: p.name,
    originalPrice: p.price,
    priceWithTax: p.price * 1.1
}));
console.log('With Tax:', pricesWithTax);

// --- FILTER: Keep only matching elements ---
console.log('\n2. FILTER - Select elements');
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Even Numbers:', evenNumbers);

const expensiveProducts = products.filter(p => p.price > 400);
console.log('Expensive Products:', expensiveProducts);

const inStock = products.filter(p => p.quantity > 0);
console.log('In Stock:', inStock.map(p => p.name));

// --- REDUCE: Combine into single value ---
console.log('\n3. REDUCE - Combine into one value');
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log('Sum:', sum);

const totalInventory = products.reduce((total, p) => total + (p.price * p.quantity), 0);
console.log('Total Inventory Value: $' + totalInventory);

const groupByPrice = products.reduce((groups, product) => {
    const key = product.price > 500 ? 'expensive' : 'affordable';
    if (!groups[key]) groups[key] = [];
    groups[key].push(product.name);
    return groups;
}, {});
console.log('Grouped by Price:', groupByPrice);

// --- CHAINING: Combine multiple operations ---
console.log('\n4. METHOD CHAINING - Multiple operations');
const result = products
    .filter(p => p.price > 300)
    .map(p => p.price)
    .reduce((sum, price) => sum + price, 0);
console.log('Total of products over $300:', '$' + result);

// ========================================
// 2. CALLBACK FUNCTIONS
// ========================================

console.log('\n=== CALLBACK FUNCTIONS ===\n');

// --- Basic Callback ---
function greet(name, callback) {
    const greeting = `Hello, ${name}!`;
    callback(greeting);
}

greet('Fiastara', (message) => {
    console.log(message);
});

// --- Callback with Processing ---
function processOrder(orderId, onComplete, onError) {
    console.log(`Processing order #${orderId}...`);
    
    // Simulate processing
    setTimeout(() => {
        if (orderId > 0) {
            onComplete(`Order #${orderId} completed successfully!`);
        } else {
            onError('Invalid order ID');
        }
    }, 1000);
}

processOrder(
    101,
    (success) => console.log('✓ ' + success),
    (error) => console.log('✗ Error: ' + error)
);

// --- Array methods use callbacks ---
console.log('\nCallback in array methods:');
numbers.forEach((num, index) => {
    console.log(`Index ${index}: ${num}`);
});

// ========================================
// 3. FUNCTIONAL PROGRAMMING CONCEPTS
// ========================================

console.log('\n=== FUNCTIONAL PROGRAMMING ===\n');

// --- Pure Functions (same input = same output, no side effects) ---
console.log('1. PURE FUNCTIONS');

// Pure function - always returns same result
function add(a, b) {
    return a + b;
}
console.log('add(5, 3):', add(5, 3)); // Always 8
console.log('add(5, 3):', add(5, 3)); // Always 8

// Impure function - depends on external state
let multiplier = 2;
function impureMultiply(num) {
    return num * multiplier; // Depends on external variable
}
console.log('impureMultiply(5) with multiplier=2:', impureMultiply(5)); // 10
multiplier = 3;
console.log('impureMultiply(5) with multiplier=3:', impureMultiply(5)); // 15 (different!)

// --- First-Class Functions ---
console.log('\n2. FIRST-CLASS FUNCTIONS');

// Functions can be assigned to variables
const multiply = (a, b) => a * b;
console.log('multiply(4, 5):', multiply(4, 5));

// Functions can be passed as arguments
function applyOperation(a, b, operation) {
    return operation(a, b);
}
console.log('applyOperation(10, 5, multiply):', applyOperation(10, 5, multiply));
console.log('applyOperation(10, 5, (a,b) => a + b):', applyOperation(10, 5, (a, b) => a + b));

// Functions can return functions
function createMultiplier(factor) {
    return (number) => number * factor;
}
const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log('double(5):', double(5));
console.log('triple(5):', triple(5));

// --- Higher-Order Functions ---
console.log('\n3. HIGHER-ORDER FUNCTIONS');

// Function that operates on other functions
function compose(fn1, fn2) {
    return (x) => fn1(fn2(x));
}

const addTen = (x) => x + 10;
const double2 = (x) => x * 2;

const addThenDouble = compose(double2, addTen);
console.log('addThenDouble(5):', addThenDouble(5)); // (5 + 10) * 2 = 30

// --- Currying ---
console.log('\n4. CURRYING (Breaking down functions)');

// Regular function with multiple arguments
function calculatePrice(tax, discount, price) {
    return price * (1 + tax) * (1 - discount);
}
console.log('Regular:', calculatePrice(0.1, 0.2, 100)); // 88

// Curried version
const curriedPrice = (tax) => (discount) => (price) => {
    return price * (1 + tax) * (1 - discount);
};

const priceWithTax10 = curriedPrice(0.1);
const priceWithTax10AndDiscount20 = priceWithTax10(0.2);
console.log('Curried:', priceWithTax10AndDiscount20(100)); // 88

// --- Immutability ---
console.log('\n5. IMMUTABILITY');

const original = { name: 'Fiastara', age: 25 };
console.log('Original:', original);

// Immutable way - create new object
const updated = { ...original, age: 26 };
console.log('Updated (new object):', updated);
console.log('Original unchanged:', original);

// Immutable array operations
const arr = [1, 2, 3];
const newArr = [...arr, 4]; // Don't mutate original
console.log('Original array:', arr);
console.log('New array:', newArr);

// --- Destructuring ---
console.log('\n6. DESTRUCTURING');

const [first, second, ...rest] = numbers;
console.log('First:', first, 'Second:', second, 'Rest:', rest);

const { name: productName, price: productPrice } = products[0];
console.log('Product Name:', productName, 'Price:', productPrice);

// --- Function Composition Real-World Example ---
console.log('\n7. REAL-WORLD EXAMPLE: Processing User Data');

const users = [
    { name: 'Fiastara', age: 25, active: true },
    { name: 'John', age: 30, active: false },
    { name: 'Jane', age: 28, active: true }
];

const getActiveUsers = (data) => data.filter(u => u.active);
const getNames = (data) => data.map(u => u.name);
const formatNames = (names) => names.join(', ');

const activeUserNames = formatNames(
    getNames(
        getActiveUsers(users)
    )
);
console.log('Active Users:', activeUserNames);

// Better - using composition
const pipe = (...fns) => (data) => fns.reduce((result, fn) => fn(result), data);

const getAndFormatActiveUsers = pipe(
    getActiveUsers,
    getNames,
    formatNames
);

console.log('With Pipe:', getAndFormatActiveUsers(users));

// ========================================
// 4. ADVANCED CONCEPTS
// ========================================

console.log('\n=== ADVANCED CONCEPTS ===\n');

// --- ARROW FUNCTIONS & DESTRUCTURING ---
console.log('1. ARROW FUNCTIONS & DESTRUCTURING');

const employees = [
    { id: 1, name: 'Fiastara', dept: 'Engineering', salary: 7000 },
    { id: 2, name: 'John', dept: 'Sales', salary: 5000 },
    { id: 3, name: 'Jane', dept: 'Engineering', salary: 8000 }
];

const highEarners = employees
    .filter(({ salary }) => salary > 6000)
    .map(({ name, dept, salary }) => `${name} (${dept}) - $${salary}`);

console.log('High Earners:', highEarners);

// --- OBJECT & ARRAY SPREAD OPERATOR ---
console.log('\n2. SPREAD OPERATOR');

const defaults = { theme: 'light', lang: 'en' };
const userPrefs = { theme: 'dark' };
const merged = { ...defaults, ...userPrefs };
console.log('Merged settings:', merged);

// --- TEMPLATE LITERALS ---
console.log('\n3. TEMPLATE LITERALS');

const user = { name: 'Fiastara', role: 'Engineer', exp: 5 };
const bio = `${user.name} is a ${user.role} with ${user.exp} years experience`;
console.log(bio);

// --- DEFAULT PARAMETERS ---
console.log('\n4. DEFAULT PARAMETERS');

function createUser(name = 'Anonymous', role = 'User') {
    return { name, role, createdAt: new Date().toISOString() };
}
console.log('With defaults:', createUser());
console.log('With params:', createUser('Fiastara', 'Admin'));

// --- PRACTICAL EXAMPLE: Data Pipeline ---
console.log('\n5. DATA PIPELINE EXAMPLE');

const sales = [
    { product: 'Laptop', amount: 1200, region: 'Asia' },
    { product: 'Phone', amount: 800, region: 'Europe' },
    { product: 'Tablet', amount: 600, region: 'Asia' },
    { product: 'Monitor', amount: 400, region: 'Europe' }
];

const asianSalesTotal = sales
    .filter(({ region }) => region === 'Asia')
    .map(({ amount }) => amount)
    .reduce((sum, amount) => sum + amount, 0);

console.log('Total Asian Sales: $' + asianSalesTotal);

// Event emitter pattern (Observer pattern)
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

console.log('\n6. EVENT EMITTER PATTERN');
const emitter = new EventEmitter();

emitter.on('userLogin', (user) => {
    console.log(`User ${user} logged in`);
});

emitter.on('userLogin', (user) => {
    console.log(`Welcome back, ${user}!`);
});

emitter.emit('userLogin', 'Fiastara');

// --- MEMOIZATION (Performance optimization) ---
console.log('\n7. MEMOIZATION');

function createMemoizer() {
    const cache = {};
    return function fibonacci(n) {
        if (n in cache) return cache[n];
        if (n <= 1) return n;
        return cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
    };
}

const memoFib = createMemoizer();
console.log('Fibonacci(10):', memoFib(10));
console.log('Fibonacci(15):', memoFib(15));

console.log('\n=== END OF COMPREHENSIVE CONCEPTS ===');
