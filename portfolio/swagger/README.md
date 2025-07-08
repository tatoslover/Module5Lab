# Module 5 Lab - Swagger API Documentation

This directory contains comprehensive OpenAPI 3.0 specifications for all 8 exercises in the Module 5 Lab. Each exercise has its own dedicated swagger documentation file that provides detailed API endpoint documentation, request/response schemas, and interactive testing capabilities.

## Documentation Files

| Exercise | File | Description | Port |
|----------|------|-------------|------|
| Exercise 1 | `exercise1.yaml` | Multi-Port Server Management | 3001-3003 |
| Exercise 2 | `exercise2.yaml` | Basic Calculator API | 3004 |
| Exercise 3 | `exercise3.yaml` | Calculator with Portfolio Integration | 3005 |
| Exercise 4 | `exercise4.yaml` | Friends Management API | 3006 |
| Exercise 5 | `exercise5.yaml` | Friends API with MVC Architecture | 3007 |
| Exercise 6 | `exercise6.yaml` | Calculator API with Tests | 3008 |
| Exercise 7 | `exercise7.yaml` | Enhanced Calculator with Libraries | 3009 |
| Exercise 8 | `exercise8.yaml` | eCommerce Store API | 3010 |

## Features

### 🔧 Interactive Documentation
- **Try It Out**: Test API endpoints directly from the documentation
- **Real-time Response**: See actual API responses with your test data
- **Request Examples**: Pre-populated examples for every endpoint
- **Parameter Validation**: Input validation with clear error messages

### 📚 Comprehensive Coverage
- **All HTTP Methods**: GET, POST, PUT, DELETE operations documented
- **Request/Response Schemas**: Detailed data models and validation rules
- **Error Handling**: Complete error response documentation
- **Status Codes**: All possible HTTP status codes explained

### 🎯 Professional Standards
- **OpenAPI 3.0**: Industry-standard API documentation format
- **Schema Validation**: Robust data validation specifications
- **Security Documentation**: Authentication and authorization details
- **Version Control**: API versioning and changelog information

## Usage

### Via Portfolio Interface
1. Navigate to the portfolio: `http://localhost:3000/portfolio/`
2. Click "View API Docs" to access the interactive documentation
3. Use the exercise tabs to switch between different APIs
4. Use keyboard shortcuts (←/→ arrows) to navigate quickly

### Direct Access
Each swagger file can be viewed individually:
- Load any `.yaml` file in a Swagger editor
- Use tools like Swagger UI, Postman, or Insomnia
- Import into API testing tools for automated testing

### Local Development
```bash
# Serve the portfolio (includes swagger documentation)
cd Module5Lab/portfolio
python -m http.server 3000

# Access documentation at:
# http://localhost:3000/swagger-docs.html
```

## Exercise Progression

The documentation follows the natural progression of the lab exercises:

### 🚀 **Foundation (Exercises 1-3)**
- **Exercise 1**: Basic server setup and port management
- **Exercise 2**: Simple REST API with query parameters
- **Exercise 3**: Integration with frontend portfolio

### 🏗️ **Intermediate (Exercises 4-5)**
- **Exercise 4**: Complete CRUD operations with filtering
- **Exercise 5**: Professional MVC architecture patterns

### 🔧 **Advanced (Exercises 6-7)**
- **Exercise 6**: Test-driven development with Jest
- **Exercise 7**: Enterprise features and logging

### 🌟 **Expert (Exercise 8)**
- **Exercise 8**: Full-featured eCommerce API with caching

## API Patterns

### Common Response Format
```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Operation completed successfully",
  "timestamp": "2025-01-07T12:00:00.000Z"
}
```

### Error Response Format
```json
{
  "error": "Error type",
  "message": "Detailed error description",
  "code": "ERROR_CODE",
  "timestamp": "2025-01-07T12:00:00.000Z"
}
```

## Testing APIs

### Prerequisites
1. Start the respective exercise server
2. Ensure the server is running on the documented port
3. Use the interactive documentation or API testing tools

### Example Test Flow
1. **Health Check**: Test `/health` endpoint first
2. **List Operations**: Try GET endpoints to retrieve data
3. **Create Operations**: Test POST endpoints with sample data
4. **Update Operations**: Test PUT endpoints with modifications
5. **Delete Operations**: Test DELETE endpoints (where applicable)

## Development Notes

### Code Generation
These swagger files can be used to generate:
- **Client SDKs**: Auto-generate client libraries in various languages
- **Server Stubs**: Generate server boilerplate code
- **Mock Servers**: Create mock APIs for testing
- **Documentation Sites**: Generate static documentation websites

### Validation
All swagger files are validated against OpenAPI 3.0 specification:
- Schema validation
- Parameter validation
- Response validation
- Security scheme validation

## Contributing

When adding new endpoints or modifying existing ones:

1. Update the corresponding `exercise*.yaml` file
2. Follow the existing schema patterns
3. Include comprehensive examples
4. Document all possible error responses
5. Test the documentation in Swagger UI

## Tools and Resources

### Recommended Tools
- **Swagger Editor**: Online editor for OpenAPI specs
- **Swagger UI**: Interactive documentation viewer
- **Postman**: API testing and documentation platform
- **Insomnia**: REST API client and testing tool

### Online Resources
- [OpenAPI 3.0 Specification](https://swagger.io/specification/)
- [Swagger Documentation](https://swagger.io/docs/)
- [API Design Best Practices](https://swagger.io/resources/articles/best-practices-in-api-design/)

## License

This documentation is part of the Module 5 Lab educational project and is provided under the MIT License.

---

**Author**: Samuel Love  
**Contact**: samuelwelove@icloud.com  
**Repository**: [Module5Lab](https://github.com/tatoslover/Module5Lab)