// Static server simulator - no API calls, all client-side
const Exercise1 = {
  serverData: {
    1: {
      port: 3001,
      name: "Basic Server",
      description: "Basic Express.js server with fundamental operations",
      status: "online",
    },
    2: {
      port: 3002,
      name: "Data Processing Server",
      description: "Data processing server with user management",
      status: "online",
    },
    3: {
      port: 3003,
      name: "Utility Server",
      description: "Utility server providing various tools and services",
      status: "online",
    },
  },

  // Static mock data for each server
  mockData: {
    1: {
      home: {
        message: "Welcome to Server 1 - Basic Operations",
        server: "Exercise 1 - Server 1",
        port: 3001,
        description: "Basic Express.js server with fundamental operations",
        endpoints: ["/", "/health", "/info", "POST /echo"],
      },
      health: {
        status: "healthy",
        server: "Server 1",
        port: 3001,
        uptime: "2h 34m 12s",
        memory: "45.3 MB",
        checks: {
          database: "connected",
          memory: "normal",
          cpu: "low",
        },
      },
      info: {
        server: "Express.js Server 1",
        version: "1.0.0",
        port: 3001,
        environment: "production",
        features: ["health-check", "echo-service", "basic-routing"],
        node_version: "v18.17.0",
        platform: "linux",
      },
    },
    2: {
      home: {
        message: "Welcome to Server 2 - Data Processing",
        server: "Exercise 1 - Server 2",
        port: 3002,
        description: "Data processing server with user management",
        endpoints: ["/", "/health", "/users", "/random", "POST /process"],
      },
      health: {
        status: "healthy",
        server: "Server 2",
        port: 3002,
        uptime: "1h 45m 33s",
        memory: "52.7 MB",
        activeConnections: 12,
        dataProcessed: 847,
      },
      users: {
        users: [
          {
            id: 1,
            name: "Alice Johnson",
            role: "admin",
            lastLogin: "2024-01-15T10:30:00Z",
          },
          {
            id: 2,
            name: "Bob Smith",
            role: "user",
            lastLogin: "2024-01-15T09:45:00Z",
          },
          {
            id: 3,
            name: "Charlie Brown",
            role: "user",
            lastLogin: "2024-01-14T16:20:00Z",
          },
          {
            id: 4,
            name: "Diana Prince",
            role: "moderator",
            lastLogin: "2024-01-15T11:15:00Z",
          },
        ],
        total: 4,
        server: "Server 2",
        activeUsers: 2,
      },
      random: {
        randomNumber: 742,
        randomFloat: 67.42,
        randomString: "k3m9x2",
        randomBoolean: true,
        randomArray: [23, 67, 12, 89, 45],
        server: "Server 2",
      },
    },
    3: {
      home: {
        message: "Welcome to Server 3 - Utility Services",
        server: "Exercise 1 - Server 3",
        port: 3003,
        description: "Utility server with various tools and services",
        endpoints: ["/", "/health", "/time", "/headers", "POST /validate"],
      },
      health: {
        status: "healthy",
        server: "Server 3",
        port: 3003,
        uptime: "3h 12m 45s",
        memory: "38.9 MB",
        services: ["time", "validation", "headers", "status-codes"],
        systemLoad: "0.87",
      },
      time: {
        currentTime: new Date().toISOString(),
        timezone: "UTC",
        unixTimestamp: Math.floor(Date.now() / 1000),
        formatted: new Date().toLocaleString(),
        dayOfWeek: new Date().toLocaleDateString("en-US", { weekday: "long" }),
        month: new Date().toLocaleDateString("en-US", { month: "long" }),
        server: "Server 3",
      },
      headers: {
        receivedHeaders: {
          "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          accept: "application/json",
          "content-type": "application/json",
          host: "localhost:3003",
        },
        clientInfo: {
          method: "GET",
          url: "/headers",
        },
        server: "Server 3",
      },
    },
  },
};

