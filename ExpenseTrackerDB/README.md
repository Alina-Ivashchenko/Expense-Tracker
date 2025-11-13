FOR INSTRUCTOR REVIEW
This submission includes a fully implemented MySQL database schema for the Expense Tracker project.
All core requirements have been verified:

- Database schema implemented successfully
- Primary and foreign keys defined with correct one-to-many relationships
- Data validation and constraints added (NOT NULL, UNIQUE, ENUM, UNSIGNED)
- CRUD operations tested (Create, Read, Update, Delete)
- Cascade and Set Null behaviors verified for referential integrity

All work was completed and tested in MySQL Workbench.


OVERVIEW
This folder contains the complete MySQL database schema for the Expense Tracker web application.
It defines all tables, keys, and relationships needed for managing users, categories, and expenses.


CONTENTS
001_init.sql - Creates all tables (users, categories, expenses)
002_indexes.sql - Adds useful indexes for performance
003_seed.sql - Inserts sample data for quick testing


HOW IT WAS CREATED
The database was designed and implemented directly in MySQL Workbench using structured SQL scripts.
Each script builds on the previous one, which makes it portable; any teammate can recreate the same database by running the scripts in order.

To build it:
1. Open MySQL Workbench.
2. Connect to your local MySQL server.
3. Open and execute in order:
   001_init.sql
   002_indexes.sql
   003_seed.sql
4. Refresh your schema list to see "expense_tracker" with all tables and data.


RELATIONSHIPS
User -> Categories = 1-to-Many
User -> Expenses = 1-to-Many
Category -> Expenses = 1-to-Many (optional, since some expenses might not have a category)

Foreign Keys:
categories.user_id -> users.id (ON DELETE CASCADE)
expenses.user_id -> users.id (ON DELETE CASCADE)
expenses.category_id -> categories.id (ON DELETE SET NULL)


VALIDATION AND CONSTRAINTS
- Unique email per user
- Required fields enforced with NOT NULL
- Valid transaction type via ENUM('income','expense')
- Non-negative amounts via BIGINT UNSIGNED
- Auto timestamps (created_at, updated_at)
- Category names unique per user (UNIQUE(user_id, name))


CASCADE BEHAVIOR (TESTED)
Deleting a user removes their categories and expenses automatically.
Deleting a category sets related expenses.category_id to NULL.
All foreign key relationships were tested successfully.