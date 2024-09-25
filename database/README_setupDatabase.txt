Setting up the Database locally 


### Install Postgres ###

1. Download and install from: 

https://www.postgresql.org/download/

2. Follow the installation steps and set a password




### Creating the Database  ###

1. Open command line and navigate to the project directory
2. First create the database. Run: 

psql -U postgres -f "database/create_database.sql"
Password: *password you set during install*


3. Next, set up the tables for the database. Run:

psql -U postgres -d movietheater -f "database/setup_movietheater.sql"
Password: *password you set during install*





### Seeding the Database ###

1. Open command line and navigate to the project directory
2. Run: 

psql -U postgres -d movietheater -f "database/seed.sql" 
Password: *password you set during install*


   This should populate your "movies" table with movies and add a admin user with username 'admin_user' and password '1234' 