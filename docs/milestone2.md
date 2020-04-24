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
#### Book
##### Create API
###### Overview
The create endpoint for the book provides a way for the client to add a new book to the server by looking it up on the Google Book API.

###### Endpoint URI and Parameters
Assuming you are deploying the server on localhost with port 4000, the URI for the add endpoint is:
`localhost:4000/api/book/add`
There are x required parameters and zero optional parameters for this endpoint.
| Parameter | Description | Example |
|-----------|-------------|---------|
|           |             |         |
|           |             |         |
|           |             |         |

###### Responses
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

##### Read API

#### User

#### Friends

## User Interface & CRUD Interactions

## Contributions
 - Josh
    - 
 - Dan
    - 
 - Joe
    -