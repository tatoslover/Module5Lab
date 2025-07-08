// Fake Store API - Simulated E-commerce API
// This simulates an e-commerce API with mock data and responses

// Mock data
const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: { rate: 3.9, count: 120 },
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: { rate: 4.1, count: 259 },
  },
  {
    id: 3,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: { rate: 4.7, count: 500 },
  },
  {
    id: 4,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: { rate: 2.1, count: 430 },
  },
  {
    id: 5,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 4.6, count: 400 },
  },
  {
    id: 6,
    title: "Solid Gold Petite Micropave",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3.9, count: 70 },
  },
  {
    id: 7,
    title: "White Gold Plated Princess",
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 3, count: 400 },
  },
  {
    id: 8,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: { rate: 1.9, count: 100 },
  },
  {
    id: 9,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user's hardware configuration and operating system",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: { rate: 3.3, count: 203 },
  },
  {
    id: 10,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5" hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads',
    category: "electronics",
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 470 },
  },
  {
    id: 11,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks.",
    category: "electronics",
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 319 },
  },
  {
    id: 12,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "electronics",
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: { rate: 4.8, count: 400 },
  },
  {
    id: 13,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: { rate: 2.9, count: 250 },
  },
  {
    id: 14,
    title: "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor",
    price: 999.99,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast",
    category: "electronics",
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: { rate: 2.2, count: 140 },
  },
  {
    id: 15,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: { rate: 2.6, count: 235 },
  },
  {
    id: 16,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: { rate: 2.9, count: 340 },
  },
  {
    id: 17,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    description:
      "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    rating: { rate: 3.8, count: 679 },
  },
  {
    id: 18,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V",
    price: 9.85,
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    rating: { rate: 4.7, count: 130 },
  },
  {
    id: 19,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away from the skin",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    rating: { rate: 4.5, count: 146 },
  },
  {
    id: 20,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    description:
      "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    category: "women's clothing",
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    rating: { rate: 3.6, count: 145 },
  },
];

const MOCK_ORDERS = [
  {
    id: 1,
    userId: 1,
    date: "2024-01-15",
    products: [
      { productId: 1, quantity: 2 },
      { productId: 3, quantity: 1 },
    ],
    status: "delivered",
    total: 275.89,
  },
  {
    id: 2,
    userId: 2,
    date: "2024-01-20",
    products: [
      { productId: 5, quantity: 1 },
      { productId: 7, quantity: 2 },
    ],
    status: "shipped",
    total: 714.98,
  },
  {
    id: 3,
    userId: 3,
    date: "2024-01-25",
    products: [
      { productId: 13, quantity: 1 },
      { productId: 14, quantity: 1 },
    ],
    status: "processing",
    total: 1598.99,
  },
  {
    id: 4,
    userId: 1,
    date: "2024-01-30",
    products: [
      { productId: 18, quantity: 3 },
      { productId: 19, quantity: 2 },
    ],
    status: "pending",
    total: 45.45,
  },
  {
    id: 5,
    userId: 4,
    date: "2024-02-01",
    products: [
      { productId: 10, quantity: 1 },
      { productId: 11, quantity: 1 },
    ],
    status: "cancelled",
    total: 218.0,
  },
];

const MOCK_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
];

const MOCK_USERS = [
  {
    id: 1,
    email: "john@gmail.com",
    username: "johnd",
    password: "m38rmF$",
    name: { firstname: "john", lastname: "doe" },
    address: {
      city: "kilcoole",
      street: "7835 new road",
      number: 3,
      zipcode: "12926-3874",
      geolocation: { lat: "-37.3159", long: "81.1496" },
    },
    phone: "1-570-236-7033",
  },
  {
    id: 2,
    email: "morrison@gmail.com",
    username: "mor_2314",
    password: "83r5^_",
    name: { firstname: "david", lastname: "morrison" },
    address: {
      city: "san antonio",
      street: "4468 maple street",
      number: 12,
      zipcode: "78602-1234",
      geolocation: { lat: "-29.4626", long: "-98.4945" },
    },
    phone: "1-210-555-0123",
  },
  {
    id: 3,
    email: "kate@gmail.com",
    username: "kevinr",
    password: "kev02937@",
    name: { firstname: "kevin", lastname: "ryan" },
    address: {
      city: "WashingtonDC",
      street: "7835 new road",
      number: 3,
      zipcode: "12926-3874",
      geolocation: { lat: "-37.3159", long: "81.1496" },
    },
    phone: "1-202-555-0149",
  },
];

