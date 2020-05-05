# 326-final-sigma

## Team:
Sigma

## Name of Application:
Shelf Milestone 3: **[Access via Heroku](https://ancient-lowlands-11467.herokuapp.com/)**\
Shelf Milestone 2: **[Access via Heroku](https://limitless-garden-19995.herokuapp.com/)**

## Team Overview:
- Daniel Coley, https://www.github.com/DANSC111
- Joe Pasquale, https://www.github.com/JoePasquale
- Joshua Vasilevsky, https://www.github.com/joshvasilevsky

## Database Documentation
Our application uses a MongoDB non-relational database. 

Friends document\
{\
    _id: ObjectId1\
    Requester: UserID, // User who sent the friend request\
    Receiver: UserID, // User who received the friend request\
    Status: Number, // Status of the friend request; 1 means requested, 2 means pending, 3 means friends\
}

User document\
{\
    _id: ObjectId1\
    username: String, // Username for this UserID\
    email: String, // User's email address\
    password: String, // User's password\
    info:{\
         firstname: String, // User's first name\
           lastname: String, // User's last name\
        favorite_book: String, // User's selected favorite book\
        favorite_genre: String, // User's selected favorite genre\
    }\
    booklist:[ booklist_id ], // User's book\
    friends: [ friend_id ], // User's friends\
    reviews: [ review_id ], // User's Book Reviews\
}

Book document\
{\
    BookID: ObjectId1\
    title: String, // Title of the book\
    author: String // Author of the book\
    publisher: String, // Publisher of the book\
    publishedDate: String, // Publishing Date of the Book\
    ISBN:[{\
        type: String , // type of identifier number \
        identifier: String //identification number \
    }],\
    description: String, // A short description of the book\
    categories: String, // The genre(s) of a book\
    googleRating: Number, // A rating of the book fetched from Google\
    imageLinks: {\
         smallThumbnail: String , // small picture of book cover\
        thumbnail: String , //larger picture of book cover\
    },\
    userReview:[ review_id ] // List of book's reviews\
}

BookList document\
{\
    _id: ObjectId1\
    user: user_id, // ID of the user whom the list belongs to\
    book: book_id, // ID of book on the list\
    status: Number, // Denotes which list is selected; 1 is Want to read, 2 is Currently reading, 3 is Completed reading, 4 is Quit Reading\
}

Update document\
{\
    _id: ObjectId1\
    user: user_id, // ID of the user who is posting the update\
    book: book_id, // ID of book being posted about\
    time: Date, // Timestamp of when the update was posted\
    change: Any, // object that is changing\
     
}

Comment document\
{\
    _id: ObjectId1\
    user: user_id, // ID of the user who is posting the comment\
    update: update_id, // Post where the comment is being made\
    time: Date, // Timestamp of when the update was posted\
    message: String, // Content of the comment\
}

Review document\
{\
    _id: ObjectId1\
    user: user_id, // ID of the user who is posting the review\
    book: book_id, // Post where the review is being made\
    time: Date, // Timestamp of when the update was posted\
    message: String, // Content of the review\
    rating: Number // rating of the book\
}


## Contributions

The following were the contributions made for this milestone:

 - Josh
    - booklist route (some routes)
    - Update model (partly)
    - Update routes
    - friends model
    - user model
    - book model
    - review model
    - friends routes
    - user routes
    - book routes
    - review routes
    - friendslist-xhr 
    - bookpage-xhr (updated)
    - booklist-xhr
    - profile-xhr (updated)
    - populateFeed.js (partly)
 - Dan
    - Update model
    - Update middleware
    - populateFeed.js
    - homefeed.html
    - booklist model
    - booklist routes (some routes)
    - comment model

 - Joe
    - Milestone 3 Document
    - At this point, emotional support