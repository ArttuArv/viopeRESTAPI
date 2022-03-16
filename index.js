const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const helmet = require( 'helmet' );

const app = express();
app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( helmet() );

const port = process.env.PORT || 3000;

app.set( 'view engine', 'pug' );
app.set( 'views', './view' );

let movies = [
    {id: '1588323375416', title: 'Star Wars: Episode IX - The Rise of Skywalker', year: 2019, director: 'J.J. Abrams'},
    {id: '1588323390624', title: 'The Irishman', year: 2019, director: 'Martin Scorsese'},
    {id: '1588323412643', title: 'Harry Potter and the Sorcerers Stone', year: 2001, director: 'Chris Columbus'}
];

let customers = [
    {id: '1588323375416', firstname: 'John', lastname: 'Johnson', email: 'john@johnson.com', phone: '8233243'},
    {id: '1588323375417', firstname: 'Mary', lastname: 'Smith', email: 'mary@smith.com', phone: '6654113'},
    {id: '1588323375418', firstname: 'Peter', lastname: 'North', email: 'peter@north.com', phone: '901176'},
];

app.get( "/hello", ( req, res ) => {
    res.render( "hello", { firstname: 'John', lastname: 'Rambo' } );   
});

app.get( "/", ( req, res) => {
    res.render( "menu" );
});

app.get( "/movies", ( req, res ) => {
    res.render( "movielist", { movies: movies } );
});

app.get( "/addmovie", ( req, res ) => {
    res.render( "addmovie" );
});

app.post( "/addmovie", ( req, res ) => {
    const newMovie = { id: new Date().now, title: req.body.title, director: req.body.director, year: req.body.year };
    movies = [ ...movies, newMovie ];
    res.redirect( "/" );
});

//Customers
app.get( "/customer", ( req, res ) => {
    res.render( "customerlist", { customers: customers } );
});

app.get( "/addcustomer", ( req, res ) => {
    res.render( "addcustomer" );
});

app.post( "/addcustomer", ( req, res ) => {
    const newCustomer = { 
        id: new Date().now, 
        firstname: req.body.firstname, 
        lastname: req.body.lastname, 
        email: req.body.email, 
        phone: req.body.phone 
    };

    customers = [ ...customers, newCustomer ];
    res.redirect( "/customer" );
});

app.listen( port, () => {
    console.log( `Server is running on port ${port}.` );
});