// Global state
let currentFilter = "all";
let currentSort = "default";
let currentLimit = 20;
let currentCategory = "all";
let displayMode = "grid";
let activeTab = "products";
let mockCache = new Map();

// Initialize the application
document.addEventListener("DOMContentLoaded", function () {
  initializeApp();
  initializeEventListeners();
  initializeMockCache();
});

function initializeApp() {
  updateStats();
  showWelcomeMessage();
  displayProducts();
  populateFilters();
  setActiveTab("products");
}

function initializeEventListeners() {
  // Tab switching
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      setActiveTab(tab);
    });
  });

  // Display mode switching
  document.querySelectorAll(".display-tab-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.mode;
      setDisplayMode(mode);
    });
  });

  // Filter changes
  const categoryFilter = document.getElementById("categoryFilter");
  const sortFilter = document.getElementById("sortFilter");
  const limitFilter = document.getElementById("limitFilter");

  if (categoryFilter) {
    categoryFilter.addEventListener("change", (e) => {
      currentCategory = e.target.value;
      displayProducts();
    });
  }

  if (sortFilter) {
    sortFilter.addEventListener("change", (e) => {
      currentSort = e.target.value;
      displayProducts();
    });
  }

  if (limitFilter) {
    limitFilter.addEventListener("change", (e) => {
      currentLimit = parseInt(e.target.value);
      displayProducts();
    });
  }
}

function setActiveTab(tab) {
  activeTab = tab;

  // Update tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.tab === tab) {
      btn.classList.add("active");
    }
  });

  // Update tab content
  document.querySelectorAll(".control-tab").forEach((content) => {
    content.classList.remove("active");
    if (content.id === tab + "Tab") {
      content.classList.add("active");
    }
  });

  // Load appropriate content
  switch (tab) {
    case "products":
      displayProducts();
      break;
    case "orders":
      displayOrders();
      break;
    case "users":
      displayUsers();
      break;
    case "docs":
      displayDocs();
      break;
  }
}

function setDisplayMode(mode) {
  displayMode = mode;

  // Update display tab buttons
  document.querySelectorAll(".display-tab-btn").forEach((btn) => {
    btn.classList.remove("active");
    if (btn.dataset.mode === mode) {
      btn.classList.add("active");
    }
  });

  // Update display content
  document.querySelectorAll(".display-content").forEach((content) => {
    content.classList.remove("active");
    if (content.id === mode + "View") {
      content.classList.add("active");
    }
  });

  // Refresh current data based on active tab
  switch (activeTab) {
    case "products":
      displayProducts();
      break;
    case "orders":
      displayOrders();
      break;
    case "users":
      displayUsers();
      break;
  }
}

function displayProducts() {
  let products = [...MOCK_PRODUCTS];

  // Apply category filter
  if (currentCategory !== "all") {
    products = products.filter(
      (product) => product.category === currentCategory,
    );
  }

  // Apply sorting
  switch (currentSort) {
    case "price-low":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-high":
      products.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      products.sort((a, b) => b.rating.rate - a.rating.rate);
      break;
    case "name":
      products.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }

  // Apply limit
  if (currentLimit > 0) {
    products = products.slice(0, currentLimit);
  }

  // Update count badge
  updateCountBadge(products.length);

  // Display based on mode
  if (displayMode === "grid") {
    displayProductsGrid(products);
  } else if (displayMode === "list") {
    displayProductsList(products);
  } else if (displayMode === "json") {
    displayProductsJSON(products);
  }
}

