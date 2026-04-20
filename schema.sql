CREATE TABLE "projects" (
  "id" SERIAL PRIMARY KEY,
  "slug" VARCHAR(255) UNIQUE NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "description" TEXT,
  "technologies" TEXT[], -- PostgreSQL array type
  "status" VARCHAR(50) NOT NULL DEFAULT 'Planning',
  "year" INTEGER,
  "challenge" TEXT,
  "solution" TEXT,
  "is_featured" BOOLEAN DEFAULT FALSE,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "contact_messages" (
  "id" SERIAL PRIMARY KEY,
  "sender_name" VARCHAR(255) NOT NULL,
  "sender_email" VARCHAR(255) NOT NULL,
  "subject" VARCHAR(255),
  "message" TEXT NOT NULL,
  "sent_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "username" VARCHAR(255) UNIQUE NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "password_hash" VARCHAR(255) NOT NULL,
  "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
