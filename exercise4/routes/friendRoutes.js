const express = require("express");
const router = express.Router();
const friends = require('../models/friends')


// COMPLETED: All 4 parts implemented with validation and error handling
// Part 1: Filter endpoint supports both 'gender' and 'letter' query parameters
// Part 2: Info route returns only user-agent, content-type and accept headers
// Part 3: Dynamic GET route returns single friend by ID with validation
// Part 4: PUT route updates existing friend with validation


// default endpoint, gets all friends
router.get('/', (req, res) => {
    res.json(friends)
})

// Part 1: Filter endpoint with support for both 'gender' and 'letter' query parameters
// Usage: /friends/filter?gender=male&letter=R
router.get('/filter', (req, res) => {
    console.log(req.query)
    let filterGender = req.query.gender;
    let filterLetter = req.query.letter;
    let matchingFriends = [...friends];

    // Apply gender filter if provided
    if (filterGender) {
        matchingFriends = matchingFriends.filter(friend => 
            friend.gender.toLowerCase() === filterGender.toLowerCase()
        );
    }
    
    // Apply letter filter if provided (filter by first letter of name)
    if (filterLetter) {
        matchingFriends = matchingFriends.filter(friend => 
            friend.name.charAt(0).toLowerCase() === filterLetter.toLowerCase()
        );
    }
    
    if (matchingFriends.length > 0) {
        // return valid data when filters match
        res.status(200).json({
            count: matchingFriends.length,
            filters: { gender: filterGender, letter: filterLetter },
            friends: matchingFriends
        })
    } else {
        // return error response when there are no matches
        let errorMsg = "No friends found";
        if (filterGender && filterLetter) {
            errorMsg = `No friends matching gender '${filterGender}' and starting with letter '${filterLetter}'`;
        } else if (filterGender) {
            errorMsg = `No friends matching gender '${filterGender}'`;
        } else if (filterLetter) {
            errorMsg = `No friends with names starting with letter '${filterLetter}'`;
        }
        res.status(404).json({error: errorMsg})
    }  
})

// Part 2: Info route returning only user-agent, content-type and accept header data
router.get('/info', (req, res) => {
    console.log(req.headers)

    // Extract only the specific headers requested
    const headerInfo = {
        'user-agent': req.headers['user-agent'] || 'Not provided',
        'content-type': req.headers['content-type'] || 'Not provided',
        'accept': req.headers['accept'] || 'Not provided'
    };

    res.json({
        message: "Request header information",
        headers: headerInfo,
        timestamp: new Date().toISOString()
    })  
})

// Part 3: Dynamic GET route returning single friend by ID with validation
router.get('/:id', (req, res) => {
    console.log(req.params)
    let friendId = req.params.id;

    // Validate that ID is a number
    if (isNaN(friendId)) {
        return res.status(400).json({
            error: "Invalid ID format",
            message: "ID must be a number",
            providedId: friendId
        });
    }

    // Convert to number for comparison
    friendId = parseInt(friendId);

    // Find the friend matching the given ID
    const foundFriend = friends.find(friend => friend.id === friendId);

    if (foundFriend) {
        // Return the matched friend
        res.status(200).json({
            message: `Friend found with ID ${friendId}`,
            friend: foundFriend
        });
    } else {
        // Return 404 if not found
        res.status(404).json({
            error: "Friend not found",
            message: `No friend exists with ID ${friendId}`,
            availableIds: friends.map(friend => friend.id)
        });
    }
})

// a POST request with data sent in the body of the request, representing a new friend to add to our list
router.post('/', (req, res) => {
    let newFriend = req.body; // FIRST add this line to index.js: app.use(express.json());
    console.log(newFriend) // 'body' will now be an object containing data sent via the request body

    // we can add some validation here to make sure the new friend object matches the right pattern
    if (!newFriend.name || !newFriend.gender) {
        res.status(500).json({error: 'Friend object must contain a name and gender'});
        return;
    }
    else if (!newFriend.id) {
        newFriend.id = friends.length + 1; // generate an ID if one is not present
    }

    // if the new friend is valid, add them to the list and return the successfully added object
    friends.push(newFriend)
    res.status(200).json(newFriend)
})

// Part 4: PUT route to update data for an existing friend with validation
router.put('/:id', (req, res) => {
    let friendId = req.params.id;
    let updatedFriend = req.body;

    // Validate that ID is a number
    if (isNaN(friendId)) {
        return res.status(400).json({
            error: "Invalid ID format",
            message: "ID must be a number",
            providedId: friendId
        });
    }

    // Convert to number for comparison
    friendId = parseInt(friendId);

    // Validate required fields in the request body
    if (!updatedFriend.name || !updatedFriend.gender) {
        return res.status(400).json({
            error: "Missing required fields",
            message: "Friend object must contain 'name' and 'gender'",
            received: updatedFriend
        });
    }

    // Find the index of the friend to update
    const friendIndex = friends.findIndex(friend => friend.id === friendId);

    if (friendIndex === -1) {
        // Friend not found
        return res.status(404).json({
            error: "Friend not found",
            message: `No friend exists with ID ${friendId}`,
            availableIds: friends.map(friend => friend.id)
        });
    }

    // Store the old friend data for comparison
    const oldFriend = { ...friends[friendIndex] };

    // Update the friend data (preserve the original ID)
    friends[friendIndex] = {
        id: friendId,
        name: updatedFriend.name.trim(),
        gender: updatedFriend.gender.toLowerCase()
    };

    // Return success response with updated friend data
    res.status(200).json({
        message: `Successfully updated friend with ID ${friendId}`,
        oldData: oldFriend,
        newData: friends[friendIndex],
        timestamp: new Date().toISOString()
    });
})

module.exports = router;