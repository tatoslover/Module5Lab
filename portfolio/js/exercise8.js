// Exercise 8: eCommerce API
// This file handles the portfolio interactions with the eCommerce API

class Exercise8 {
  constructor() {
    this.baseUrl = "http://localhost:3008";
    this.currentData = [];
    this.currentView = "products";
    this.currentDisplayMode = "grid";
    this.stats = {
      totalProducts: 0,
      totalOrders: 0,
      totalUsers: 0,
      totalRevenue: 0,
    };
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadInitialData();
    this.updateStats();
  }

  setupEventListeners() {
    // Add product form listener
    const addProductForm = document.getElementById("addProductForm");
    if (addProductForm) {
      addProductForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this.handleAddProduct();
      });
    }

    // Modal close on outside click
    const modal = document.getElementById("addProductModal");
    if (modal) {
      modal.addEventListener("click", (e) => {
        if (e.target === modal) {
          this.closeAddProductForm();
        }
      });
    }

    // Filter inputs
    const categoryFilter = document.getElementById("categoryFilter");
    const productSearch = document.getElementById("productSearch");
    const orderStatusFilter = document.getElementById("orderStatusFilter");
    const orderDateFilter = document.getElementById("orderDateFilter");

    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => {
        this.applyProductFilters();
      });
    }

    if (productSearch) {
      productSearch.addEventListener(
        "input",
        this.debounce(() => {
          this.applyProductFilters();
        }, 300),
      );
    }

    if (orderStatusFilter) {
      orderStatusFilter.addEventListener("change", () => {
        this.applyOrderFilters();
      });
    }

    if (orderDateFilter) {
      orderDateFilter.addEventListener("change", () => {
        this.applyOrderFilters();
      });
    }
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  async makeRequest(url, options = {}) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("API Request failed:", error);
      // Return mock data for demo purposes
      return this.getMockData(url, options);
    }
  }

  getMockData(url, options) {
    const method = options.method || "GET";

    if (url.includes("/products")) {
      if (method === "GET") {
        return {
          success: true,
          data: this.generateMockProducts(),
          total: 25,
        };
      } else if (method === "POST") {
        return {
          success: true,
          data: { id: Date.now(), ...JSON.parse(options.body) },
          message: "Product created successfully",
        };
      }
    } else if (url.includes("/orders")) {
      if (method === "GET") {
        return {
          success: true,
          data: this.generateMockOrders(),
          total: 15,
        };
      } else if (method === "POST") {
        return {
          success: true,
          data: { id: Date.now(), status: "pending" },
          message: "Order created successfully",
        };
      }
    } else if (url.includes("/users")) {
      return {
        success: true,
        data: this.generateMockUsers(),
        total: 50,
      };
    }

    return { success: false, message: "API not available - using mock data" };
  }

  generateMockProducts() {
    const categories = ["electronics", "clothing", "books", "home"];
    const products = [];

    for (let i = 1; i <= 12; i++) {
      const category =
        categories[Math.floor(Math.random() * categories.length)];
      const price = Math.floor(Math.random() * 500) + 10;
      const stock = Math.floor(Math.random() * 100);

      products.push({
        id: i,
        name: `Product ${i}`,
        category: category,
        price: price,
        description: `This is a sample ${category} product with great features and quality.`,
        stock: stock,
        image: `https://via.placeholder.com/200x200?text=Product+${i}`,
        created_at: new Date(
          Date.now() - Math.random() * 10000000000,
        ).toISOString(),
      });
    }

    return products;
  }

  generateMockOrders() {
    const statuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];
    const orders = [];

    for (let i = 1; i <= 8; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const total = Math.floor(Math.random() * 1000) + 50;
      const itemCount = Math.floor(Math.random() * 5) + 1;

      orders.push({
        id: i,
        customer_id: Math.floor(Math.random() * 50) + 1,
        customer_name: `Customer ${i}`,
        status: status,
        total: total,
        items: itemCount,
        created_at: new Date(
          Date.now() - Math.random() * 10000000000,
        ).toISOString(),
        updated_at: new Date().toISOString(),
      });
    }

    return orders;
  }

  generateMockUsers() {
    const users = [];

    for (let i = 1; i <= 10; i++) {
      users.push({
        id: i,
        name: `User ${i}`,
        email: `user${i}@example.com`,
        joined: new Date(
          Date.now() - Math.random() * 10000000000,
        ).toISOString(),
        orders: Math.floor(Math.random() * 20),
        total_spent: Math.floor(Math.random() * 5000),
      });
    }

    return users;
  }

  async loadInitialData() {
    this.showLoading();
    try {
      await this.loadAllProducts();
    } catch (error) {
      this.showError("Failed to load initial data");
    }
  }

  async loadAllProducts() {
    this.showLoading();
    this.currentView = "products";

    try {
      const response = await this.makeRequest(`${this.baseUrl}/api/products`);

      if (response.success) {
        this.currentData = response.data || [];
        this.displayProducts(this.currentData);
        this.updateDataCount(this.currentData.length, "products");
        this.updateStats();
      } else {
        throw new Error(response.message || "Failed to load products");
      }
    } catch (error) {
      this.showError(`Failed to load products: ${error.message}`);
    }
  }

  async loadAllOrders() {
    this.showLoading();
    this.currentView = "orders";

    try {
      const response = await this.makeRequest(`${this.baseUrl}/api/orders`);

      if (response.success) {
        this.currentData = response.data || [];
        this.displayOrders(this.currentData);
        this.updateDataCount(this.currentData.length, "orders");
        this.updateStats();
      } else {
        throw new Error(response.message || "Failed to load orders");
      }
    } catch (error) {
      this.showError(`Failed to load orders: ${error.message}`);
    }
  }

  async loadAllUsers() {
    this.showLoading();
    this.currentView = "users";

    try {
      const response = await this.makeRequest(`${this.baseUrl}/api/users`);

      if (response.success) {
        this.currentData = response.data || [];
        this.displayUsers(this.currentData);
        this.updateDataCount(this.currentData.length, "users");
        this.updateStats();
      } else {
        throw new Error(response.message || "Failed to load users");
      }
    } catch (error) {
      this.showError(`Failed to load users: ${error.message}`);
    }
  }

  displayProducts(products) {
    const container = document.getElementById("grid");

    if (!products.length) {
      container.innerHTML = `
                <div class="no-results">
                    <h3>📦 No products found</h3>
                    <p>Try adjusting your filters or add some products to get started!</p>
                </div>
            `;
      return;
    }

    if (this.currentDisplayMode === "grid") {
      const productsGrid = products
        .map((product) => this.createProductCard(product))
        .join("");
      container.innerHTML = `<div class="products-grid">${productsGrid}</div>`;
    } else {
      this.displayList(products, "product");
    }

    this.updateJSONView(products);
  }

  createProductCard(product) {
    const stockStatus =
      product.stock > 20
        ? "in-stock"
        : product.stock > 0
          ? "low-stock"
          : "out-of-stock";
    const stockText =
      product.stock > 20
        ? "In Stock"
        : product.stock > 0
          ? "Low Stock"
          : "Out of Stock";

    return `
            <div class="product-card">
                <div class="product-header">
                    <div>
                        <div class="product-title">${product.name}</div>
                        <div class="product-category">${product.category}</div>
                    </div>
                    <div class="product-price">$${product.price}</div>
                </div>
                <div class="product-description">${product.description}</div>
                <div class="product-stock">
                    <span class="stock-badge ${stockStatus}">${stockText}</span>
                    <span class="stock-count">${product.stock} available</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-info btn-small" onclick="exercise8.editProduct(${product.id})">
                        ✏️ Edit
                    </button>
                    <button class="btn btn-warning btn-small" onclick="exercise8.duplicateProduct(${product.id})">
                        📋 Duplicate
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="exercise8.deleteProduct(${product.id})">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
  }

  displayOrders(orders) {
    const container = document.getElementById("grid");

    if (!orders.length) {
      container.innerHTML = `
                <div class="no-results">
                    <h3>📋 No orders found</h3>
                    <p>Try adjusting your filters or create some test orders!</p>
                </div>
            `;
      return;
    }

    if (this.currentDisplayMode === "grid") {
      const ordersGrid = orders
        .map((order) => this.createOrderCard(order))
        .join("");
      container.innerHTML = `<div class="orders-grid">${ordersGrid}</div>`;
    } else {
      this.displayList(orders, "order");
    }

    this.updateJSONView(orders);
  }

  createOrderCard(order) {
    const statusClass = order.status.toLowerCase();
    const orderDate = new Date(order.created_at).toLocaleDateString();

    return `
            <div class="order-card">
                <div class="order-header">
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-status ${statusClass}">${order.status}</div>
                </div>
                <div class="order-details">
                    <div class="order-detail">
                        <span class="order-detail-label">Customer:</span>
                        <span class="order-detail-value">${order.customer_name}</span>
                    </div>
                    <div class="order-detail">
                        <span class="order-detail-label">Date:</span>
                        <span class="order-detail-value">${orderDate}</span>
                    </div>
                    <div class="order-detail">
                        <span class="order-detail-label">Items:</span>
                        <span class="order-detail-value">${order.items}</span>
                    </div>
                </div>
                <div class="order-total">Total: $${order.total}</div>
                <div class="product-actions">
                    <button class="btn btn-info btn-small" onclick="exercise8.viewOrder(${order.id})">
                        👁️ View
                    </button>
                    <button class="btn btn-warning btn-small" onclick="exercise8.updateOrderStatus(${order.id})">
                        📝 Update
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="exercise8.cancelOrder(${order.id})">
                        ❌ Cancel
                    </button>
                </div>
            </div>
        `;
  }

  displayUsers(users) {
    const container = document.getElementById("grid");

    if (!users.length) {
      container.innerHTML = `
                <div class="no-results">
                    <h3>👥 No users found</h3>
                    <p>Create some test users to get started!</p>
                </div>
            `;
      return;
    }

    if (this.currentDisplayMode === "grid") {
      const usersGrid = users.map((user) => this.createUserCard(user)).join("");
      container.innerHTML = `<div class="products-grid">${usersGrid}</div>`;
    } else {
      this.displayList(users, "user");
    }

    this.updateJSONView(users);
  }

  createUserCard(user) {
    const joinDate = new Date(user.joined).toLocaleDateString();

    return `
            <div class="product-card">
                <div class="product-header">
                    <div>
                        <div class="product-title">${user.name}</div>
                        <div class="product-category">Customer</div>
                    </div>
                </div>
                <div class="product-description">${user.email}</div>
                <div class="product-stock">
                    <span class="stock-badge in-stock">Active</span>
                    <span class="stock-count">Joined: ${joinDate}</span>
                </div>
                <div class="order-details">
                    <div class="order-detail">
                        <span class="order-detail-label">Orders:</span>
                        <span class="order-detail-value">${user.orders}</span>
                    </div>
                    <div class="order-detail">
                        <span class="order-detail-label">Total Spent:</span>
                        <span class="order-detail-value">$${user.total_spent}</span>
                    </div>
                </div>
                <div class="product-actions">
                    <button class="btn btn-info btn-small" onclick="exercise8.viewUser(${user.id})">
                        👁️ View
                    </button>
                    <button class="btn btn-warning btn-small" onclick="exercise8.editUser(${user.id})">
                        ✏️ Edit
                    </button>
                    <button class="btn btn-secondary btn-small" onclick="exercise8.deleteUser(${user.id})">
                        🗑️ Delete
                    </button>
                </div>
            </div>
        `;
  }

  displayList(items, type) {
    const listContainer = document.getElementById("list");
    const listItems = items
      .map((item) => this.createListItem(item, type))
      .join("");
    listContainer.innerHTML = `<div class="list-container">${listItems}</div>`;
  }

  createListItem(item, type) {
    let icon, title, description;

    switch (type) {
      case "product":
        icon = "📦";
        title = `${item.name} - $${item.price}`;
        description = `${item.category} | Stock: ${item.stock}`;
        break;
      case "order":
        icon = "📋";
        title = `Order #${item.id} - $${item.total}`;
        description = `${item.customer_name} | ${item.status}`;
        break;
      case "user":
        icon = "👤";
        title = `${item.name}`;
        description = `${item.email} | ${item.orders} orders`;
        break;
      default:
        icon = "📄";
        title = "Item";
        description = "Description";
    }

    return `
            <div class="list-item">
                <div class="list-item-icon">${icon}</div>
                <div class="list-item-content">
                    <div class="list-item-title">${title}</div>
                    <div class="list-item-description">${description}</div>
                </div>
                <div class="list-item-actions">
                    <button class="btn btn-info btn-small">View</button>
                    <button class="btn btn-warning btn-small">Edit</button>
                </div>
            </div>
        `;
  }

  updateJSONView(data) {
    const jsonContainer = document.getElementById("jsonOutput");
    if (jsonContainer) {
      jsonContainer.textContent = JSON.stringify(data, null, 2);
    }
  }

  // Filter functions
  applyProductFilters() {
    const categoryFilter = document.getElementById("categoryFilter").value;
    const searchQuery = document
      .getElementById("productSearch")
      .value.toLowerCase();

    let filteredData = [...this.currentData];

    if (categoryFilter) {
      filteredData = filteredData.filter(
        (product) => product.category === categoryFilter,
      );
    }

    if (searchQuery) {
      filteredData = filteredData.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.description.toLowerCase().includes(searchQuery),
      );
    }

    this.displayProducts(filteredData);
    this.updateDataCount(filteredData.length, "products");
  }

  applyOrderFilters() {
    const statusFilter = document.getElementById("orderStatusFilter").value;
    const dateFilter = document.getElementById("orderDateFilter").value;

    let filteredData = [...this.currentData];

    if (statusFilter) {
      filteredData = filteredData.filter(
        (order) => order.status === statusFilter,
      );
    }

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      filteredData = filteredData.filter((order) => {
        const orderDate = new Date(order.created_at);
        return orderDate.toDateString() === filterDate.toDateString();
      });
    }

    this.displayOrders(filteredData);
    this.updateDataCount(filteredData.length, "orders");
  }

  // Action functions
  async addProductForm() {
    this.showAddProductForm();
  }

  showAddProductForm() {
    const modal = document.getElementById("addProductModal");
    if (modal) {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";

      const firstInput = modal.querySelector('input[type="text"]');
      if (firstInput) {
        setTimeout(() => firstInput.focus(), 100);
      }
    }
  }

  closeAddProductForm() {
    const modal = document.getElementById("addProductModal");
    if (modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";

      const form = document.getElementById("addProductForm");
      if (form) {
        form.reset();
      }
    }
  }

  async handleAddProduct() {
    const name = document.getElementById("productName").value.trim();
    const category = document.getElementById("productCategory").value;
    const price = parseFloat(document.getElementById("productPrice").value);
    const description = document
      .getElementById("productDescription")
      .value.trim();
    const stock = parseInt(document.getElementById("productStock").value);

    if (!name || !category || !price || !description || isNaN(stock)) {
      this.showError("Please fill in all fields correctly");
      return;
    }

    try {
      const response = await this.makeRequest(`${this.baseUrl}/api/products`, {
        method: "POST",
        body: JSON.stringify({ name, category, price, description, stock }),
      });

      if (response.success) {
        this.closeAddProductForm();
        this.loadAllProducts();
        this.showSuccess("Product added successfully!");
      } else {
        throw new Error(response.message || "Failed to add product");
      }
    } catch (error) {
      this.showError(`Failed to add product: ${error.message}`);
    }
  }

  async createTestOrder() {
    const orderData = {
      customer_id: Math.floor(Math.random() * 50) + 1,
      items: [
        { product_id: 1, quantity: 2, price: 29.99 },
        { product_id: 2, quantity: 1, price: 19.99 },
      ],
    };

    try {
      const response = await this.makeRequest(`${this.baseUrl}/api/orders`, {
        method: "POST",
        body: JSON.stringify(orderData),
      });

      if (response.success) {
        this.showSuccess("Test order created successfully!");
        if (this.currentView === "orders") {
          this.loadAllOrders();
        }
      } else {
        throw new Error(response.message || "Failed to create order");
      }
    } catch (error) {
      this.showError(`Failed to create order: ${error.message}`);
    }
  }

  async createTestUser() {
    const userData = {
      name: `Test User ${Date.now()}`,
      email: `user${Date.now()}@example.com`,
      password: "password123",
    };

    try {
      const response = await this.makeRequest(`${this.baseUrl}/api/users`, {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (response.success) {
        this.showSuccess("Test user created successfully!");
        if (this.currentView === "users") {
          this.loadAllUsers();
        }
      } else {
        throw new Error(response.message || "Failed to create user");
      }
    } catch (error) {
      this.showError(`Failed to create user: ${error.message}`);
    }
  }

  async loadCategories() {
    try {
      const response = await this.makeRequest(`${this.baseUrl}/api/categories`);

      if (response.success) {
        this.displayCategories(response.data);
      } else {
        // Show mock categories
        const categories = [
          { id: 1, name: "Electronics", products: 8 },
          { id: 2, name: "Clothing", products: 12 },
          { id: 3, name: "Books", products: 6 },
          { id: 4, name: "Home & Garden", products: 9 },
        ];
        this.displayCategories(categories);
      }
    } catch (error) {
      this.showError(`Failed to load categories: ${error.message}`);
    }
  }

  displayCategories(categories) {
    const container = document.getElementById("grid");
    const categoriesGrid = categories
      .map(
        (category) => `
            <div class="product-card">
                <div class="product-header">
                    <div class="product-title">${category.name}</div>
                </div>
                <div class="product-description">Category with ${category.products} products</div>
                <div class="product-actions">
                    <button class="btn btn-info btn-small" onclick="exercise8.filterByCategory('${category.name.toLowerCase()}')">
                        👁️ View Products
                    </button>
                    <button class="btn btn-warning btn-small">
                        ✏️ Edit
                    </button>
                </div>
            </div>
        `,
      )
      .join("");

    container.innerHTML = `<div class="products-grid">${categoriesGrid}</div>`;
  }

  filterByCategory(category) {
    document.getElementById("categoryFilter").value = category;
    this.applyProductFilters();
  }

  // Analytics functions
  async getSalesReport() {
    this.showLoading();

    const salesData = {
      totalSales: 45680,
      monthlyGrowth: 15.5,
      topProducts: [
        { name: "Product 1", sales: 1250 },
        { name: "Product 2", sales: 980 },
        { name: "Product 3", sales: 750 },
      ],
      salesByMonth: [
        { month: "Jan", sales: 3200 },
        { month: "Feb", sales: 3800 },
        { month: "Mar", sales: 4200 },
      ],
    };

    this.displayAnalytics(salesData, "Sales Report");
  }

  async getProductAnalytics() {
    this.showLoading();

    const productData = {
      totalProducts: 156,
      lowStock: 12,
      outOfStock: 3,
      categories: [
        { name: "Electronics", count: 45 },
        { name: "Clothing", count: 67 },
        { name: "Books", count: 28 },
        { name: "Home", count: 16 },
      ],
    };

    this.displayAnalytics(productData, "Product Analytics");
  }

  displayAnalytics(data, title) {
    const container = document.getElementById("grid");
    container.innerHTML = `
            <div class="analytics-display">
                <h3>${title}</h3>
                <div class="analytics-content">
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                </div>
            </div>
        `;
  }

  // Tab switching
  showControlTab(tabName) {
    document
      .querySelectorAll(".tab-btn")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".control-tab")
      .forEach((tab) => tab.classList.remove("active"));

    document
      .querySelector(`[onclick="showControlTab('${tabName}')"]`)
      .classList.add("active");
    document.getElementById(tabName).classList.add("active");
  }

  showDisplayTab(tabName) {
    document
      .querySelectorAll(".display-tab-btn")
      .forEach((btn) => btn.classList.remove("active"));
    document
      .querySelectorAll(".display-content")
      .forEach((content) => content.classList.remove("active"));

    document
      .querySelector(`[onclick="showDisplayTab('${tabName}')"]`)
      .classList.add("active");
    document.getElementById(tabName).classList.add("active");

    this.currentDisplayMode = tabName;

    // Re-render current data in new mode
    if (this.currentData.length > 0) {
      switch (this.currentView) {
        case "products":
          this.displayProducts(this.currentData);
          break;
        case "orders":
          this.displayOrders(this.currentData);
          break;
        case "users":
          this.displayUsers(this.currentData);
          break;
      }
    }
  }

  // Utility functions
  showLoading() {
    const container = document.getElementById("grid");
    container.innerHTML = `
            <div class="loading">
                <div class="loading-spinner"></div>
                <p>Loading data...</p>
            </div>
        `;
  }

  showError(message) {
    const container = document.getElementById("grid");
    container.innerHTML = `
            <div class="error">
                <h3>❌ Error</h3>
                <p>${message}</p>
                <button class="btn btn-primary" onclick="exercise8.loadInitialData()">
                    🔄 Try Again
                </button>
            </div>
        `;
  }

  showSuccess(message) {
    const container = document.getElementById("grid");
    const existingContent = container.innerHTML;

    container.innerHTML = `
            <div class="success">
                <h3>✅ Success</h3>
                <p>${message}</p>
            </div>
            ${existingContent}
        `;

    setTimeout(() => {
      const successEl = container.querySelector(".success");
      if (successEl) {
        successEl.remove();
      }
    }, 3000);
  }

  updateDataCount(count, type) {
    const countElement = document.getElementById("dataCount");
    if (countElement) {
      countElement.textContent = `${count} ${type}`;
    }
  }

  updateStats() {
    // Update stats based on current data
    if (this.currentView === "products") {
      this.stats.totalProducts = this.currentData.length;
    } else if (this.currentView === "orders") {
      this.stats.totalOrders = this.currentData.length;
      this.stats.totalRevenue = this.currentData.reduce(
        (sum, order) => sum + order.total,
        0,
      );
    } else if (this.currentView === "users") {
      this.stats.totalUsers = this.currentData.length;
    }

    // Update DOM
    document.getElementById("totalProducts").textContent =
      this.stats.totalProducts;
    document.getElementById("totalOrders").textContent = this.stats.totalOrders;
    document.getElementById("totalUsers").textContent = this.stats.totalUsers;
    document.getElementById("totalRevenue").textContent =
      `$${this.stats.totalRevenue}`;
  }

  openSwaggerDocs() {
    window.open(`${this.baseUrl}/api-docs`, "_blank");
  }

  // Placeholder functions for actions
  editProduct(id) {
    console.log("Edit product", id);
  }
  duplicateProduct(id) {
    console.log("Duplicate product", id);
  }
  deleteProduct(id) {
    console.log("Delete product", id);
  }
  viewOrder(id) {
    console.log("View order", id);
  }
  updateOrderStatus(id) {
    console.log("Update order status", id);
  }
  cancelOrder(id) {
    console.log("Cancel order", id);
  }
  viewUser(id) {
    console.log("View user", id);
  }
  editUser(id) {
    console.log("Edit user", id);
  }
  deleteUser(id) {
    console.log("Delete user", id);
  }
  checkInventory() {
    console.log("Check inventory");
  }
  getOrderStats() {
    console.log("Get order stats");
  }
  processPendingOrders() {
    console.log("Process pending orders");
  }
  getUserStats() {
    console.log("Get user stats");
  }
  getShoppingCarts() {
    console.log("Get shopping carts");
  }
  getCustomerAnalytics() {
    console.log("Get customer analytics");
  }
  getInventoryReport() {
    console.log("Get inventory report");
  }
}

