const EmailQueries = {

    QUERY_INSERT_EMAIL :

    `INSERT INTO
    Emails (Email)
    VALUES (?);`,

    QUERT_SELECT_EMAIL_BY_ID :
    `SELECT * 
    FROM Emails
    WHERE UserID = ?;`

}

export {
    EmailQueries
}