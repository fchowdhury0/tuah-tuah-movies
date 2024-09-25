### NOTE: This will undo any rows or cells you have added or changed in the database ###

To update the database:

1) Open command line and navigate to the project directory

2) Update tables and database structure. Run: 

psql -U postgres -d movietheater -f "database/setup_movietheater.sql"
Password: *password you set during install*


3) Seed the updated database. Run: 

psql -U postgres -d movietheater -f "database/seed.sql" 
Password: *password you set during install*

