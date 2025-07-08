# Exercise 3: Calculator Portfolio Interface

This exercise extends the calculator.html from Module5Code to create a full front-end calculator interface that connects to all four server-side calculator routes from Exercise 2.

## Quick Start

### Option 1: Manual Setup (Recommended for Learning)

**Terminal 1 - Start the Calculator API:**
```bash
cd IOD/Module5Lab
npm run calculator
```

**Terminal 2 - Start the Portfolio:**
```bash
cd IOD/Module5Lab  
npm run portfolio
```

**Terminal 3 - Open Browser:**
```bash
open http://localhost:3005
```

### Option 2: One-Command Setup

```bash
# Kill any existing processes
npm run kill-ports

# Start calculator API in background
npm run calculator &

# Wait a moment for API to start
sleep 2

# Start portfolio
npm run portfolio
```

## What You'll See

1. **Modern Calculator Interface** at http://localhost:3005
2. **API Backend** running at http://localhost:3004
3. **Real-time calculations** connecting portfolio to backend

## Architecture

```
┌─────────────────┐    HTTP Requests    ┌─────────────────┐
│   Portfolio     │ ──────────────────▶ │  Calculator API │
│   (Port 3005)   │                     │   (Port 3004)   │
│                 │ ◀────────────────── │                 │
│ calculator.html │    JSON Responses   │ Express Routes  │
└─────────────────┘                     └─────────────────┘
```

## Features

- ✅ **All 4 Operations**: Add, Subtract, Multiply, Divide
- ✅ **Input Validation**: Checks for valid numbers
- ✅ **Error Handling**: Division by zero, invalid inputs
- ✅ **Keyboard Shortcuts**: Ctrl + (+, -, *, /)
- ✅ **Visual Feedback**: Loading states, color-coded buttons
- ✅ **Responsive Design**: Works on desktop and mobile

## Testing Scenarios

### Basic Operations
- Add: 10 + 5 = 15
- Subtract: 15 - 3 = 12
- Multiply: 6 × 7 = 42
- Divide: 20 ÷ 4 = 5

### Advanced Testing
- Decimals: 3.5 + 2.7 = 6.2
- Negatives: 5 - 10 = -5
- Large numbers: 999999 × 888888
- Division precision: 22 ÷ 7 = 3.142857...

### Error Cases
- Division by zero: 10 ÷ 0 → Error message
- Invalid input: "abc" + 5 → Validation error
- Missing numbers → "Please enter both numbers"

## Troubleshooting

**Problem: "Failed to fetch" errors**
- Solution: Make sure Exercise 2 API is running on port 3004

**Problem: Calculator API not responding**  
- Solution: Run `npm run kill-ports` then restart both services

**Problem: Port already in use**
- Solution: Use `npm run kill-ports` to clear all lab ports

**Problem: CORS errors**
- Solution: Both servers include CORS middleware, restart if needed

## File Structure

```
exercise3/
├── calculator.html     # Portfolio interface with all operations
├── server.js          # Express server to serve the HTML
└── README.md          # This file
```

## API Endpoints Used

The portfolio makes calls to these Exercise 2 endpoints:

- `GET http://localhost:3004/calculator/add?num1=X&num2=Y`
- `GET http://localhost:3004/calculator/subtract?num1=X&num2=Y`  
- `GET http://localhost:3004/calculator/multiply?num1=X&num2=Y`
- `GET http://localhost:3004/calculator/divide?num1=X&num2=Y`

## Success Criteria

✅ Portfolio displays modern calculator interface  
✅ All four operations work correctly  
✅ Error handling for invalid inputs  
✅ Real-time communication with Exercise 2 API  
✅ Responsive design with visual feedback