function displayProductsGrid(products) {
  const container = document.getElementById("gridView");
  if (!container) return;

  container.innerHTML = `
        <div class="products-grid">
            ${products
              .map(
                (product) => `
                <div class="product-card">
                    <div class="product-header">
                        <div>
                            <h3 class="product-title">${product.title}</h3>
                            <span class="product-category">${product.category}</span>
                        </div>
                    </div>
                    <div class="product-price">$${product.price}</div>
                    <div class="product-description">${product.description}</div>
                    <div class="product-actions">
                        <button class="btn btn-primary btn-small" onclick="viewProduct(${product.id})">View Details</button>
                        <button class="btn btn-success btn-small" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>
    `;
}

function displayProductsList(products) {
  const container = document.getElementById("listView");
  if (!container) return;

  container.innerHTML = `
        <div class="list-container">
            ${products
              .map(
                (product) => `
                <div class="list-item">
                    <div class="list-item-content">
                        <div class="list-item-title">${product.title}</div>
                        <div class="list-item-description">$${product.price} - ${product.category}</div>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn btn-primary btn-small" onclick="viewProduct(${product.id})">View</button>
                        <button class="btn btn-success btn-small" onclick="addToCart(${product.id})">Add to Cart</button>
                    </div>
                </div>
            `,
              )
              .join("")}
        </div>
    `;
}

function displayProductsJSON(products) {
  const container = document.getElementById("jsonView");
  if (!container) return;

  container.innerHTML = `
        <div class="json-container">
            <pre>${JSON.stringify(products, null, 2)}</pre>
        </div>
    `;
}

function displayOrders() {
  if (displayMode === "grid") {
    displayOrdersGrid();
  } else if (displayMode === "list") {
    displayOrdersList();
  } else if (displayMode === "json") {
    displayOrdersJSON();
  }
}

function displayOrdersGrid() {
  const container = document.getElementById("gridView");
  if (!container) return;

  container.innerHTML = `
        <div class="orders-grid">
            ${MOCK_ORDERS.map(
              (order) => `
                <div class="order-card">
                    <div class="order-header">
                        <span class="order-id">Order #${order.id}</span>
                        <span class="order-status ${order.status}">${order.status}</span>
                    </div>
                    <div class="order-details">
                        <div class="order-detail">
                            <span class="order-detail-label">Date:</span>
                            <span class="order-detail-value">${order.date}</span>
                        </div>
                        <div class="order-detail">
                            <span class="order-detail-label">Items:</span>
                            <span class="order-detail-value">${order.products.length}</span>
                        </div>
                        <div class="order-detail">
                            <span class="order-detail-label">Customer:</span>
                            <span class="order-detail-value">User ${order.userId}</span>
                        </div>
                    </div>
                    <div class="order-total">Total: $${order.total}</div>
                </div>
            `,
            ).join("")}
        </div>
    `;
}

function displayOrdersList() {
  const container = document.getElementById("listView");
  if (!container) return;

  container.innerHTML = `
        <div class="list-container">
            ${MOCK_ORDERS.map(
              (order) => `
                <div class="list-item">
                    <div class="list-item-content">
                        <div class="list-item-title">Order #${order.id}</div>
                        <div class="list-item-description">${order.date} - $${order.total} - ${order.status}</div>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn btn-info btn-small" onclick="viewOrder(${order.id})">View Details</button>
                    </div>
                </div>
            `,
            ).join("")}
        </div>
    `;
}

function displayOrdersJSON() {
  const container = document.getElementById("jsonView");
  if (!container) return;

  container.innerHTML = `
        <div class="json-container">
            <pre>${JSON.stringify(MOCK_ORDERS, null, 2)}</pre>
        </div>
    `;
}

function displayUsers() {
  if (displayMode === "grid") {
    displayUsersGrid();
  } else if (displayMode === "list") {
    displayUsersList();
  } else if (displayMode === "json") {
    displayUsersJSON();
  }
}

function displayUsersGrid() {
  const container = document.getElementById("gridView");
  if (!container) return;

  container.innerHTML = `
        <div class="products-grid">
            ${MOCK_USERS.map(
              (user) => `
                <div class="product-card">
                    <div class="product-header">
                        <div>
                            <h3 class="product-title">${user.name.firstname} ${user.name.lastname}</h3>
                            <span class="product-category">@${user.username}</span>
                        </div>
                    </div>
                    <div class="product-description">
                        <strong>Email:</strong> ${user.email}<br>
                        <strong>Phone:</strong> ${user.phone}<br>
                        <strong>City:</strong> ${user.address.city}
                    </div>
                    <div class="product-actions">
                        <button class="btn btn-primary btn-small" onclick="viewUser(${user.id})">View Profile</button>
                        <button class="btn btn-info btn-small" onclick="viewUserOrders(${user.id})">View Orders</button>
                    </div>
                </div>
            `,
            ).join("")}
        </div>
    `;
}

function displayUsersList() {
  const container = document.getElementById("listView");
  if (!container) return;

  container.innerHTML = `
        <div class="list-container">
            ${MOCK_USERS.map(
              (user) => `
                <div class="list-item">
                    <div class="list-item-content">
                        <div class="list-item-title">${user.name.firstname} ${user.name.lastname}</div>
                        <div class="list-item-description">${user.email} - ${user.username}</div>
                    </div>
                    <div class="list-item-actions">
                        <button class="btn btn-primary btn-small" onclick="viewUser(${user.id})">Profile</button>
                        <button class="btn btn-info btn-small" onclick="viewUserOrders(${user.id})">Orders</button>
                    </div>
                </div>
            `,
            ).join("")}
        </div>
    `;
}

function displayUsersJSON() {
  const container = document.getElementById("jsonView");
  if (!container) return;

  container.innerHTML = `
        <div class="json-container">
            <pre>${JSON.stringify(MOCK_USERS, null, 2)}</pre>
        </div>
    `;
}

function displayDocs() {
  const container = document.getElementById("gridView");
  if (!container) return;

  container.innerHTML = `
        <div class="api-documentation">
            <h3>🚀 Fake Store API Documentation</h3>
            <div class="api-info">
                <p>This is a simulated e-commerce API with the following endpoints:</p>
            </div>

            <div class="endpoint-section">
                <h4>📦 Products</h4>
                <div class="endpoint-list">
                    <div class="endpoint-item">
                        <span class="method get">GET</span>
                        <span class="path">/products</span>
                        <span class="description">Get all products</span>
                    </div>
                    <div class="endpoint-item">
                        <span class="method get">GET</span>
                        <span class="path">/products/{id}</span>
                        <span class="description">Get product by ID</span>
                    </div>
                    <div class="endpoint-item">
                        <span class="method get">GET</span>
                        <span class="path">/products/categories</span>
                        <span class="description">Get all categories</span>
                    </div>
                    <div class="endpoint-item">
                        <span class="method get">GET</span>
                        <span class="path">/products/category/{category}</span>
                        <span class="description">Get products by category</span>
                    </div>
                </div>
            </div>

            <div class="endpoint-section">
                <h4>📋 Orders</h4>
                <div class="endpoint-list">
                    <div class="endpoint-item">
                        <span class="method get">GET</span>
                        <span class="path">/orders</span>
                        <span class="description">Get all orders</span>
                    </div>
                    <div class="endpoint-item">
                        <span class="method post">POST</span>
                        <span class="path">/orders</span>
                        <span class="description">Create new order</span>
                    </div>
                </div>
            </div>

            <div class="endpoint-section">
                <h4>👥 Users</h4>
                <div class="endpoint-list">
                    <div class="endpoint-item">
                        <span class="method get">GET</span>
                        <span class="path">/users</span>
                        <span class="description">Get all users</span>
                    </div>
                    <div class="endpoint-item">
                        <span class="method get">GET</span>
                        <span class="path">/users/{id}</span>
                        <span class="description">Get user by ID</span>
                    </div>
                    <div class="endpoint-item">
                        <span class="method post">POST</span>
                        <span class="path">/users</span>
                        <span class="description">Create new user</span>
                    </div>
                </div>
            </div>

            <div class="stats-section">
                <h3>📊 API Statistics</h3>
                <div class="stats-grid">
                    <div class="stat-item">
                        <div class="stat-number">${MOCK_PRODUCTS.length}</div>
                        <div class="stat-label">Products</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${MOCK_ORDERS.length}</div>
                        <div class="stat-label">Orders</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${MOCK_USERS.length}</div>
                        <div class="stat-label">Users</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">${MOCK_CATEGORIES.length}</div>
                        <div class="stat-label">Categories</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function populateFilters() {
  const categoryFilter = document.getElementById("categoryFilter");
  if (categoryFilter) {
    categoryFilter.innerHTML = `
            <option value="all">All Categories</option>
            ${MOCK_CATEGORIES.map(
              (category) => `<option value="${category}">${category}</option>`,
            ).join("")}
        `;
  }
}

function updateCountBadge(count) {
  const badge = document.querySelector(".count-badge");
  if (badge) {
    badge.textContent = `${count} items`;
  }
}

function updateStats() {
  const stats = {
    products: MOCK_PRODUCTS.length,
    orders: MOCK_ORDERS.length,
    users: MOCK_USERS.length,
    categories: MOCK_CATEGORIES.length,
  };

  // Update any stat displays
  document.querySelectorAll(".stat-number").forEach((el, index) => {
    const values = Object.values(stats);
    if (values[index] !== undefined) {
      el.textContent = values[index];
    }
  });
}

function showWelcomeMessage() {
  const responseBody = document.getElementById("responseBody");
  if (responseBody) {
    responseBody.innerHTML = `
            <div class="welcome-message">
                <h2>🛍️ Welcome to Fake Store API</h2>
                <p>This is a simulated e-commerce API with mock data for demonstration purposes.</p>

                <div class="features-overview">
                    <h3>✨ Features</h3>
                    <ul>
                        <li>Complete product catalog with ${MOCK_PRODUCTS.length} products</li>
                        <li>Order management system</li>
                        <li>User authentication simulation</li>
                        <li>Category filtering and search</li>
                        <li>JSON API responses</li>
                        <li>Responsive design</li>
                    </ul>
                </div>

                <div class="quick-actions">
                    <button class="btn btn-primary" onclick="testAllProducts()">🛍️ Get All Products</button>
                    <button class="btn btn-success" onclick="testCategories()">📂 Get Categories</button>
                    <button class="btn btn-info" onclick="testOrders()">📋 Get Orders</button>
                    <button class="btn btn-warning" onclick="testUsers()">👥 Get Users</button>
                </div>
            </div>
        `;
  }
}

// API endpoint simulation functions
function testAllProducts() {
  simulateAPICall("/products", MOCK_PRODUCTS);
}

function testCategories() {
  simulateAPICall("/categories", MOCK_CATEGORIES);
}

function testOrders() {
  simulateAPICall("/orders", MOCK_ORDERS);
}

function testUsers() {
  simulateAPICall("/users", MOCK_USERS);
}

function testProductById(id) {
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  if (product) {
    simulateAPICall(`/products/${id}`, product);
  } else {
    simulateAPIError(`Product with ID ${id} not found`, 404);
  }
}

function testProductsByCategory(category) {
  const products = MOCK_PRODUCTS.filter((p) => p.category === category);
  simulateAPICall(`/products/category/${category}`, products);
}

function searchProducts(query) {
  const products = MOCK_PRODUCTS.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()),
  );
  simulateAPICall(`/products/search?q=${query}`, products);
}

