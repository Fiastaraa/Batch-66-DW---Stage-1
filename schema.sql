CREATE TABLE "profile" (
  "id" integer PRIMARY KEY,
  "full_name" varchar,
  "bio" text,
  "avatar_url" varchar,
  "social_links" json,
  "created_at" timestamp
);

CREATE TABLE "projects" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "description" text,
  "thumbnail_url" varchar,
  "demo_url" varchar,
  "repo_url" varchar,
  "tech_stack" varchar,
  "created_at" timestamp
);

CREATE TABLE "blog_posts" (
  "id" integer PRIMARY KEY,
  "title" varchar,
  "slug" varchar UNIQUE,
  "content" text,
  "cover_image" varchar,
  "category_id" integer,
  "author_id" integer,
  "published_at" timestamp,
  "status" varchar
);

CREATE TABLE "categories" (
  "id" integer PRIMARY KEY,
  "name" varchar,
  "slug" varchar
);

CREATE TABLE "contact_messages" (
  "id" integer PRIMARY KEY,
  "sender_name" varchar,
  "sender_email" varchar,
  "subject" varchar,
  "message" text,
  "sent_at" timestamp
);

ALTER TABLE "blog_posts" ADD FOREIGN KEY ("category_id") REFERENCES "categories" ("id") DEFERRABLE INITIALLY IMMEDIATE;

ALTER TABLE "blog_posts" ADD FOREIGN KEY ("author_id") REFERENCES "profile" ("id") DEFERRABLE INITIALLY IMMEDIATE;
