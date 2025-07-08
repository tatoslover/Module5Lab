# Exercise 4 Testing Guide - Friends API

This guide provides comprehensive testing examples for all 4 parts of Exercise 4.

## Setup

Start the Friends API server:
```bash
npm run friends  # Runs on port 3006
```

## Part 1: Filter Endpoint Testing

### Filter by Gender Only
```bash
# Get all male friends
curl "http://localhost:3006/friends/filter?gender=male"

# Get all female friends  
curl "http://localhost:3006/friends/filter?gender=female"

# Test case sensitivity
curl "http://localhost:3006/friends/filter?gender=MALE"
```

### Filter by Letter Only
```bash
# Get friends starting with 'R'
curl "http://localhost:3006/friends/filter?letter=R"

# Get friends starting with 'P'
curl "http://localhost:3006/friends/filter?letter=P"

# Get friends starting with 'M'
curl "http://localhost:3006/friends/filter?letter=M"
```

### Filter by Both Gender and Letter
```bash
# Get male friends starting with 'R'
curl "http://localhost:3006/friends/filter?gender=male&letter=R"

# Get female friends starting with 'M'
curl "http://localhost:3006/friends/filter?gender=female&letter=M"

# Test no matches
curl "http://localhost:3006/friends/filter?gender=male&letter=P"
```

### Error Cases
```bash
# No matches for gender
curl "http://localhost:3006/friends/filter?gender=alien"

# No matches for letter
curl "http://localhost:3006/friends/filter?letter=Z"
```

## Part 2: Info Route Testing

### Basic Header Info
```bash
# Basic request
curl "http://localhost:3006/friends/info"

# With specific headers
curl -H "Content-Type: application/json" \
     -H "Accept: application/json" \
     "http://localhost:3006/friends/info"

# With custom user agent
curl -H "User-Agent: MyTestApp/1.0" \
     "http://localhost:3006/friends/info"
```

## Part 3: Get Single Friend by ID

### Valid IDs
```bash
# Get friend with ID 1 (Phoebe)
curl "http://localhost:3006/friends/1"

# Get friend with ID 2 (Joey)
curl "http://localhost:3006/friends/2"

# Get friend with ID 6 (Rachael)
curl "http://localhost:3006/friends/6"
```

### Error Cases
```bash
# Non-existent ID
curl "http://localhost:3006/friends/999"

# Invalid ID format
curl "http://localhost:3006/friends/abc"

# Negative ID
curl "http://localhost:3006/friends/-1"
```

## Part 4: Update Friend (PUT)

### Successful Updates
```bash
# Update friend ID 1 (Phoebe)
curl -X PUT \
     -H "Content-Type: application/json" \
     -d '{"name": "Phoebe Buffay", "gender": "female"}' \
     "http://localhost:3006/friends/1"

# Update friend ID 2 (Joey)
curl -X PUT \
     -H "Content-Type: application/json" \
     -d '{"name": "Joey Tribbiani", "gender": "male"}' \
     "http://localhost:3006/friends/2"
```

### Error Cases
```bash
# Missing name field
curl -X PUT \
     -H "Content-Type: application/json" \
     -d '{"gender": "female"}' \
     "http://localhost:3006/friends/1"

# Missing gender field
curl -X PUT \
     -H "Content-Type: application/json" \
     -d '{"name": "Test Name"}' \
     "http://localhost:3006/friends/1"

# Non-existent friend ID
curl -X PUT \
     -H "Content-Type: application/json" \
     -d '{"name": "New Friend", "gender": "male"}' \
     "http://localhost:3006/friends/999"

# Invalid ID format
curl -X PUT \
     -H "Content-Type: application/json" \
     -d '{"name": "Test", "gender": "male"}' \
     "http://localhost:3006/friends/abc"
```

## Additional Testing - POST (Add New Friend)

### Add Valid Friends
```bash
# Add new friend
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"name": "Gunther", "gender": "male"}' \
     "http://localhost:3006/friends"

# Add another friend with ID
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"id": 10, "name": "Janice", "gender": "female"}' \
     "http://localhost:3006/friends"
```

### Add Invalid Friends
```bash
# Missing name
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"gender": "male"}' \
     "http://localhost:3006/friends"

# Missing gender
curl -X POST \
     -H "Content-Type: application/json" \
     -d '{"name": "Test"}' \
     "http://localhost:3006/friends"
```

## Browser Testing URLs

Open these URLs in your browser:

- **All friends:** http://localhost:3006/friends
- **Male friends:** http://localhost:3006/friends/filter?gender=male
- **Friends starting with 'R':** http://localhost:3006/friends/filter?letter=R
- **Male friends starting with 'R':** http://localhost:3006/friends/filter?gender=male&letter=R
- **Header info:** http://localhost:3006/friends/info
- **Friend by ID:** http://localhost:3006/friends/1
- **Non-existent friend:** http://localhost:3006/friends/999

## Expected Data Structure

### Original Friends Data
```json
[
  { "id": 1, "name": "Phoebe", "gender": "female"},
  { "id": 2, "name": "Joey", "gender": "male"},
  { "id": 3, "name": "Chandler", "gender": "male"},
  { "id": 4, "name": "Monica", "gender": "female"},
  { "id": 5, "name": "Ross", "gender": "male"},
  { "id": 6, "name": "Rachael", "gender": "female"}
]
```

## Validation Rules

1. **Filter by letter:** Case-insensitive, matches first character of name
2. **Filter by gender:** Case-insensitive, exact match
3. **Friend ID:** Must be a valid number
4. **Friend update:** Requires both 'name' and 'gender' fields
5. **Friend creation:** Requires both 'name' and 'gender', auto-generates ID if missing

## Testing Checklist

- [ ] Part 1: Filter works with gender parameter
- [ ] Part 1: Filter works with letter parameter  
- [ ] Part 1: Filter works with both parameters combined
- [ ] Part 1: Returns proper error when no matches found
- [ ] Part 2: Info route returns only user-agent, content-type, accept
- [ ] Part 3: GET /:id returns single friend object
- [ ] Part 3: GET /:id returns 404 for non-existent ID
- [ ] Part 3: GET /:id validates ID format
- [ ] Part 4: PUT /:id updates existing friend
- [ ] Part 4: PUT /:id validates required fields
- [ ] Part 4: PUT /:id returns 404 for non-existent friend
- [ ] All endpoints include proper HTTP status codes
- [ ] All endpoints include data validation