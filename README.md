# Social

This is an experiment in setting up a simple social media website using Firestore.

It's not trying to be pretty, I'm just playing around with the functionality of user authentication and real-time databases in Firebase.

Dependencies: React, Firebase, React Router

Store list of friends for each user
When starting a chat, create a new database collection for that 'chatroom' (unique ID, or concat the two uids)
Client returns latest 100 messages from that collection

Test Accounts:
1111@gmail.com nWfer1fBVTYsmn3xSTl5TpUgNr13
4321@gmail.com fx0DiCs3eMgGGljEVbIcL9Ewbkc2
1234@gmail.com NusVhLAhRYUpPO2lj3dIGDdwhcH3

### Posts

Saved in "posts" collection

Todo:

-   Only show posts from your friends
-   Add reactions
-   Allow user to edit or delete their own posts
-   Endless scrolling

### Chats

Saved in "chats" collection

Todo:

-   Unread message notifications

### User Data

Todo:

-   Add user settings: change name, email
-   Preferences: save to local storage?
-   'Add friends' page
