import { ApolloServer } from "apollo-server-express";
import "reflect-metadata";
import Express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { RegisterResolver } from "./modules/user/Register";
import session from "express-session";
import connectRedis from "connect-redis";
import { redis } from "./redis";
import cors from "cors";

const main = async () => {
	await createConnection();
	const schema = await buildSchema({
		resolvers: [RegisterResolver],
	});

	const apolloServer = new ApolloServer({
		schema,
		context: ({ req }: any) => ({ req })
	});

	const app = Express();

	const RedisStore = connectRedis(session);

	app.use(cors({
		credentials: true,
		origin: "http://localhost:3005"
	}));

	app.use(
		session({
			store: new RedisStore({
				client: redis as any
			}),
			name: "qid",
			secret: "SESSION_SECRET",
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // this is equal to 7 years
			},
		})
	);

	apolloServer.applyMiddleware({ app });

	app.listen(3005, () => {
		console.log("server started on http://localhost:3005/graphql")
	})
};

main();