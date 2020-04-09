# 326-final-sigma

## Team:
Sigma

## Name of Application:
Shelf

## Team Overview:
- Daniel Coley, https://www.github.com/DANSC111
- Joe Pasquale, https://www.github.com/JoePasquale
- Joshua Vasilevsky, https://www.github.com/joshvasilevsky

## Innovative Idea
Our proposed application is a website which allows a user to sign up and store books that they are currently reading, have read, or plan to read. They can add information about the book to help categorize it, such as title, author, genre, ISBN, etc; there would also be information that would be optional to add, like the book's cover art, your rating, a review, etc. People can share their "shelves" with other people when they add them as a friend, them and they can comment on reviews from members of their friends list.  After we posted our idea in the Slack message board, it was brought to our group's attention that the exisiting website [GoodReads](https://www.goodreads.com) is similar to our idea. Upon further inspection, it seems that many users of the site say there are multiple problems with the platform. We are aiming to fix, improve, or redesign these design flaws with Shelf.

The main complaints that users of Goodreads have refer to the review and rating system, which we will improve on over the semester. Users have said that the recommendations are repetitive, with one user stating
> The recommendations suck, and the lists suck -- it's like, 100 lists telling me to read 'The Handmaid's Tale' and 'Harry Potter'.

Many users also complain about the stability of the application itself, stating that
> The app crashes often and is slow in general.

We aim to make a more stable and quick application by the end of the semester. You can find a thread of complaints [here](https://news.ycombinator.com/item?id=20904549).

## Data interactions
- Users will be able to add a book to one of four lists: "Have Read", "Currently Reading", "Dropped/Stopped reading" and "Will Read".
- Users will be able to add a book to their profile by inputting some critical information. These books will be pushed to a database, so that if another user was to try and log the same book, it would show up for them too.
- Users will be able to write reviews for books (in a similar fashion to how users make posts on Facebook), and will also be able to write comments on friends' reviews/feed updates.
- Users will be able to add other users as 'friends' and will be able to view their friend's reading lists and review history.
- Each book will have its own page where you can read the reviews and ratings for the books as well as a potential stretch goals such as adding links to where to buy the book
- Each user will have their own profile page that will allow users to see their review history, friends list, and books they have on their various lists.
- We are hoping to include a book database so most books do not have to be manually added to our website by Users.
- Since users have friends we will have to have page for managing friends such as pending requests and current friends as well as a way to delete friends.
- Users will be able to create accounts as a way to save the books they are Reading and add friends
- You will still be able to access the website without logging in so you can read reviews of books, but you will not be able to comment, rate, or do other actions that pertain to having a profile
- The website will need some sort of search functionality in order to find books or profiles. Thus we will need an additional page that gives back a well formatted list of search results as well as search bar somewhere on our page.
- We will also include a page for logging into our website as well as registering an accounts
- Add a recommend function that will recommend books based on the user's lists of books using highly rated books and their info. This should be different than how goodreads does it ( see complaint above)
- When looking at their own list, the user can interact with an action button (will figure out what its called later) where they can move books to other lists, change data, remove, etc.

# User Interface

## Sign In

Sign in Page for users

Wireframe:
![alt text](https://github.com/joepasquale/326-final-sigma/tree/master/docs/pictures/wireframe/login.png)

## Sign Up
Allow users to create accounts

Wireframe:
![alt text](https://github.com/joepasquale/326-final-sigma/tree/master/docs/pictures/wireframe/signup.png)

## Profile

The profile page allows users to see some basic inofmraiton as well as a snippet of their friends list and book list.

Wireframe:
![alt text](https://github.com/joepasquale/326-final-sigma/tree/master/docs/pictures/wireframe/profile.png)

## Friends List

The friends list has 3 tabs for your friends, friends requests recieved, and friend requests sent.

Wireframe:
![alt text](https://github.com/joepasquale/326-final-sigma/tree/master/docs/pictures/wireframe/friendlist.png)

## Book List

The Book List shows the users books that they want to read, are currently reading, have finished, or dropped. The edit button allows them to move the book between lists or delete it from the list entirely.

Wireframe:
![alt text](https://github.com/joepasquale/326-final-sigma/tree/master/docs/pictures/wireframe/booklist.png)

## Search Results

Search Results shows 3 different tyes of results. The first will be books added to the page by users, thhe next books retrieved from the book database we plan to use, and finally user profiles.

Wireframe:
![alt text](https://github.com/joepasquale/326-final-sigma/tree/master/docs/pictures/wireframe/searchresults.png)

## Home Feed

The home feed it similar to a feed on facebook. It shows activity of your firends as well as allows the user to make review posts about books. Users can also comment on other users activity.

Wireframe:
![alt text](https://github.com/joepasquale/326-final-sigma/tree/master/docs/pictures/wireframe/feed.png)

## Book Page

The book page shows an overview of a book. It contains the info about the book as well as reviews for the book. You can add the books to your lists from this page.

Wireframe:
![alt text](https://github.com/joepasquale/326-final-sigma/tree/master/docs/pictures/wireframe/bookpage.png)