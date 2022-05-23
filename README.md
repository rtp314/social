# Social

This is an experiment in setting up a simple social media website using Firestore.

It's not trying to be pretty, I'm just playing around with the functionality of user authentication and real-time databases in Firebase.

Dependencies: React, Firebase, React Router

Store list of friends for each user
When starting a chat, create a new database collection for that 'chatroom' (unique ID, or concat the two uids)
Client returns latest 100 messages from that collection


Goals:
1. Set up users and friends, friend lists
2. Friend list in chat
3. Create chatrooms
4. retrieve messages, create cursor

1111@gmail.com  nWfer1fBVTYsmn3xSTl5TpUgNr13
4321@gmail.com  fx0DiCs3eMgGGljEVbIcL9Ewbkc2
1234@gmail.com  NusVhLAhRYUpPO2lj3dIGDdwhcH3


Data Schema:

users (collection)
    --user ID (current user)
        --chats (subcollection)
            --user ID (map)
                --chat ID: [array of user IDs in chat]
            --user ID (map)
                --chat ID: [array of user IDs in chat]
                --chat ID (second chat with multiple users)
            ...
            --(random ID) (map)
                --chat_ID: {chat_ID}
                --users: {array of users}

chats (collection)
    --chat ID (doc)
        --messages (subcollection)
            --message ID
                --user
                --message
                --date
            --message ID
                ...