exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters, body } = event;

  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle CORS preflight requests
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Parse the path to determine server and endpoint
  const pathParts = path.split('/').filter(part => part !== '');
  const serverNum = pathParts[pathParts.length - 2]; // e.g., "server1"
  const endpoint = pathParts[pathParts.length - 1]; // e.g., "health"

  // Extract server number
  const serverNumber = serverNum ? parseInt(serverNum.replace('server', '')) : null;

  try {
    switch (serverNumber) {
      case 1:
        return handleServer1(httpMethod, endpoint, queryStringParameters, body, headers);
      case 2:
        return handleServer2(httpMethod, endpoint, queryStringParameters, body, headers);
      case 3:
        return handleServer3(httpMethod, endpoint, queryStringParameters, body, headers);
      default:
        return {
          statusCode: 404,
          headers,
          body: JSON.stringify({
            error: 'Server not found',
            message: 'Available servers: server1, server2, server3',
            available: ['server1', 'server2', 'server3']
          })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};

function handleServer1(method, endpoint, queryParams, body, headers) {
  const serverInfo = {
    name: "Basic Server",
    port: 3001,
    description: "Basic Express.js server with fundamental operations"
  };

  switch (method) {
    case 'GET':
      switch (endpoint) {
        case 'home':
        case '':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              message: "Welcome to Server 1 - Basic Operations",
              server: "Exercise 1 - Server 1",
              port: 3001,
              timestamp: new Date().toISOString(),
              description: serverInfo.description,
              endpoints: ['/', '/health', '/info', 'POST /echo']
            })
          };

        case 'health':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              status: "healthy",
              server: "Server 1",
              port: 3001,
              uptime: calculateUptime(),
              memory: `${(Math.random() * 20 + 40).toFixed(1)} MB`,
              timestamp: new Date().toISOString(),
              checks: {
                database: "connected",
                memory: "normal",
                cpu: "low"
              }
            })
          };

        case 'info':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              server: "Express.js Server 1",
              version: "1.0.0",
              port: 3001,
              environment: "production",
              features: ["health-check", "echo-service", "basic-routing"],
              timestamp: new Date().toISOString(),
              node_version: process.version,
              platform: process.platform
            })
          };

        default:
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
              error: 'Endpoint not found',
              server: 'Server 1',
              available: ['/', '/health', '/info', 'POST /echo']
            })
          };
      }

    case 'POST':
      if (endpoint === 'echo') {
        let requestData;
        try {
          requestData = JSON.parse(body || '{}');
        } catch {
          requestData = { message: "Invalid JSON in request body" };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            echoed: requestData,
            server: "Server 1",
            port: 3001,
            method: "POST",
            endpoint: "/echo",
            processedAt: new Date().toISOString(),
            originalSize: body ? body.length : 0
          })
        };
      }
      break;

    default:
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({
          error: 'Method not allowed',
          server: 'Server 1',
          allowed: ['GET', 'POST']
        })
      };
  }
}

function handleServer2(method, endpoint, queryParams, body, headers) {
  const serverInfo = {
    name: "Data Processing Server",
    port: 3002,
    description: "Data processing server with user management"
  };

  switch (method) {
    case 'GET':
      switch (endpoint) {
        case 'home':
        case '':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              message: "Welcome to Server 2 - Data Processing",
              server: "Exercise 1 - Server 2",
              port: 3002,
              timestamp: new Date().toISOString(),
              description: serverInfo.description,
              endpoints: ['/', '/health', '/users', '/random', 'POST /process']
            })
          };

        case 'health':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              status: "healthy",
              server: "Server 2",
              port: 3002,
              uptime: calculateUptime(),
              memory: `${(Math.random() * 15 + 50).toFixed(1)} MB`,
              activeConnections: Math.floor(Math.random() * 20 + 5),
              timestamp: new Date().toISOString(),
              dataProcessed: Math.floor(Math.random() * 1000 + 500)
            })
          };

        case 'users':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              users: [
                { id: 1, name: "Alice Johnson", role: "admin", lastLogin: "2024-01-15T10:30:00Z" },
                { id: 2, name: "Bob Smith", role: "user", lastLogin: "2024-01-15T09:45:00Z" },
                { id: 3, name: "Charlie Brown", role: "user", lastLogin: "2024-01-14T16:20:00Z" },
                { id: 4, name: "Diana Prince", role: "moderator", lastLogin: "2024-01-15T11:15:00Z" }
              ],
              total: 4,
              server: "Server 2",
              timestamp: new Date().toISOString(),
              activeUsers: Math.floor(Math.random() * 3 + 1)
            })
          };

        case 'random':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              randomNumber: Math.floor(Math.random() * 1000),
              randomFloat: parseFloat((Math.random() * 100).toFixed(2)),
              randomString: Math.random().toString(36).substring(7),
              randomBoolean: Math.random() > 0.5,
              randomArray: Array.from({length: 5}, () => Math.floor(Math.random() * 100)),
              timestamp: new Date().toISOString(),
              server: "Server 2"
            })
          };

        default:
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
              error: 'Endpoint not found',
              server: 'Server 2',
              available: ['/', '/health', '/users', '/random', 'POST /process']
            })
          };
      }

    case 'POST':
      if (endpoint === 'process') {
        let requestData;
        try {
          requestData = JSON.parse(body || '{}');
        } catch {
          requestData = { error: "Invalid JSON" };
        }

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            processed: requestData,
            results: {
              itemCount: Array.isArray(requestData) ? requestData.length : Object.keys(requestData).length,
              processingTime: `${Math.floor(Math.random() * 100 + 10)}ms`,
              status: "completed"
            },
            server: "Server 2",
            timestamp: new Date().toISOString()
          })
        };
      }
      break;

    default:
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({
          error: 'Method not allowed',
          server: 'Server 2',
          allowed: ['GET', 'POST']
        })
      };
  }
}

