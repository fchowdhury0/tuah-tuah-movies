# READ FIRST 

This project was created in collaboration with 3 other students for my Data Structures class.

We were instructed to create a full-stack implementation of a movie theater website on which the user could create an account, log in, add up to (but no more than) three cards to their account, browse the available movies (stored in a localized seeded database), and book tickets for a particular viewing of the movie they have chosen.

For this project, we used a **React** frontend, bootstrapped with **Create React App**, and incorporated **Formik**, **Yup**, and **Sass** for form handling and styling. The backend was built using **Spring Boot** with **Maven**, handling the server-side logic and API endpoints.

My main responsibility was the design, creation, and implementation of the database for our movie theater. We used **PostgreSQL**, a **Relational Database Management System (RDBMS)** that uses SQL. For our purposes, we decided to use a localized seeded database, which we could update using a database creation ``.sql`` script and a ``seed.sql`` script to populate the database with example movies and showtimes.


In order to create the database from the ground up in a manner that would prevent any inconsistencies as the website was scaled, I made a list of tables along with the columns in each table and a primary key(PK). Then I determined how tables would be linked with one another, on a one-to-one or one-to-many basis; foriegn keys(FKs) would be referenced in each table accordingly. 

Below, I have included the Entity-Relationship Diagram (ERD) for our movie theater site, depicting the various tables and how they are linked to one another.

__DATABASE DESIGN PHILOSOPHY__: 

![Alt text](images/movietheater.png)

In the ERD above, a particular movie is tracked by a PK movie_id and can have 1 or many shows, each of which has PK show_id and represents a particular showtime of the movie with its own date, time, and seating chart. The seating charts are linked to their respective shows using the foriegn key(FK) show_id. 

Because each showing of a movie will have to track which seats are available or unavailable, it is necessary here to use a third "linking table" to track seating avaialable for a particular show_id in the shows table. This prevents data redundency and improves the scalability of the database. 

Using this method, the first table shows tracks each show_id as a particular showing of a referenced movie_id(FK), while the second table seating_chart table tracks only a grid template for the theater's seating chart, which is assumed to be the same in each theater showroom, and tracks a particular seat_id, its row and seat_number. For example, seat_id=3 could be in row A seat 3. Finally, a third table 3 is necessary to link each show with its own seating chart, so that show_seating_id, the primary key for this table, can track the reservation_status (reserved or open) of a particular show_id(FK) and seat_id(FK), which link to first two tables. 

In this manner, the database is able to track which seats are available or already reserved for a particular showing of a particular movie--and this information can then be displayed to the user when they are viewing the seating chart for a particular showing on the front-end during the ticket booking process. The user is then able to choose their seats from the seats still avaialable and proceed to buy tickets, and the database will then be updated to mark their seats as reserved so that no two users purchasing tickets will have reserved the same seats for the same showing. 


# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup (Spring Boot)](#backend-setup-spring-boot)
  - [Setting Up the Database Locally](#setting-up-the-database-locally)
- [Available Scripts](#available-scripts)
  - [Frontend Scripts](#frontend-scripts)
  - [Backend Scripts](#backend-scripts)
- [Running the Application](#running-the-application)
  - [Running the Backend](#running-the-backend)
  - [Running the Frontend](#running-the-frontend)

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

### Frontend

- **Node.js** (v14 or higher) & **npm**: [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/downloads)

### Backend

- **Java Development Kit (JDK)** (v17 or higher): [Download JDK](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- **Maven** (optional, if not using the Maven wrapper): [Download Maven](https://maven.apache.org/download.cgi)
- **Git**: [Download Git](https://git-scm.com/downloads)

### Database

- **PostgreSQL**: [Download PostgreSQL](https://www.postgresql.org/download/)

## Installation

### Frontend Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/jimmymachine/csci_4050
   cd csci_4050
   ```

2. **Navigate to the Frontend Directory**

   ```bash
   cd src
   ```

3. **Install Frontend Dependencies**

   Install the necessary dependencies, including the missing ones (`formik`, `yup`, `sass`).

   ```bash
   npm install formik yup sass
   ```

4. **Verify `package.json`**

   Ensure that `formik`, `yup`, and `sass` are listed under the `dependencies` section in your `package.json`:

   ```json
   "dependencies": {
     "formik": "^2.2.9",
     "yup": "^1.0.0",
     "sass": "^1.32.0",
     // ...other dependencies
   }
   ```

### Backend Setup (Spring Boot)

1. **Navigate to the Backend Directory**

   ```bash
   cd ../cinema-booking
   ```

2. **Install Backend Dependencies**

   Ensure you have all necessary dependencies specified in your `pom.xml`.

   **Using Maven Wrapper:**

   ```bash
   ./mvnw clean install
   ```

   **Or, if Maven is installed globally:**

   ```bash
   mvn clean install
   ```

3. **Configure Application Properties**

   Ensure that your `application.properties` is correctly configured for your environment (e.g., database settings, server port).

   **Example `application.properties`:**

   ```properties
   spring.application.name=cinema-booking
   spring.datasource.url=jdbc:postgresql://localhost:5432/ecinema_database
   spring.datasource.username=postgres
   spring.datasource.password=password
   spring.jpa.hibernate.ddl-auto=update
   spring.jpa.show-sql=true
   server.port=8081
   ```

### Setting Up the Database Locally

Setting up the PostgreSQL database locally is essential for the backend to function correctly. Follow the steps below to install, configure, and seed your database.

#### Install PostgreSQL

1. **Download and Install PostgreSQL**

   - Visit the [PostgreSQL Download Page](https://www.postgresql.org/download/) and download the appropriate installer for your operating system.

2. **Verify Installation**

   After installation, verify that PostgreSQL is running:

   ```bash
   psql --version
   ```

   This should display the installed PostgreSQL version.

#### Creating the Database

1. **Open Command Line and Navigate to the Project Directory**

   ```bash
   cd path/to/your/csci_4050
   ```

2. **Create the Database**

   Run the following command to create a new database named `movietheater`:

   ```bash
   psql -U postgres -f "database/create_database.sql"
   ```

   - **Username:** `postgres`
   - **Password:** *Enter the password you set during installation*

   **Note:** If `create_database.sql` is not in the `database/` directory, adjust the path accordingly.

#### Setting Up the Database Schema

1. **Set Up the Tables**

   Run the following command to set up the database tables:

   ```bash
   psql -U postgres -d movietheater -f "database/setup_movietheater.sql"
   ```

   - **Database:** `movietheater`
   - **Password:** *Enter the password you set during installation*

#### Seeding the Database

1. **Populate the Database with Initial Data**

   Run the following command to seed the database with initial data, including populating the `movies` table and adding an admin user:

   ```bash
   psql -U postgres -d movietheater -f "database/seed.sql"
   ```

#### Starting the Database Server

1. **Ensure Ports are Available**

   Make sure that **local ports 3000 and 3001** are free. These ports are typically used by the frontend and backend servers.

2. **Launch the Application and Database Server**

   - **Start the Frontend Application**

     Open a new terminal window, navigate to the frontend directory (`src/`), and run:

     ```bash
     npm start
     ```

3. **Verify the Setup**

   - The frontend application should be running on **[http://localhost:3000](http://localhost:3000)**.
   - The backend server should be running on **port 8081**.
   - Open the app in your browser and ensure it's communicating correctly with the backend.

#### Updating the Database

If you need to update the database structure or reseed the data, follow these steps:

1. **Navigate to the Project Directory**

   ```bash
   cd path/to/your/csci_4050
   ```

2. **Update Tables and Database Structure**

   Run the following command to apply updates to the database structure:

   ```bash
   psql -U postgres -d movietheater -f "database/setup_movietheater.sql"
   ```

   - **Password:** *Enter the password you set during installation*

3. **Reseed the Updated Database**

   Run the following command to reseed the database:

   ```bash
   psql -U postgres -d movietheater -f "database/seed.sql"
   ```

   - **Password:** *Enter the password you set during installation*

---

## Available Scripts

### Frontend Scripts

In the `src` directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point, you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However, we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### Backend Scripts

In the `cinema-booking` directory, you can run:

#### Using Maven

##### `mvn spring-boot:run`

Runs the Spring Boot application.

##### `mvn clean install`

Cleans and builds the project.

---

## Running the Application

### Running the Backend

1. **Navigate to the Backend Directory**

   ```bash
   cd cinema-booking
   ```

2. **Start the Spring Boot Application**

   **Using Maven:**

   ```bash
   mvn spring-boot:run
   ```

   **Or, using the Maven Wrapper:**

   ```bash
   ./mvnw spring-boot:run
   ```

   The backend server should start on the configured port (`8081`). Ensure that this port matches the API endpoints used in your frontend application.

### Running the Frontend

1. **Navigate to the Frontend Directory**

   ```bash
   cd ../src
   ```

2. **Start the React Application**

   ```bash
   npm start
   ```

   Open [http://localhost:3000](http://localhost:3000) to view it in your browser. The frontend should communicate with the backend running on `http://localhost:8081` (or your configured backend port).

---

## Additional Tips

### 1. **Environment Variables**

Ensure that both frontend and backend applications have the necessary environment variables configured. For example, API endpoints, database URLs, and secret keys should be stored securely, often in `application.properties` files.

### 2. **CORS Configuration**

When running frontend and backend on different ports (e.g., `3000` and `8081` for this current setup), ensure that your Spring Boot backend is configured to handle Cross-Origin Resource Sharing (CORS).

### 3. **Database Setup**

If your Spring Boot application interacts with a database, ensure that the database is set up and running. Update your `application.properties` with the correct database connection details.

**Example `application.properties`:**

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/movietheater
spring.datasource.username=postgres
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```