function simulateAPICall(endpoint, data) {
  const responseBody = document.getElementById("responseBody");
  if (responseBody) {
    // Simulate loading
    responseBody.innerHTML = '<div class="loading">⏳ Loading...</div>';

    // Simulate network delay
    setTimeout(
      () => {
        const response = {
          success: true,
          endpoint: endpoint,
          count: Array.isArray(data) ? data.length : 1,
          data: data,
          timestamp: new Date().toISOString(),
          cached: Math.random() > 0.5, // Random cache simulation
        };

        responseBody.innerHTML = `
                <div class="api-response">
                    <div class="response-header">
                        <h3>✅ API Response</h3>
                        <div class="response-meta">
                            <span class="endpoint">${endpoint}</span>
                            <span class="status success">200 OK</span>
                            <span class="timing">${Math.floor(Math.random() * 100) + 50}ms</span>
                        </div>
                    </div>

                    <div class="response-stats">
                        <div class="stat-item">
                            <div class="stat-number">${response.count}</div>
                            <div class="stat-label">Items</div>
                        </div>
                        <div class="stat-item">
                            <div class="stat-number">${response.cached ? "YES" : "NO"}</div>
                            <div class="stat-label">Cached</div>
                        </div>
                    </div>

                    <div class="json-container">
                        <pre>${JSON.stringify(response, null, 2)}</pre>
                    </div>
                </div>
            `;
      },
      Math.random() * 1000 + 500,
    );
  }
}

