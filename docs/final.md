# 326-final-sigma

## Team Sigma
### Application: 
#### Shelf
Final: **[Access via Heroku](https://shelf-book-app.herokuapp.com/)**\
Milestone 3: **[Access via Heroku](https://ancient-lowlands-11467.herokuapp.com/)**\
Milestone 2: **[Access via Heroku](https://limitless-garden-19995.herokuapp.com/)**

### Spring 2020

## Overview

### Shelf 

Our proposed application is a website which allows a user to sign up and store books that they are currently reading, have read, or plan to read. They can search for books which are fetched from the Google Books API, which will return basic information about the book, such as title, author, and publisher, as well as more detailed information, such as cover art and Google Books rating. Users are able to add reviews and ratings to books. Users can share their "shelves" with other people when they add them as a friend, and they can comment on activity from members of their friends list, which show up in a feed. It was brought to our attention that our concept was very similar to [GoodReads](https://www.goodreads.com); however, many users of the site say there are multiple problems with the platform, ranging from performance issues to discontent with the rating system. We believe that Shelf does a good job at alleviating some of the issues that GoodReads has been criticized for.

## Team Members:
- Daniel Coley, https://www.github.com/DANSC111
- Joe Pasquale, https://www.github.com/JoePasquale
- Joshua Vasilevsky, https://www.github.com/joshvasilevsky

## User Interface
### Index
Home page for the site. Includes a short description about the purpose of the site.

![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/index.PNG)

### Sign in
Sign in page, where user enters their credentials to gain access to the site.

![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/sign_in.PNG)

### Sign up
Sign up page, where the user can register credentials to use the site.

![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/sign_up.PNG)

### Profile
Profile for signed in user, which allows user to change personal details/preferences, as well as access their friends list and book lists. Users are able to view other users profile pages as well where they can add them as a friend.

#### Profile Page of Current logged in User
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/profile_currentuser.png)

#### Profile Page when viewing other user
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/profile_otheruser.png)

### Search
Search page where users can look through results based on their query. This is how users search for books and profiles.

#### Search Results for book
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/searchresults_book.png)

#### Search Results for user
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/searchresults_user.png)

#### Search Results not found
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/searchresults_empty.png)

### Book Page
Page that gives details about the currently selected book including the ability to post ratings and reviews.

#### Book Info
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/bookpage.png)

#### Book Review
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/bookpage_review.png)

### Book Lists
Page that shows all four of the user's lists, as well as what books are on them. Lists can be edited here too.

#### BookList with books
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/booklist.png)

#### BookList Empty
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/booklist_empty.png)

### Friends List
Page that shows all of the current user's friends, and their information. Users accept/reject friend requests here and delete current friends.

#### Friendlist friends
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/friends_friend.png)

#### Friendlist Requests
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/friends_request.png)

#### Friendlist pending
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/friends_pending.png)

#### Friendlist empty
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/friends_empty.png)

### Home Feed
Home Feed for signed in user, which contains post updates and comments on those posts

#### Home feed
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/feed.png)

#### Home feed empty
![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/ui-final/feed_empty.png)


