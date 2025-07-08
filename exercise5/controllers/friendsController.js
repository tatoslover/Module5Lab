const friends = require('../models/friends');

// Get all friends
const getAllFriends = (req, res) => {
    try {
        res.status(200).json({
            message: "Retrieved all friends successfully",
            count: friends.length,
            friends: friends,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
};

// Filter friends by gender and/or starting letter
const filterFriends = (req, res) => {
    try {
        console.log('Filter request query:', req.query);
        
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
                message: "Friends filtered successfully",
                count: matchingFriends.length,
                filters: { 
                    gender: filterGender || null, 
                    letter: filterLetter || null 
                },
                friends: matchingFriends,
                timestamp: new Date().toISOString()
            });
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
            
            res.status(404).json({
                error: errorMsg,
                filters: { 
                    gender: filterGender || null, 
                    letter: filterLetter || null 
                },
                availableOptions: {
                    genders: [...new Set(friends.map(f => f.gender))],
                    letters: [...new Set(friends.map(f => f.name.charAt(0)))]
                }
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
};

// Get request header information
const getHeaderInfo = (req, res) => {
    try {
        console.log('Request headers:', req.headers);

        // Extract only the specific headers requested
        const headerInfo = {
            'user-agent': req.headers['user-agent'] || 'Not provided',
            'content-type': req.headers['content-type'] || 'Not provided',
            'accept': req.headers['accept'] || 'Not provided'
        };

        res.status(200).json({
            message: "Request header information retrieved successfully",
            headers: headerInfo,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
};

// Get single friend by ID
const getFriendById = (req, res) => {
    try {
        console.log('Get friend by ID params:', req.params);
        let friendId = req.params.id;

        // Validate that ID is a number
        if (isNaN(friendId)) {
            return res.status(400).json({
                error: "Invalid ID format",
                message: "ID must be a number",
                providedId: friendId,
                expectedFormat: "number"
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
                friend: foundFriend,
                timestamp: new Date().toISOString()
            });
        } else {
            // Return 404 if not found
            res.status(404).json({
                error: "Friend not found",
                message: `No friend exists with ID ${friendId}`,
                providedId: friendId,
                availableIds: friends.map(friend => friend.id),
                totalFriends: friends.length
            });
        }
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
};

// Add new friend
const addFriend = (req, res) => {
    try {
        let newFriend = req.body;
        console.log('Adding new friend:', newFriend);

        // Validate required fields
        if (!newFriend.name || !newFriend.gender) {
            return res.status(400).json({
                error: 'Missing required fields',
                message: 'Friend object must contain both name and gender',
                received: newFriend,
                required: ['name', 'gender']
            });
        }

        // Generate ID if not provided
        if (!newFriend.id) {
            newFriend.id = friends.length + 1;
        }

        // Validate ID uniqueness
        const existingFriend = friends.find(friend => friend.id === newFriend.id);
        if (existingFriend) {
            return res.status(409).json({
                error: 'ID conflict',
                message: `Friend with ID ${newFriend.id} already exists`,
                existingFriend: existingFriend
            });
        }

        // Clean and validate the data
        const cleanFriend = {
            id: parseInt(newFriend.id),
            name: newFriend.name.trim(),
            gender: newFriend.gender.toLowerCase()
        };

        // Validate gender values
        const validGenders = ['male', 'female', 'other'];
        if (!validGenders.includes(cleanFriend.gender)) {
            return res.status(400).json({
                error: 'Invalid gender value',
                message: `Gender must be one of: ${validGenders.join(', ')}`,
                provided: newFriend.gender,
                validOptions: validGenders
            });
        }

        // Add the new friend to the list
        friends.push(cleanFriend);

        res.status(201).json({
            message: 'Friend added successfully',
            friend: cleanFriend,
            totalFriends: friends.length,
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
};

// Update existing friend
const updateFriend = (req, res) => {
    try {
        let friendId = req.params.id;
        let updatedFriend = req.body;
        
        console.log(`Updating friend ID ${friendId}:`, updatedFriend);

        // Validate that ID is a number
        if (isNaN(friendId)) {
            return res.status(400).json({
                error: "Invalid ID format",
                message: "ID must be a number",
                providedId: friendId,
                expectedFormat: "number"
            });
        }

        // Convert to number for comparison
        friendId = parseInt(friendId);

        // Validate required fields in the request body
        if (!updatedFriend.name || !updatedFriend.gender) {
            return res.status(400).json({
                error: "Missing required fields",
                message: "Friend object must contain both 'name' and 'gender'",
                received: updatedFriend,
                required: ['name', 'gender']
            });
        }

        // Find the index of the friend to update
        const friendIndex = friends.findIndex(friend => friend.id === friendId);

        if (friendIndex === -1) {
            // Friend not found
            return res.status(404).json({
                error: "Friend not found",
                message: `No friend exists with ID ${friendId}`,
                providedId: friendId,
                availableIds: friends.map(friend => friend.id),
                totalFriends: friends.length
            });
        }

        // Validate gender values
        const validGenders = ['male', 'female', 'other'];
        const cleanGender = updatedFriend.gender.toLowerCase();
        if (!validGenders.includes(cleanGender)) {
            return res.status(400).json({
                error: 'Invalid gender value',
                message: `Gender must be one of: ${validGenders.join(', ')}`,
                provided: updatedFriend.gender,
                validOptions: validGenders
            });
        }

        // Store the old friend data for comparison
        const oldFriend = { ...friends[friendIndex] };

        // Update the friend data (preserve the original ID)
        friends[friendIndex] = {
            id: friendId,
            name: updatedFriend.name.trim(),
            gender: cleanGender
        };

        // Return success response with updated friend data
        res.status(200).json({
            message: `Successfully updated friend with ID ${friendId}`,
            oldData: oldFriend,
            newData: friends[friendIndex],
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
};

// Export all controller functions
module.exports = {
    getAllFriends,
    filterFriends,
    getHeaderInfo,
    getFriendById,
    addFriend,
    updateFriend
};