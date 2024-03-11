import * as sqlite from "expo-sqlite";

export const db = sqlite.openDatabase("database.sqlite");

export const executeTransaction =(
    sql: string,
    values? : (string | number | null)[]
) => {
    return new Promise<sqlite.SQLResultSet>((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                sql, 
                values,
                (_, resultSet) => {
                    resolve(resultSet);
                },
                (_, error) => {
                    reject(error);
                    return true;
                }
            );
        });
    });
}