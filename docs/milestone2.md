# 326-final-sigma

## Team:
Sigma

## Name of Application:
Shelf: **[Access via Heroku](https://google.com)**

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
There are x required parameters and zero optional parameters for this endpoint.
| Parameter | Description | Example |
|-----------|-------------|---------|
|           |             |         |
|           |             |         |
|           |             |         |

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
There are x required parameters and zero optional parameters for this endpoint.
| Parameter | Description | Example |
|-----------|-------------|---------|
|           |             |         |
|           |             |         |
|           |             |         |

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
There are x required parameters and zero optional parameters for this endpoint.
| Parameter | Description | Example |
|-----------|-------------|---------|
|           |             |         |
|           |             |         |
|           |             |         |

##### Responses
There is no response from this endpoint.

### User
#### Read API
##### Overview
The read endpoint for the API allows the client to search for a user on the server. 
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`localhost:4000/api/user/read`
There are x required parameters and zero optional parameters for this endpoint.
| Parameter | Description | Example |
|-----------|-------------|---------|
|           |             |         |
|           |             |         |
|           |             |         |

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

### Friends
#### Request API
##### Overview
The request endpoint for the API allows the client to fetch a user from the server and send them a request to add each other to their respective friends lists.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the request endpoint is:
`localhost:4000/api/friends/request`
There are x required parameters and zero optional parameters for this endpoint.
| Parameter | Description | Example |
|-----------|-------------|---------|
|           |             |         |
|           |             |         |
|           |             |         |

##### Responses
There is no response from this endpoint.

#### Accept API
##### Overview
The accept endpoint for the API allows the client to accept a friend request received from another user on the server.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the accept endpoint is:
`localhost:4000/api/friends/accept`
There are x required parameters and zero optional parameters for this endpoint.
| Parameter | Description | Example |
|-----------|-------------|---------|
|           |             |         |
|           |             |         |
|           |             |         |

##### Responses
There is no response from this endpoint.

#### Reject API
##### Overview
The reject endpoint for the API allows the client to reject a friend request received from another user on the server.

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the reject endpoint is:
`localhost:4000/api/friends/reject`
There are x required parameters and zero optional parameters for this endpoint.
| Parameter | Description | Example |
|-----------|-------------|---------|
|           |             |         |
|           |             |         |
|           |             |         |

##### Responses
There is no response from this endpoint.

#### Find API
##### Overview
The find endpoint for the API allows the client to search for a friend on their friends list

##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the find endpoint is:
`localhost:4000/api/friends/find`
There are x required parameters and zero optional parameters for this endpoint.
| Parameter | Description | Example |
|-----------|-------------|---------|
|           |             |         |
|           |             |         |
|           |             |         |

##### Responses
There is no response from this endpoint.

#### Remove API
##### Overview
The find endpoint for the API allows the client to fetch a user from the server and remove them from their friends list.
##### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the remove endpoint is:
`localhost:4000/api/friends/remove`
There are x required parameters and zero optional parameters for this endpoint.
| Parameter | Description | Example |
|-----------|-------------|---------|
|           |             |         |
|           |             |         |
|           |             |         |

##### Responses
There is no response from this endpoint.

## User Interface & CRUD Interactions

## Contributions
The following were the contributions made for this milestone:

 - Josh
    - 
 - Dan
    - 
 - Joe
    -API Documentation
    -Setup Documentation