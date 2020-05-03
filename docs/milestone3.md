# 326-final-sigma

## Team:
Sigma

## Name of Application:
Shelf: **[Access via Heroku](https://limitless-garden-19995.herokuapp.com/)**

## Team Overview:
- Daniel Coley, https://www.github.com/DANSC111
- Joe Pasquale, https://www.github.com/JoePasquale
- Joshua Vasilevsky, https://www.github.com/joshvasilevsky

## Database Documentation
Our application uses a MongoDB non-relational database. 

Friends document\
{\
    FriendsID: <ObjectId1>\
    Requester: UserID, // User who sent the friend request\
    Receiver: UserID, // User who received the friend request\
    Status: Number, // Status of the friend request; 1 means requested, 2 means pending, 3 means friends\
}\

User document
{
    UserID: <ObjectId1>
    Username: String, // Username for this UserID
    Email: String, // User's email address
    Password: String, // User's password
    FirstName: String, // User's first name
    LastName: String, // User's last name
    FavBook: String, // User's selected favorite book
    FavGenre: String, // User's selected favorite genre
    BookListID: BookListID, // User's book lists
    FriendsId: FriendsID, // User's friends list
}

Book document
{
    BookID: <ObjectId1>
    Title: String, // Title of the book
    Author: String // Author of the book
    Publisher: String, // Publisher of the book
    PublishedDate: String, // Publishing Date of the Book
    ISBN: String, // ISBN identifier of the book
    description: String, // A short description of the book
    categories: String, // The genre(s) of a book
    googleRating: Number, // A rating of the book fetched from Google
    userRating: 
    userReview:
}

BookList document
{
    BookListID: <ObjectId1>
    user: UserID, // ID of the user whom the list belongs to
    book: BookID, // ID of book on the list
    status: Number, // Denotes which list is selected; 1 is Want to read, 2 is Currently reading, 3 is Completed reading, 4 is Quit Reading
}

Update document
{
    UpdateID: <ObjectId1>
    user: UserID, // ID of the user who is posting the update
    book: BookID, // ID of book being posted about
    time: Date, // Timestamp of when the update was posted
    toList: Number, // Indicates list that book is now  a member of
    fromList: Number, // Indicates list that book was previously a member of
}

Comment document
{
    CommentID: <ObjectId1>
    user: UserID, // ID of the user who is posting the comment
    update: UpdateID, // Post where the comment is being made
    time: Date, // Timestamp of when the update was posted
    message: String, // Content of the comment
}

## Contributions

The following were the contributions made for this milestone:

 - Josh
    -  

 - Dan
    - 

 - Joe
    - 