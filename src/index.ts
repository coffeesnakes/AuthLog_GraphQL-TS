import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import * as Express from "express";
import { buildSchema, Resolver, Query } from "type-graphql";


@Resolver()
class testResolver {
	@Query( () => String, { nullable: true, } )
	async hellofriend() {
		return "you made your first graphqQL query";
	}
}

const main = async () => {
	const schema = await buildSchema({
		resolvers: [testResolver],
	});

	const apolloServer = new ApolloServer({schema})

	const app = Express();

	apolloServer.applyMiddleware({ app });

	app.listen(3005, () => {
		console.log("server started on http://localhost:3005/graphql")
	})
}

main();