// Static server testing function
async function testServer(serverNum, endpoint) {
  const responseDisplay = document.getElementById("responseDisplay");

  try {
    // Show loading
    responseDisplay.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Testing Server ${serverNum} - ${endpoint}...</p>
            </div>
        `;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Get mock data
    const endpointKey = endpoint === "/" ? "home" : endpoint.replace("/", "");
    const mockResponse = Exercise1.mockData[serverNum][endpointKey];

    if (!mockResponse) {
      throw new Error(`Endpoint ${endpoint} not found on Server ${serverNum}`);
    }

    // Add timestamp to response
    const response = {
      ...mockResponse,
      timestamp: new Date().toISOString(),
    };

    // Display success response
    responseDisplay.innerHTML = `
            <div class="response-success">
                <h3>✅ Server ${serverNum} Response</h3>
                <div class="response-details">
                    <strong>Endpoint:</strong> ${endpoint}<br>
                    <strong>Status:</strong> 200 OK<br>
                    <strong>Response Time:</strong> ${Math.floor(Math.random() * 50 + 10)}ms
                </div>
                <pre class="response-data">${JSON.stringify(response, null, 2)}</pre>
            </div>
        `;

    console.log(
      `✅ Server ${serverNum} ${endpoint} test successful:`,
      response,
    );
  } catch (error) {
    // Display error response
    responseDisplay.innerHTML = `
            <div class="response-error">
                <h3>❌ Server ${serverNum} Error</h3>
                <div class="error-details">
                    <strong>Endpoint:</strong> ${endpoint}<br>
                    <strong>Error:</strong> ${error.message}
                </div>
            </div>
        `;

    console.error(`❌ Server ${serverNum} ${endpoint} test failed:`, error);
  }
}

// Static echo testing function
async function testEcho(serverNum) {
  const responseDisplay = document.getElementById("responseDisplay");

  try {
    // Show loading
    responseDisplay.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
                <p>Testing Echo on Server ${serverNum}...</p>
            </div>
        `;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Create sample echo data
    const echoData = {
      message: "Hello from client!",
      testData: {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        random: Math.random(),
      },
    };

    // Mock echo response
    const response = {
      echoed: echoData,
      server: `Server ${serverNum}`,
      port: Exercise1.serverData[serverNum].port,
      method: "POST",
      endpoint: "/echo",
      processedAt: new Date().toISOString(),
      originalSize: JSON.stringify(echoData).length,
    };

    // Display success response
    responseDisplay.innerHTML = `
            <div class="response-success">
                <h3>✅ Server ${serverNum} Echo Response</h3>
                <div class="response-details">
                    <strong>Endpoint:</strong> POST /echo<br>
                    <strong>Status:</strong> 200 OK<br>
                    <strong>Response Time:</strong> ${Math.floor(Math.random() * 80 + 20)}ms
                </div>
                <pre class="response-data">${JSON.stringify(response, null, 2)}</pre>
            </div>
        `;

    console.log(`✅ Server ${serverNum} echo test successful:`, response);
  } catch (error) {
    // Display error response
    responseDisplay.innerHTML = `
            <div class="response-error">
                <h3>❌ Server ${serverNum} Echo Error</h3>
                <div class="error-details">
                    <strong>Endpoint:</strong> POST /echo<br>
                    <strong>Error:</strong> ${error.message}
                </div>
            </div>
        `;

    console.error(`❌ Server ${serverNum} echo test failed:`, error);
  }
}

// Generate random data for Server 2
function generateRandomData() {
  return {
    randomNumber: Math.floor(Math.random() * 1000),
    randomFloat: parseFloat((Math.random() * 100).toFixed(2)),
    randomString: Math.random().toString(36).substring(7),
    randomBoolean: Math.random() > 0.5,
    randomArray: Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 100),
    ),
    server: "Server 2",
  };
}

// Update time data for Server 3
function updateTimeData() {
  const now = new Date();
  Exercise1.mockData[3].time = {
    currentTime: now.toISOString(),
    timezone: "UTC",
    unixTimestamp: Math.floor(now.getTime() / 1000),
    formatted: now.toLocaleString(),
    dayOfWeek: now.toLocaleDateString("en-US", { weekday: "long" }),
    month: now.toLocaleDateString("en-US", { month: "long" }),
    server: "Server 3",
  };
}

// Initialize the static simulation
function initializeExercise1() {
  console.log("🖥️ Exercise 1 Static Demo loaded");
  console.log("📊 Server data:", Exercise1.serverData);

  // Update dynamic data every few seconds
  setInterval(() => {
    // Update random data for Server 2
    Exercise1.mockData[2].random = generateRandomData();

    // Update time data for Server 3
    updateTimeData();

    // Update health metrics with slight variations
    Exercise1.mockData[1].health.memory = `${(Math.random() * 10 + 40).toFixed(1)} MB`;
    Exercise1.mockData[2].health.memory = `${(Math.random() * 15 + 45).toFixed(1)} MB`;
    Exercise1.mockData[3].health.memory = `${(Math.random() * 8 + 35).toFixed(1)} MB`;

    Exercise1.mockData[2].health.activeConnections = Math.floor(
      Math.random() * 20 + 5,
    );
    Exercise1.mockData[2].health.dataProcessed = Math.floor(
      Math.random() * 500 + 500,
    );
    Exercise1.mockData[3].health.systemLoad = (Math.random() * 2).toFixed(2);
  }, 3000);

  // Set initial welcome message
  const responseDisplay = document.getElementById("responseDisplay");
  if (responseDisplay) {
    responseDisplay.innerHTML = `
            <div class="welcome-message">
                <h3>🖥️ Static Server Simulator Ready</h3>
                <p>This demo simulates 3 Express.js servers running on different ports.</p>
                <p>Click any button above to test different server endpoints!</p>
                <div class="server-status">
                    <div class="status-item">
                        <span class="status-dot online"></span>
                        Server 1 (Port 3001) - Online
                    </div>
                    <div class="status-item">
                        <span class="status-dot online"></span>
                        Server 2 (Port 3002) - Online
                    </div>
                    <div class="status-item">
                        <span class="status-dot online"></span>
                        Server 3 (Port 3003) - Online
                    </div>
                </div>
            </div>
        `;
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initializeExercise1);
