# AuthLog_GraphQL-TS

Todo:
-user registration
-input validation
-user login
-protection to different resolvers (authorization & middleware)
-confirmation emails when users register
-forgot password and changing password functionality


Technologies: GraphQL, Postgres, Apollo, bcrypt, redis























notes on graphQL:
GraphQL seems to be much more capable than a REST API, you can set each field to have it's own query parameters and nested objects can even have their own arguments.
A cool feature of GraphQL is that you can pass arguments into scalar fields, so if a client wanted to have the price of a painting returned, we could return something like the following:
{
	painting(id: "3005") {
		name
		price(unit: EUROS)
	}
}

And the thing I want to highlight is in the price, we're specifying we wanted that data to be outputted in EUROS, and we could have that unit change depending on location, or a set preference whatever really. Just a cool functionality of GraphQL.


notes on Redis use:
Redis is storing session data, I have cookies holding properties that only allow access by HTTP so javascript can't access it and secure only works for HTTPS when in production.