function handleServer3(method, endpoint, queryParams, body, headers) {
  const serverInfo = {
    name: "Utility Server",
    port: 3003,
    description: "Utility server with various tools and services"
  };

  switch (method) {
    case 'GET':
      switch (endpoint) {
        case 'home':
        case '':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              message: "Welcome to Server 3 - Utility Services",
              server: "Exercise 1 - Server 3",
              port: 3003,
              timestamp: new Date().toISOString(),
              description: serverInfo.description,
              endpoints: ['/', '/health', '/time', '/headers', 'POST /validate']
            })
          };

        case 'health':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              status: "healthy",
              server: "Server 3",
              port: 3003,
              uptime: calculateUptime(),
              memory: `${(Math.random() * 10 + 35).toFixed(1)} MB`,
              services: ["time", "validation", "headers", "status-codes"],
              timestamp: new Date().toISOString(),
              systemLoad: `${(Math.random() * 2).toFixed(2)}`
            })
          };

        case 'time':
          const now = new Date();
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              currentTime: now.toISOString(),
              timezone: "UTC",
              unixTimestamp: Math.floor(now.getTime() / 1000),
              formatted: now.toLocaleString(),
              dayOfWeek: now.toLocaleDateString('en-US', { weekday: 'long' }),
              month: now.toLocaleDateString('en-US', { month: 'long' }),
              server: "Server 3"
            })
          };

        case 'headers':
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
              receivedHeaders: {
                'user-agent': 'Netlify Functions Runtime',
                'accept': 'application/json',
                'content-type': 'application/json',
                'host': 'netlify-functions'
              },
              clientInfo: {
                method: 'GET',
                url: '/headers',
                timestamp: new Date().toISOString()
              },
              server: "Server 3",
              note: "This is a simulated headers response in serverless environment"
            })
          };

        case 'status':
          const statusCode = parseInt(queryParams?.code) || 200;
          return {
            statusCode: statusCode,
            headers,
            body: JSON.stringify({
              requestedStatus: statusCode,
              message: getStatusMessage(statusCode),
              server: "Server 3",
              timestamp: new Date().toISOString()
            })
          };

        default:
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({
              error: 'Endpoint not found',
              server: 'Server 3',
              available: ['/', '/health', '/time', '/headers', '/status?code=XXX', 'POST /validate']
            })
          };
      }

    case 'POST':
      if (endpoint === 'validate') {
        let requestData;
        try {
          requestData = JSON.parse(body || '{}');
        } catch {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              error: 'Invalid JSON',
              server: 'Server 3'
            })
          };
        }

        const validation = validateData(requestData);
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({
            data: requestData,
            validation: validation,
            server: "Server 3",
            timestamp: new Date().toISOString()
          })
        };
      }
      break;

    default:
      return {
        statusCode: 405,
        headers,
        body: JSON.stringify({
          error: 'Method not allowed',
          server: 'Server 3',
          allowed: ['GET', 'POST']
        })
      };
  }
}

function calculateUptime() {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const seconds = Math.floor(Math.random() * 60);
  return `${hours}h ${minutes}m ${seconds}s`;
}

function getStatusMessage(code) {
  const messages = {
    200: 'OK',
    201: 'Created',
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error'
  };
  return messages[code] || 'Unknown Status';
}

function validateData(data) {
  const validation = {
    isValid: true,
    errors: [],
    warnings: [],
    info: {}
  };

  if (!data || typeof data !== 'object') {
    validation.isValid = false;
    validation.errors.push('Data must be an object');
    return validation;
  }

  validation.info.fieldCount = Object.keys(data).length;
  validation.info.hasEmail = /\S+@\S+\.\S+/.test(JSON.stringify(data));
  validation.info.hasNumbers = /\d/.test(JSON.stringify(data));

  if (validation.info.fieldCount === 0) {
    validation.warnings.push('No fields provided');
  }

  if (validation.info.fieldCount > 10) {
    validation.warnings.push('Large number of fields detected');
  }

  return validation;
}
