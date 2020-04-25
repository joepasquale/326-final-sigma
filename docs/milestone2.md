# 326-final-sigma

## Team:
Sigma

## Name of Application:
Shelf: **[Access via Heroku](https://limitless-garden-19995.herokuapp.com/)**

## Team Overview:
- Daniel Coley, https://www.github.com/DANSC111
- Joe Pasquale, https://www.github.com/JoePasquale
- Joshua Vasilevsky, https://www.github.com/joshvasilevsky

## API Documentation
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
| userRating    | double     | A rating of the book fetched from users of the site |
| userReview    | string     | A review of the book fetched from users of the site |

#### Review Create API
##### Overview
The review create endpoint for the book provides a way for the client to add a user review to an existing book from the server.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the review create endpoint is:
`localhost:4000/api/book/review/create`
There are 2 required parameters and 1 optional parameter for this endpoint.
| Parameter | Description                                | Example     |
|-----------|--------------------------------------------|-------------|
| id        | ID of the book being rated                 | 1           |
| rating    | A rating out of 5 on how good the book was | 4.5         |
| review    | A review of the book                       | I loved it! |

##### Responses
There is no response from this endpoint.

### User
#### Read API
##### Overview
The read endpoint for the API allows the client to read the information for a user on the server.
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`localhost:4000/api/user/read`
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
| friends        | Friends    | A list of the user's friends          |

#### Search API
##### Overview
The search endpoint for the API allows the client to search for a user on the server.
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`localhost:4000/api/user/search`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    search | A query for the user                 |  joe    |

##### Responses
The user API returns all response data as a JSON object. The full details for the response format are shown below:
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| profiles       | User       | The list of users found by the search

#### Update API
##### Overview
The update endpoint for the API allows the client to update information for a user on the server.
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`localhost:4000/api/user/info/update`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter      | Description                           | Example            |
|----------------|---------------------------------------|--------------------|
| username       | The name of the user                  | joep               |
| email          | The email address of the user         | joep@gmail.com     |
| firstname      | The first name of the user            | Joe                |
| lastname       | The last name of the user             | Pasquale           |
| favorite_book  | The title of the user's favorite book | Night              |
| favorite_genre | The user's favorite genre             | Historical Fiction |

##### Responses
There is no response from the server for this endpoint.

#### Me API
##### Overview
The me endpoint for the API allows the client to read the information for themselves on the server.
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`localhost:4000/api/user/me`
There are no required parameter and zero optional parameters for this endpoint.

##### Responses
The user API returns all response data as a JSON object. The full details for the response format are shown below:
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| username       | string     | The name of the user                  |
| password       | string     | The password of the user              |
| email          | string     | The email address of the user         |
| firstname      | string     | The first name of the user            |
| lastname       | string     | The last name of the user             |
| favorite_book  | string     | The title of the user's favorite book |
| favorite_genre | string     | The user's favorite genre             |
| friends        | Friends    | A list of the user's friends          |

### Friends
#### Request API
##### Overview
The request endpoint for the API allows the client to fetch a user from the server and send them a request to add each other to their respective friends lists.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the request endpoint is:
`localhost:4000/api/friends/request`
There are 2 required parameters and zero optional parameters for this endpoint.
| Parameter | Description                                  | Example     |
|-----------|----------------------------------------------|-------------|
| userA     | The user who is sending the friend request   | joepasquale |
| userB     | The user who is receiving the friend request | barackobama |
##### Responses
There is no response from this endpoint.

#### Accept API
##### Overview
The accept endpoint for the API allows the client to accept a friend request received from another user on the server.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the accept endpoint is:
`localhost:4000/api/friends/accept`
There are 2 required parameters and zero optional parameters for this endpoint.
| Parameter | Description                                  | Example     |
|-----------|----------------------------------------------|-------------|
| userA     | The user who is sending the friend request   | joepasquale |
| userB     | The user who is receiving the friend request | barackobama |

##### Responses
There is no response from this endpoint.

#### Reject API
##### Overview
The reject endpoint for the API allows the client to reject a friend request received from another user on the server.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the reject endpoint is:
`localhost:4000/api/friends/reject`
There are 2 required parameters and zero optional parameters for this endpoint.
| Parameter | Description                                  | Example     |
|-----------|----------------------------------------------|-------------|
| userA     | The user who is sending the friend request   | joepasquale |
| userB     | The user who is receiving the friend request | barackobama |

##### Responses
There is no response from this endpoint.

#### Find API
##### Overview
The find endpoint for the API allows the client to search for a friend on their friends list

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`localhost:4000/api/friends/find`
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
| friends        | Friends    | A list of the user's friends          |

#### Remove API
##### Overview
The find endpoint for the API allows the client to fetch a user from the server and remove them from their friends list.
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the remove endpoint is:
`localhost:4000/api/friends/remove`
There is 1 required parameter and zero optional parameters for this endpoint.
| Parameter | Description                          | Example |
|-----------|--------------------------------------|---------|
|    id     | The database id for the user         |    1    |

##### Responses
There is no response from this endpoint.

### Login
#### Register API
##### Overview
The register endpoint for the API allows the client to send a request to the server to store a new user.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the request endpoint is:
`localhost:4000/api/login/register`
There are 5 required parameter and zero optional parameters for this endpoint.
| Parameter      | Description                           | Example            |
|----------------|---------------------------------------|--------------------|
| username       | The name of the user                  | joep               |
| email          | The email address of the user         | joep@gmail.com     |
| password       | The password of the user              | password123
| firstname      | The first name of the user            | Joe                |
| lastname       | The last name of the user             | Pasquale           |

##### Responses
The login API returns all response data as a JSON object. The full details for the response format are shown below:
| Key            | Value Type | Description                           |
|----------------|------------|---------------------------------------|
| token          | string     | The authentication token of the user  |

## User Interface & CRUD Interactions

### Create

![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/Screenshots/create.png)


When the user is visiting a profile page that is not their own they have the option to add the other user as a friend. When the user presses the add friend button a new friend object is made and added to both users data. The friend schema is set up where it has sender and receiver fields and a status indicating the status of the users friendship. When the button is pressed 2 friend objects get created. One for each user with different status numbers. The id for each object gets added to an array of friends in the users schema.


### Update

![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/Screenshots/update.png)

When a user is on their own profile page they are able to enter information about themselves. The user info is stored in a field of the user schema called info. When the user presses the save button the updated info entered in the input boxes will be set to the user's info field.

### Read

![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/Screenshots/read.png)

The user is able to search for books and profiles using the search bar. This will search for user profiles from the database and return the search results to the user. To find books the app uses the Google Books API. The app queries the API and returns a list of books. We selected certain information from the API and add the books to our database and present the user with info. This does a combination of create and read as
we are creating books and reading user profiles.

### Delete

![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/Screenshots/deletecreate.png)

![alt text](https://github.com/joepasquale/326-final-sigma/blob/master/docs/pictures/Screenshots/delete.png)

When a user goes to a book page they have the option to add the book to their booklist. This is done by clicking one of the options in the drop down menu. The user also has an option to delete the book from their list (if it is in their list) by selected the option none. the above code snippet shows how this is achieved. The booklist schema has a reference to a user and a book. The user itself has an array of references to booklist objects.

## Contributions
The following were the contributions made for this milestone:

 - Josh
    - Responsible For:
      - search Book
      - heroku/database integration
      - profile profile
      - login/sign up
    - Frontend JS:
      - authorization of users
      - login xhr
      - part of the bookPage xhr
      - booklist xhr
      - profile xhr
      - search xhr
    - Server JS:
      - server side authorization
      - book model
      - user model
      - friends model
      - helped with booklist model
      - login routes
      - friends routes
      - user routes
      - book routes
      - helped with booklist routes
      - main server file (myserver.ts)
 - Dan
    - Homefeed xhr
    - BookPage xhr
    - booklist route
    - booklist model
    - Part of login xhr (signup portion)
    - HTML tweaks due to xhr (homefeed.html bookpage.html signup.html)

 - Joe
    - API Documentation
    - Setup Documentation
    - Friends List