## APIs
### Book
#### Create API
##### Overview
The create endpoint for the book provides a way for the client to add a new book to the server by looking it up on the Google Book API.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the add endpoint is:
`localhost:4000/api/book/add`
There is 1 required parameter and 7 optional parameters for this endpoint.
| Parameter     | Description                                      | Example                                                                                                 |
|---------------|--------------------------------------------------|---------------------------------------------------------------------------------------------------------|
| title         | The title of the book                            | Silent Spring                                                                                           |
| authors       | The author(s) of the book                        | Rachel Carson                                                                                           |
| publisher     | The publisher of the book                        | Houghton Mifflin                                                                                        |
| publishedDate | The date when the book was published             | September 27, 1962                                                                                      |
| ISBN          | The ISBN Number of the book                      | 9789638639646                                                                                           |
| Categories    | The genre(s) of the book                         | Nonfiction, environmental                                                                               |
| googleRating  | The rating of the book fetched from Google Books | 3.9                                                                                                     |
| imageLinks    | Cover art for the book                           | ![Art](https://upload.wikimedia.org/wikipedia/en/thumb/a/ac/SilentSpring.jpg/220px-SilentSpring.jpgEndFragment) |

##### Responses
The book API returns all response data as a JSON object. The full details for the response format are shown below:
| Key           | Value Type | Description                                         |
|---------------|------------|-----------------------------------------------------|
| title         | string     | The title of the book                               |
| authors       | string     | The author(s) of the book                           |
| publisher     | string     | The publisher of the book                           |
| publishedDate | date       | The date when the book was published                |
| ISBN          | int        | ISBN reference number for the book                  |
| categories    | string     | Genres which the book falls into                    |
| description   | string     | A short summary of the book                         |
| googleRating  | double     | A rating of the book fetched from Google Books      |
| imageLinks    | string     | A link to cover art for the book                    |
| userRating    | double     | A rating of the book fetched from users of the site |
| userReview    | string     | A review of the book fetched from users of the site |

#### Read API
##### Overview
The read endpoint for the book provides a way for the client to fetch an existing book from the server.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the read endpoint is:
`localhost:4000/api/book/read`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    id     | The database id for the book         |    1    |


##### Responses
The book API returns all response data as a JSON object. The full details for the response format are shown below:
| Key           | Value Type | Description                                         |
|---------------|------------|-----------------------------------------------------|
| title         | string     | The title of the book                               |
| authors       | string     | The author(s) of the book                           |
| publisher     | string     | The publisher of the book                           |
| publishedDate | date       | The date when the book was published                |
| ISBN          | int        | ISBN reference number for the book                  |
| categories    | string     | Genres which the book falls into                    |
| description   | string     | A short summary of the book                         |
| googleRating  | double     | A rating of the book fetched from Google Books      |
| imageLinks    | string     | A link to cover art for the book                    |
| userReview    | string     | A review of the book fetched from users of the site |

### Review

#### Add API
##### Overview
The add endpoint for the review provides a way for the client to add a user review to an existing book from the server.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the review add endpoint is:
`localhost:4000/api/review/add`
There are 4 required parameters this endpoint.
| Parameter | Description                                | Example     |
|-----------|--------------------------------------------|-------------|
| User      |   ID of the User submitting the review     | 1           |
| Book      | ID of the book being rated                 | 3         |
| Text      | A review of the book                       | I loved it! |
| Rating    | A rating of the book out of 5              | 4.5 |

##### Responses
responses 200 "review added"

#### Remove API
##### Overview
The remove endpoint for the review provides a way for the client to remove a review from a book

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the review remove endpoint is:
`localhost:4000/api/review/remove`
There is 1 required parameters for this endpoint.
| Parameter | Description                                | Example     |
|-----------|--------------------------------------------|-------------|
| ID        | ID of the review                           | 1           |

##### Responses
responses 200 "review removed"

#### Find_books API
##### Overview
The find_books endpoint for the review allows the client to get all reviews for a given book.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the review find_books endpoint is:
`localhost:4000/api/review/find_books`
There is 1 required parameters for this endpoint.
| Parameter | Description                                | Example     |
|-----------|--------------------------------------------|-------------|
| Book        | ID of the book                              | 1           |

##### Responses
An array of reviews sorted by descending order. The review object is shown below 
| Key           | Value Type | Description                                         |
|---------------|------------|-----------------------------------------------------|
| user          | user_id     | ID of the user who wrote review                             |
| book          | book_id   | ID of the book for which the review was written                        |
| rating        | number     | The rating of the book                               |
| review        | string       | the text of the review                     |
| time          | date        | The date when the review was made               |


### Friends
#### Request API
##### Overview
The request endpoint for the API allows the client to fetch a user from the server and send them a request to add each other to their respective friends lists.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the request endpoint is:
`[url]/api/friends/request`
There are 2 required parameters and zero optional parameters for this endpoint.
| Parameter | Description                                  | Example     |
|-----------|----------------------------------------------|-------------|
| userA     | The user who is sending the friend request   | joepasquale |
| userB     | The user who is receiving the friend request | barackobama |
##### Responses
response status 200 "friend requested"

#### Accept API
##### Overview
The accept endpoint for the API allows the client to accept a friend request received from another user on the server.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the accept endpoint is:
`[url]/api/friends/accept`
There are 2 required parameters and zero optional parameters for this endpoint.
| Parameter | Description                                  | Example     |
|-----------|----------------------------------------------|-------------|
| userA     | The user who is sending the friend request   | joepasquale |
| userB     | The user who is receiving the friend request | barackobama |

##### Responses
response status 200 "friend accepted"

#### Reject API
##### Overview
The reject endpoint for the API allows the client to reject a friend request received from another user on the server.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the reject endpoint is:
`[url]/api/friends/reject`
There are 2 required parameters and zero optional parameters for this endpoint.
| Parameter | Description                                  | Example     |
|-----------|----------------------------------------------|-------------|
| userA     | The user who is sending the friend request   | joepasquale |
| userB     | The user who is receiving the friend request | barackobama |

##### Responses
response status 200 "friend removed"

#### Find API
##### Overview
The find endpoint for the API allows the client to search for a friend on their friends list

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/friends/find`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    id     | The database id for the user         |    1    |

##### Responses
The Find API returns all response data as a JSON object. The full details for the response format are shown below:
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| requester       | user_id    | The id of the user                  |
| receiver          | user_id    | The id  of the user         |
| status      | number     | The status of their friend relationship          |

#### All API
##### Overview
The All endpoint for the API allows the client to get all friends on their friends list

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/friends/all`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    array     | an array of friend ids         |    [1 , 2, 3]    |

##### Responses
The All API returns an array of friend objects for a specific user.
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| requester       | user_id    | The id of the user                  |
| receiver          | user_id    | The id  of the user         |
| status      | number     | The status of their friend relationship          |

### Login
#### Register API
##### Overview
The register endpoint for the API allows the client to send a request to the server to store a new user.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the request endpoint is:
`[url]/api/login/register`
There are 5 required parameter and zero optional parameters for this endpoint.
| Parameter      | Description                           | Example            |
|----------------|---------------------------------------|--------------------|
| username       | The name of the user                  | joep               |
| email          | The email address of the user         | joep@gmail.com     |
| password       | The password of the user              | password123
| firstname      | The first name of the user            | Joe                |
| lastname       | The last name of the user             | Pasquale           |

##### Responses
The register API returns a JWT token to the user on success on failure it returns a 400 error
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| token          | string     | The authentication token of the user  |

#### Login API
##### Overview
The register endpoint for the API allows the client to send a request to the server to store a new user.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the request endpoint is:
`[url]/api/login/`
There are 2 required parameter and zero optional parameters for this endpoint.
| Parameter      | Description                           | Example            |
|----------------|---------------------------------------|--------------------|
| username       | The name of the user                  | joep               |
| password       | The password of the user              | password123

##### Responses
The login API returns a JWT token to the user on success on failure it returns a 400 error
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| token          | string     | The authentication token of the user  |

### User
#### Read API
##### Overview
The read endpoint for the API allows the client to read the information for a specific user on the server.
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/user/read`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    id     | The database id for the user         |    1    |

##### Responses
The user API returns all response data as a JSON object. The full details for the response format are shown below:
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| username       | string     | The name of the user                  |
| email          | string     | The email address of the user         |
| firstname      | string     | The first name of the user            |
| lastname       | string     | The last name of the user             |
| favorite_book  | string     | The title of the user's favorite book |
| favorite_genre | string     | The user's favorite genre             |
| friends        | [Friend_id]    | A list of the user's friends          |
| reviews        | [review_id]    | A list of the user's reviews         |
| booklist        | [booklist_id]    | A list of books in user's booklist          |

#### Search API
##### Overview
The search endpoint for the API allows the client to search for a user on the server.
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/user/search`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    search | A query for the user                 |  joe    |

##### Responses
The Search API responses with a list of found user objects or a 400 error for no users found.
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| profiles       | User       | The list of user objects found by the search

#### Update API
##### Overview
The update endpoint for the API allows the client to update information for a user on the server.
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/user/info/update`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter      | Description                           | Example            |
|----------------|---------------------------------------|--------------------|
| username       |  The username of the user| joshvasilevsky |
| info    	| The info object: firstname, lastname, favorite_book, favorite_genre|josh, vasilevsky, hunger games, mystery |

##### Responses
response 200 "user updated"

#### Me API
##### Overview
The me endpoint for the API allows the client to read the information for the logged in user.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/user/me`
There are no required parameter and zero optional parameters for this endpoint.
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| token       | JWT token    | the stored web token                 |

##### Responses
The ME API responses with the corresponding user or a 401 error
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| username       | string     | The name of the user                  |
| password       | string     | The password of the user              |
| email          | string     | The email address of the user         |
| firstname      | string     | The first name of the user            |
| lastname       | string     | The last name of the user             |
| favorite_book  | string     | The title of the user's favorite book |
| favorite_genre | string     | The user's favorite genre             |
| friends        | [Friend_id]    | A list of the user's friends          |
| reviews        | [review_id]    | A list of the user's reviews         |
| booklist        | [booklist_id]    | A list of books in user's booklist          |

### Update
#### all API
##### Overview
The all endpoint for the API allows the client to get all updates made by users on their friends list
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/updates/all`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    array     | and array of the users friends       |    1    |

##### Responses
The all api returns a lit of update objects to the user
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| user      | user_id     | the id of the user who made the update               |
| book          | book_id     | the id of the book the update was made on         |
| time      | Date     | the time the update was made            |
| change       | object     | the change the user made             |



#### add API
##### Overview
The add endpoint for the API allows the client to create a comment for a specific update
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/comment/add`
There is 3 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    User     | The database id for the current user         |    1    |
|    Update     | The database id for the update        |    2    |
|    Comment     | the user comment as a String       |    "nice!"    |

##### Responses
response status 200 "comment added"

#### remove API
##### Overview
The remove endpoint for the API allows the client to remove their comment from an update
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/comment/remove`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    ID     | The id for the comment    |    1    |

##### Responses
response status 200 "comment removed"

#### all API
##### Overview
The all endpoint for the API allows the client to get all comments made on specific update
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/comment/all`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    Update     | The database id for the update        |    1    |

##### Responses
The all api returns a lit of comments on the update
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| user      | user_id     | the id of the user who made the comment               |
| update      | update_id     | the id of the update             |
| time      | Date     | the time the comment was made               |
| message      | String     | the message in the comment              |

### Booklist

#### Add API
##### Overview
The add endpoint for the API allows the client to add a book to a specified users booklist

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the request endpoint is:
`[url]/api/booklist/add`
There are 3 required parameters and zero optional parameters for this endpoint.
| Parameter | Description                                  | Example     |
|-----------|----------------------------------------------|-------------|
| User     | The id of the user whos adding book to list  | 4 |
| Book     | The id of the book being added to list | 3 |
| Status     | The list the book is being inserted to | 2 (currently reading) |

##### Responses
response status 200 "book added"

#### Remove API
##### Overview
The remove endpoint for the API allows the client to remove a book from their booklists

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the accept endpoint is:
`[url]/api/booklist/remove`
There are 2 required parameters and zero optional parameters for this endpoint.
| Parameter | Description                                  | Example     |
|-----------|----------------------------------------------|-------------|
| User     | The id of the user whos adding book to list  | 4 |
| Book     | The id of the book being added to list | 3 |

##### Responses
response status 200 "book removed"

#### Find API
##### Overview
The find endpoint allows the user to find a relationship between them and a book

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the reject endpoint is:
`[url]/api/booklist/find`
There are 2 required parameters and zero optional parameters for this endpoint.
| Parameter | Description                                  | Example     |
|-----------|----------------------------------------------|-------------|
| User     | The id of the user whos adding book to list  | 4 |
| Book     | The id of the book being added to list | 3 |

##### Responses
returns the relationship between a user and a book
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| user      	 | user_id |The id of the user whos adding book to list  | 4 |
| book     	 | book_id |The id of the book being added to list | 3 |
| status     	 | number   |The list the book is in | 3 (finished reading) |


#### All API
##### Overview
The all endpoint for the API allows the client to get all books in their booklists

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`[url]/api/booklist/all`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    array    | an array of booklist object ids         |    [1, 2, 3]    |

##### Responses
The all API returns a list of booklist objects which represent the relationship between  a user and a book
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| user      	 | user_id |The id of the user whos adding book to list  | 4 |
| book     	 | book_id |The id of the book being added to list | 3 |
| status     	 | number   |The list the book is in | 3 (finished reading) |

## Database
Our application uses a MongoDB non-relational database. 

### Friends
This stores a friend relationship between 2 user. The status field indicates what type of friendship the users have. A reference to one user is stored in requester and the other is stored in receiver.

Friend document
```
{
    _id: ObjectId
    Requester: UserID, // User who sent the friend request
    Receiver: UserID, // User who received the friend request
    Status: Number, // Status of the friend request; 1 means requested, 2 means pending, 3 means friends
}
```

### User
This stores the information on the user as well as arrays of references to books, friends, and reivews to store users booklist, friends, and reviews respectively.

User document
```
{
    _id: ObjectId
    username: String, // Username for this UserID
    email: String, // User's email address
    password: String, // User's password
    info:{
        firstname: String, // User's first name
        lastname: String, // User's last name
        favorite_book: String, // User's selected favorite book
        favorite_genre: String, // User's selected favorite genre
    }
    booklist:[ booklist_id ], // User's book
    friends: [ friend_id ], // User's friends
    reviews: [ review_id ], // User's Book Reviews
}
```

### Book
This stores the information for each book and any reviews which are added to it.

Book document
```
{
    _id: ObjectId
    title: String, // Title of the book
    author: String // Author of the book
    publisher: String, // Publisher of the book
    publishedDate: String, // Publishing Date of the Book
    ISBN:[{
        type: String , // type of identifier number 
        identifier: String //identification number 
    }],
    description: String, // A short description of the book
    categories: String, // The genre(s) of a book
    googleRating: Number, // A rating of the book fetched from Google
    imageLinks: {
         smallThumbnail: String , // small picture of book cover
        thumbnail: String , //larger picture of book cover
    },
    userReview:[ review_id ] // List of book's reviews
}
```

### Booklist
The booklist is a relationship between a book and a user. The stus indicates what book list the book is in. The book is a references to a book object and user is a reference to a user object.

BookList document
```
{
    _id: ObjectId
    user: user_id, // ID of the user whom the list belongs to
    book: book_id, // ID of book on the list
    status: Number, // Denotes which list is selected; 1 is Want to read, 2 is Currently reading, 3 is Completed reading, 4 is Quit Reading
}
```

### Update
Stores updates made by users. This can either be a book being added, moved, or removed from a list, or a review being posted about a book. These updates show up in your feed.

Update document
```
{
    _id: ObjectId
    user: user_id, // ID of the user who is posting the update
    book: book_id, // ID of book being posted about
    time: Date, // Timestamp of when the update was posted
    change: Any, // object that is changing
     
}
```

### Comment
Comments made on updates. It stores the user who made the comment and the update they made it on.

Comment document
```
{
    _id: ObjectId
    user: user_id, // ID of the user who is posting the comment
    update: update_id, // Post where the comment is being made
    time: Date, // Timestamp of when the update was posted
    message: String, // Content of the comment
}
```

### Review
These are reviews made on books. The user is the user making the review and the book is the book the review is made on. It also stores the message and rating of the review.

Review document
```
{
    _id: ObjectId
    user: user_id, // ID of the user who is posting the review
    book: book_id, // Post where the review is being made
    time: Date, // Timestamp of when the update was posted
    message: String, // Content of the review
    rating: Number // rating of the book
}
```


## URL Mappings

### Static Content

| URL | Description |
| --- | ----------- |
|`[url]/index.html`| The home page of our Site. Gives a short desciption of our application |
|`[url]/login.html`|  The login page that allows the user to login|
|`[url]/signup.html`| Signup page to create a new user/account|
|`[url]/resources/`| Servers static contents stored in the resources folder of our applcation |
|`[url]/javascript/`| Serves javascript files stored in the javascript folder of our applcation |

### Static Authorized Content
| URL | Description |
| --- | ----------- |
|`[url]/auth/booklist.html?user=`| The booklist page that shows users book lists such as want to read, currently reading, finished, and dropped. The user has to be autheniticated to access this page|
|`[url]/auth/bookPage.html?book=`| The book page shows the information about each book. Users can post reviews here. The user has to be autheniticated to access this page|
|`[url]/auth/friendlist.html?user=`| The friends lsit page that shows users friends. Either friend, requests, or pending. The user has to be autheniticated to access this page|
|`[url]/auth/homefeed.html`| The home feed page that shows updates of friends such as when they add books to their lists. The user has to be autheniticated to access this page|
|`[url]/auth/search-results.html?q=`| The search-reuslt page shows book and profile results for queries. The user has to be autheniticated to access this page|
|`[url]/auth/profile.html?user=`| The profile page shows the user profile info and links to booklist and friends list. The user has to be autheniticated to access this page|

### Book
| URL | Description |
| --- | ----------- |
|`[url]/api/book/add`|API call to add a book|
|`[url]/api/book/read`|API call to get info on a book|

### Booklist
| URL | Description |
| --- | ----------- |
|`[url]/api/booklist/add`|API call to add a book to a user's booklist object|
|`[url]/api/booklist/remove`|API call to remove a book from a user's booklist object |
|`[url]/api/booklist/find`|API call lto find if a book is already in a users booklist|
|`[url]/api/booklist/all`|API call to get all books in a booklist|

### Friend
| URL | Description |
| --- | ----------- |
|`[url]/api/friend/request`|API call to create a new request between users|
|`[url]/api/friend/accept`|API call to accept a friend request|
|`[url]/api/friend/reject`|API call to reject a friend request|
|`[url]/api/friend/all`|API call to get all friends of a user|
|`[url]/api/friend/find`|API call to find if a user is already a friend|

### Update
| URL | Description |
| --- | ----------- |
|`[url]/api/updates/all`|API call to get all updates from those who are friends with a user|

### Review
| URL | Description |
| --- | ----------- |
|`[url]/api/review/add`|API call to add a new review to a book|
|`[url]/api/review/remove`|API call to remove a remove from a book|
|`[url]/api/review/find_books`|API call to find book reviews ordered by time stamp|

### User
| URL | Description |
| --- | ----------- |
|`[url]/api/user/read`|API call to get info on user|
|`[url]/api/user/search`|API call to search for a user with a similar username|
|`[url]/api/user/info/update`|API call to update the users info|
|`[url]/api/user/me`|API call to get logged in user|

### Login
| URL | Description |
| --- | ----------- |
|`[url]/api/login/`|API call to log the user in. Validates info and returns JWT token|
|`[url]/api/login/register`|API call to createe a new user and returns a JWT token|

### Comments
| URL | Description |
| --- | ----------- |
|`[url]/api/comment/add`|API call to add a comment to an update|
|`[url]/api/comment/remove`|API call to remove a comment from an upddate|
|`[url]/api/comment/all`|API call to get all comments for a specific update|


## Authentication

For authentication our application used JSON Web Tokens stored in session storage to authenticate users. When a user creates an account their password is hashed using brcyptjs. When a user logs into the application their password is checked against the hash and username is checked against the existing username to validate whether the username and password combo was correct. If a users credentials are correct then a temporay JSON web token is sent back to the user. This token has an expiration time of one hour. Everytime a user navigates to a new page their token is checked for validity. If the token is valid it will allow them to proceed to the page. If the token is invalid or has expired then the user is redirected back to the login page. The authentication is also check on API calls. Every call attaches the token in the header of the POST request. The token is validated and the route either responses with an invalid token or its normal functionality. 


## Contributions

The following were the contributions made during the Project:

 - Joshua Vasilevsky
    - Frontend HTML/CSS
        - navbar and footer
        - index.html
        - profile.html
        - search-results.html
        - booklist.html
        - friendlist.html
    - Frontend TypeScript/JavaScript
        - auth.js
        - booklist-xhr.js
        - bookPage-xhr.js (contributed)
        - friendslist-xhr.js (contributed)
        - login-xhr.js
        - NavRedirect.js
        - profile-xhr.js
        - search-xhr.js
    - Backend TypeScipt/JavaScript
        - Middleware 
            - auth.ts
            - update.ts (contributed)
        - Models
            - book.ts
            - friends.ts
            - update.ts (contributed)
            - review.ts
            - user.ts
        - Routes
            - book.ts
            - friends.ts
            - login.ts
            - review.ts
            - update.ts (contributed)
            - booklist.ts (contritbuted)
            - user.ts
        - myserver.ts
    - Milestone 1 Markdown
    - Final Markdown (contributed)
 - Daniel Coley
    - Frontend HTML/CSS
        - Homefeed.html
        - bookpage.html
    - Frontend TypeScript/JavaScript
        - populatefeed.js
        - homefeed-xhr.js
        - bookPage-xhr.js  (contributed)
    - Backend TypeScipt/JavaScript
        - Middleware 
            - update.ts (contributed)
        - Models
            - update.ts (contributed)
            - booklist.ts
            - comment.ts
        - Routes
            - update.ts (contributed)
            - booklist.ts (contritbuted)
            - comment.ts
 - Joe Pasquale
    - Frontend HTML/CSS
        - login.html
        - signup.html 
        - search-results.html
    - Frontend TypeScript/JavaScript
        - friendslist-xhr.js (contributed)
    - Milestone 2 Markdown
    - Milestone 3 Markdown
    - Final Markdown (contributed)


## Conclusion

Overall, we learned a lot from this project. Specifically, some of the skills that we developed were how to use MongoDB, how to actually develop APIs, how to write detailed and thorough documentation, and how to effectively implement CRUD to give users a functional application. Along this, we learned about how we should prepare a full scale project, and what steps we should take if we wanted to develop an application of our own, especially when it comes to organizing the design process.

Some of the difficulties that we encountered was that we felt that a lot of the project was learn-on-the-fly. For example, while there was a lot of guidance on how to write CRUD operations, there was not a lot of guidance on how to create routes or middleware or models. These are all essential to using CRUD operations when connected to a remote database, and we felt that it was a topic that we would have benefitted from more guidance from. 

Some of the changes that we would suggest is that, under normal circumstances, a little bit of class time should be spent on BootStrap, Heroku, and GitHub's pull requests specifically. Another issue that we had was that we felt that using static pages and updating them dynamically was confusing and complex. While we understand that the point of the class was to get comfortable with web development **without** a framework, it seemed unnesseccarily complicated at points. Finally, this may have been because of the current global circumstances, but we felt disconnected from the rest of the class in the regard that we did not have a semblance of other groups' progress, and what kind of issues they were facing.

## Video Demo

https://www.youtube.com/watch?v=1p2Dk1hi7B0&list=PLbTmqqGclWPIyj1DOb6WwfmpuYCC78vzR&index=2&t=0s&ab_channel=DanielShaneColey
