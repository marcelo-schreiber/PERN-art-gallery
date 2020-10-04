# T1Gart | The gallery app

A simple website hosted in http://t1gart.herokuapp.com/ made with the PERN stack (PostgreSQL, Express, React, NodeJs).

And a rest API in http://t1gart.herokuapp.com/gallery

## How to run on your machine

- Make sure to download <a href="https://nodejs.org/en/" target="_blank">Nodejs</a> and <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>

- Create a database in your postgreSQL terminal and
  a .env file in the root directory with the content

<p>PG_USER=your_user</p>
<p>PG_PASSWORD=password</p>
<p>PG_HOST=host</p>
<p>PG_PORT=port</p>
<p>PG_DATABASE=name_of_database</p>

- Install all dependencies using:

### `npm install`

- now, in root folder run:

### `node index`

- and in the Frontend directory use:

### `npm start`

### Your machine should be hosting an example in your localhost in port 3000 and a restAPI in port 8080.