function simulateAPIError(message, status = 500) {
  const responseBody = document.getElementById("responseBody");
  if (responseBody) {
    responseBody.innerHTML = `
            <div class="api-response error">
                <div class="response-header">
                    <h3>❌ API Error</h3>
                    <div class="response-meta">
                        <span class="status error">${status} Error</span>
                    </div>
                </div>

                <div class="error-message">
                    <p>${message}</p>
                </div>
            </div>
        `;
  }
}

// Product interaction functions
function viewProduct(id) {
  testProductById(id);
}

function addToCart(id) {
  const product = MOCK_PRODUCTS.find((p) => p.id === id);
  if (product) {
    showNotification(`Added "${product.title}" to cart!`, "success");
    simulateAPICall("/cart/add", {
      productId: id,
      quantity: 1,
      added: true,
    });
  }
}

function viewOrder(id) {
  const order = MOCK_ORDERS.find((o) => o.id === id);
  if (order) {
    simulateAPICall(`/orders/${id}`, order);
  }
}

function viewUser(id) {
  const user = MOCK_USERS.find((u) => u.id === id);
  if (user) {
    simulateAPICall(`/users/${id}`, user);
  }
}

function viewUserOrders(userId) {
  const orders = MOCK_ORDERS.filter((o) => o.userId === userId);
  simulateAPICall(`/users/${userId}/orders`, orders);
}

