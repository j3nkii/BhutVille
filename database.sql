CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
	"username" VARCHAR (244) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE "characters" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
	"user_id" INTEGER REFERENCES "user"(id) ON DELETE CASCADE,
	"game_state" JSONB DEFAULT null
);