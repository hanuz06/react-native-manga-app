import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase("favorites.db");

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "CREATE TABLE IF NOT EXISTS favorites (id INTEGER PRIMARY KEY NOT NULL, bookId NUMBER , chapterId NUMBER);",
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const insertFavorites = (bookId, chapterId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO favorites (bookId, chapterId) VALUES (?,?);`,
        [bookId, chapterId],
        (_, res) => {
          resolve(res);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const fetchFavorites = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `SELECT * FROM favorites`,
        [],
        (_, res) => {
          resolve(res);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const removeFavoriteBook = (bookId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM favorites WHERE bookId=?",
        [bookId],
        (_, res) => {
          resolve(res);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};

export const removeFavoriteChapter = (chapterId) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM favorites WHERE chapterId=?",
        [chapterId],
        (_, res) => {
          resolve(res);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};
