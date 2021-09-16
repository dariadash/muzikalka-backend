import { createConnection, getConnection } from "typeorm";

createConnection({
    name: "default",
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "muzikalka",
    entities:[__dirname + '/entities/*.js']
})

export const getEntityManager = () => getConnection().createEntityManager()