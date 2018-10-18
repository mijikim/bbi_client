## To run the project

This project can be run in two ways:

1. `$ npm install`
2. `$ npm start`

This will run the app in the development mode at [http://localhost:3000](http://localhost:3000).

or 

1. `$ npm install`
2. `$ npm run build`
3. `$ npm install -g serve`
4. `$ serve -s build`

This will run the app in the production mode at [http://localhost:5000](http://localhost:5000).

This project was developed in unix environment using node v10.0.8 and npm v6.3.0.

## To obtain an access token

Access token can be retrieve by going to [https://superheroapi.com/](https://superheroapi.com/).

## Login

To obtain user's access token data, Login page was built. When user tries to
access the application, a request to endpoint is made to get valid response.
If the response fails, then we block the user from access the website.
The only public page is /login. Any other route is private and requires isAuthenticated
boolean value in the redux state to be true.

Encrypted access token value gets stored in sessionStorage. When interacting with 
any endpoints, token is retrieved from sessionStorage, decrypted, and gets 
used in constructing the correct url.

## Character search

Due to lack of querying functionality, the application shows searching functionality instead of
browsing functionality. When user enters a name that they wish to search for, a request
is made to API. The result is then stored into redux store in two ways. 

The name gets stored in an array, and that name gets mapped to an array of characters ids
retrieved from the response body.  The full character object is also stored in the state in 
an object using the id as their key.  

This allows subsequent request to same character name to be retrieved from the state
instead of making a new request. Also since the result from /search/:name request
is extensive, we do not need to make another request to retrieve data when rendering
/result page.


## Character comparison

When user presses compare button from /compare page, the selected character ids
are used to retrieve character information stored in redux store. At this point,
all the character details are available in a map with key as the id so retrieval 
of data has time complexity of o(1). For current iteration, the user will see stats
as well as character's appearance details.

## CORS proxy

Due to missing Access-Control-Allow-Origin in the header, any request made from
the browser fails by CORS same-origin policy. To bypass this, a request is made
with a cors proxy url.  The downside of this is that it increases our response time.

## Bootstrapping

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
This allows faster development process since less time is allocated on configuring 
the application.  

## Usage of redux, redux-saga

Redux allows management for application state to occur in one place.  The state is also
immutable, so it prevents any code outside of redux store from mutating the state by 
mistake. This reduces chance of bugs getting introduced to the code.  Redux-saga allows
any side effects to occur in a different process ie. fetching a data from a server. 

## Unit testing

Tests are written for all reducers, sagas, and selectors.  Tests can be run with ``npm test``.
By default, the tests are ran with jest so jest syntax are utilized. 

## Improvements

- Create error message handler that takes in key as an argument. If no matching error is found
or no key is provided, return general error message. 
- Allow profile options to be tabbable for better UX
- Add more styling to the application and add transitioning effects
- Provide an ability for a user to choose a theme for the application. A module such as
 react-theme-provider can be a candidate. Or we can use HOC that provides theme via
 context to all of this child components. 
 - Create a schema for /result page that defines what information should be shown
 to allow addition or removal data shown on page without update the component.
 