function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === "success" ? "#27ae60" : "#3498db"};
        color: white;
        border-radius: 5px;
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Additional utility functions
function clearCache() {
  mockCache.clear();
  simulateAPICall("/cache/clear", {
    success: true,
    message: "Cache cleared successfully",
    size: 0,
  });
}

function getCacheStatus() {
  simulateAPICall("/cache/status", {
    size: mockCache.size,
    entries: Array.from(mockCache.keys()),
  });
}

function showHealth() {
  simulateAPICall("/health", {
    status: "healthy",
    uptime: Math.floor(Math.random() * 86400),
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
}

function showTestResults() {
  const responseBody = document.getElementById("responseBody");
  if (responseBody) {
    responseBody.innerHTML = `
            <div class="test-results">
                <h2>🧪 Test Results</h2>
                <div class="test-summary">
                    <div class="stat-item">
                        <div class="stat-number">✅ 100%</div>
                        <div class="stat-label">Pass Rate</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">25</div>
                        <div class="stat-label">Tests</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-number">0</div>
                        <div class="stat-label">Failures</div>
                    </div>
                </div>

                <div class="test-details">
                    <h3>Test Categories</h3>
                    <ul>
                        <li>✅ Product API endpoints (8 tests)</li>
                        <li>✅ Order management (6 tests)</li>
                        <li>✅ User authentication (5 tests)</li>
                        <li>✅ Category filtering (3 tests)</li>
                        <li>✅ Search functionality (3 tests)</li>
                    </ul>
                </div>
            </div>
        `;
  }
}

// Initialize mock cache with some sample data
function initializeMockCache() {
  mockCache.set("products_all", MOCK_PRODUCTS);
  mockCache.set("categories_all", MOCK_CATEGORIES);
  mockCache.set("orders_recent", MOCK_ORDERS.slice(0, 3));
}
