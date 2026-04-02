PostgreSQL Quick Start

1) Installation
- Windows: download installer from https://www.postgresql.org/download/windows/ or use Chocolatey:

```powershell
choco install postgresql
```

2) Basic CLI

```bash
psql -U postgres
CREATE DATABASE portfolio_db;
\c portfolio_db
```

3) Create a user and grant privileges

```sql
CREATE USER fiastara WITH PASSWORD 'change_me';
GRANT ALL PRIVILEGES ON DATABASE portfolio_db TO fiastara;
```

4) Basic DDL/DML examples

- Create table:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

- Insert/select:

```sql
INSERT INTO users (name, email) VALUES ('Fiastara', 'fiastara@example.com');
SELECT * FROM users;
```

5) Transactions

```sql
BEGIN;
-- multiple statements
COMMIT;
-- or ROLLBACK on error
```

6) Links & Tools
- psql docs: https://www.postgresql.org/docs/current/app-psql.html
- pgAdmin: GUI admin tool
- Sequelize / TypeORM: ORMs for Node.js