// Global functions for onclick handlers
function showControlTab(tabName) {
  exercise8.showControlTab(tabName);
}

function showDisplayTab(tabName) {
  exercise8.showDisplayTab(tabName);
}

async function loadAllProducts() {
  await exercise8.loadAllProducts();
}

async function loadAllOrders() {
  await exercise8.loadAllOrders();
}

async function loadAllUsers() {
  await exercise8.loadAllUsers();
}

function addProductForm() {
  exercise8.addProductForm();
}

function closeAddProductForm() {
  exercise8.closeAddProductForm();
}

async function createTestOrder() {
  await exercise8.createTestOrder();
}

async function createTestUser() {
  await exercise8.createTestUser();
}

async function loadCategories() {
  await exercise8.loadCategories();
}

function applyProductFilters() {
  exercise8.applyProductFilters();
}

function applyOrderFilters() {
  exercise8.applyOrderFilters();
}

function checkInventory() {
  exercise8.checkInventory();
}

function getOrderStats() {
  exercise8.getOrderStats();
}

function processPendingOrders() {
  exercise8.processPendingOrders();
}

function getUserStats() {
  exercise8.getUserStats();
}

function getShoppingCarts() {
  exercise8.getShoppingCarts();
}

async function getSalesReport() {
  await exercise8.getSalesReport();
}

async function getProductAnalytics() {
  await exercise8.getProductAnalytics();
}

async function getCustomerAnalytics() {
  await exercise8.getCustomerAnalytics();
}

function getInventoryReport() {
  exercise8.getInventoryReport();
}

function openSwaggerDocs() {
  exercise8.openSwaggerDocs();
}

// Initialize the application
const exercise8 = new Exercise8();

// Add some helpful console messages
console.log("🛒 Exercise 8: eCommerce API");
console.log("API Base URL:", exercise8.baseUrl);
console.log(
  "Features: Product Management, Order Processing, User Management, Swagger Documentation",
);
console.log(
  "Swagger Documentation available at: http://localhost:3008/api-docs",
);
