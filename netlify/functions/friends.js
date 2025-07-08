// Friends data - in a real app this would come from a database
const friends = [
  { id: 1, name: "Alice Johnson", age: 28, gender: "female", hobby: "reading" },
  { id: 2, name: "Bob Smith", age: 32, gender: "male", hobby: "gaming" },
  { id: 3, name: "Charlie Brown", age: 25, gender: "male", hobby: "cooking" },
  { id: 4, name: "Diana Prince", age: 30, gender: "female", hobby: "martial arts" },
  { id: 5, name: "Eve Wilson", age: 27, gender: "female", hobby: "photography" },
  { id: 6, name: "Frank Miller", age: 35, gender: "male", hobby: "writing" },
  { id: 7, name: "Grace Lee", age: 29, gender: "female", hobby: "dancing" },
  { id: 8, name: "Henry Davis", age: 31, gender: "male", hobby: "hiking" },
  { id: 9, name: "Ivy Chen", age: 26, gender: "female", hobby: "painting" },
  { id: 10, name: "Jack Taylor", age: 33, gender: "male", hobby: "music" },
  { id: 11, name: "Karen White", age: 24, gender: "female", hobby: "yoga" },
  { id: 12, name: "Leo Garcia", age: 36, gender: "male", hobby: "traveling" },
  { id: 13, name: "Mia Rodriguez", age: 28, gender: "female", hobby: "gardening" },
  { id: 14, name: "Noah Anderson", age: 30, gender: "male", hobby: "fishing" },
  { id: 15, name: "Olivia Martinez", age: 27, gender: "female", hobby: "baking" },
  { id: 16, name: "Paul Thompson", age: 34, gender: "male", hobby: "cycling" },
  { id: 17, name: "Quinn Roberts", age: 25, gender: "non-binary", hobby: "coding" },
  { id: 18, name: "Rachel Green", age: 29, gender: "female", hobby: "shopping" },
  { id: 19, name: "Sam Wilson", age: 31, gender: "male", hobby: "running" },
  { id: 20, name: "Tina Turner", age: 26, gender: "female", hobby: "singing" }
];

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

  // Parse the path to determine the operation
  const pathParts = path.split('/').filter(part => part !== '');
  const operation = pathParts[pathParts.length - 1];

  try {
    switch (httpMethod) {
      case 'GET':
        return handleGetRequest(operation, queryStringParameters, headers);
      case 'POST':
        return handlePostRequest(body, headers);
      case 'PUT':
        return handlePutRequest(operation, body, headers);
      case 'DELETE':
        return handleDeleteRequest(operation, headers);
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({
            error: 'Method not allowed',
            message: `${httpMethod} is not supported`
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

function handleGetRequest(operation, queryParams, headers) {
  const { gender, startsWith, id } = queryParams || {};

  // If operation is a number, treat it as an ID lookup
  if (!isNaN(operation)) {
    const friendId = parseInt(operation);
    const friend = friends.find(f => f.id === friendId);

    if (!friend) {
      return {
        statusCode: 404,
        headers,
        body: JSON.stringify({
          error: 'Friend not found',
          message: `No friend found with ID ${friendId}`
        })
      };
    }

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        friend,
        message: `Friend ${friend.name} retrieved successfully`,
        timestamp: new Date().toISOString()
      })
    };
  }

  // Handle special operations
  switch (operation) {
    case 'info':
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          totalFriends: friends.length,
          server: 'Netlify Functions - Friends API',
          timestamp: new Date().toISOString(),
          endpoints: [
            'GET /friends - Get all friends',
            'GET /friends/filter - Filter friends by gender and/or name',
            'GET /friends/info - Get API information',
            'GET /friends/{id} - Get friend by ID',
            'POST /friends - Add new friend',
            'PUT /friends/{id} - Update friend',
            'DELETE /friends/{id} - Delete friend'
          ]
        })
      };

    case 'filter':
      let filteredFriends = [...friends];

      // Filter by gender
      if (gender) {
        filteredFriends = filteredFriends.filter(friend =>
          friend.gender.toLowerCase() === gender.toLowerCase()
        );
      }

      // Filter by name starting with
      if (startsWith) {
        filteredFriends = filteredFriends.filter(friend =>
          friend.name.toLowerCase().startsWith(startsWith.toLowerCase())
        );
      }

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          friends: filteredFriends,
          count: filteredFriends.length,
          filters: { gender, startsWith },
          message: `Found ${filteredFriends.length} friends matching criteria`,
          timestamp: new Date().toISOString()
        })
      };

    default:
      // Return all friends
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          friends,
          count: friends.length,
          message: 'All friends retrieved successfully',
          timestamp: new Date().toISOString()
        })
      };
  }
}

function handlePostRequest(body, headers) {
  try {
    const newFriend = JSON.parse(body);

    // Validate required fields
    if (!newFriend.name || !newFriend.age || !newFriend.gender) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields',
          message: 'name, age, and gender are required',
          received: newFriend
        })
      };
    }

    // Generate new ID
    const newId = Math.max(...friends.map(f => f.id)) + 1;
    const friendToAdd = {
      id: newId,
      name: newFriend.name,
      age: parseInt(newFriend.age),
      gender: newFriend.gender,
      hobby: newFriend.hobby || 'unknown'
    };

    // Add to friends array (in a real app, this would be saved to a database)
    friends.push(friendToAdd);

    return {
      statusCode: 201,
      headers,
      body: JSON.stringify({
        message: 'Friend added successfully',
        friend: friendToAdd,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Invalid JSON',
        message: 'Request body must be valid JSON'
      })
    };
  }
}

function handlePutRequest(operation, body, headers) {
  const friendId = parseInt(operation);

  if (isNaN(friendId)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Invalid ID',
        message: 'Friend ID must be a number'
      })
    };
  }

  const friendIndex = friends.findIndex(f => f.id === friendId);

  if (friendIndex === -1) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: 'Friend not found',
        message: `No friend found with ID ${friendId}`
      })
    };
  }

  try {
    const updatedData = JSON.parse(body);

    // Update the friend (in a real app, this would update the database)
    const updatedFriend = {
      ...friends[friendIndex],
      ...updatedData,
      id: friendId // Ensure ID doesn't change
    };

    friends[friendIndex] = updatedFriend;

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        message: 'Friend updated successfully',
        friend: updatedFriend,
        timestamp: new Date().toISOString()
      })
    };
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Invalid JSON',
        message: 'Request body must be valid JSON'
      })
    };
  }
}

function handleDeleteRequest(operation, headers) {
  const friendId = parseInt(operation);

  if (isNaN(friendId)) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        error: 'Invalid ID',
        message: 'Friend ID must be a number'
      })
    };
  }

  const friendIndex = friends.findIndex(f => f.id === friendId);

  if (friendIndex === -1) {
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({
        error: 'Friend not found',
        message: `No friend found with ID ${friendId}`
      })
    };
  }

  // Remove the friend (in a real app, this would delete from database)
  const deletedFriend = friends.splice(friendIndex, 1)[0];

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({
      message: 'Friend deleted successfully',
      friend: deletedFriend,
      timestamp: new Date().toISOString()
    })
  };
}
