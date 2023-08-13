import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB
    }
});

export default async function executeQuery({ query, values }) {
    try {
        const results = db.query(query, values);
        await db.end();
        return results;
    } catch (err) {
        return { err };
    }
}