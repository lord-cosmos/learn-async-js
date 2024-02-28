const array2D = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, -9],
];

function logRowsWithNegativeNumbers(arr) {
  return new Promise((resolve, reject) => {
    console.log("Log called ... ");
    if (Array.isArray(arr)) {
      setTimeout(() => {
        const rowCheckPromises = arr.map(
          (row) =>
            new Promise((rowResolve, rowReject) => {
              for (let j = 0; j < row.length; j++) {
                if (row[j] < 0) {
                  rowResolve(row);
                  return; // Stop checking this row
                }
              }
              rowResolve(null); // Resolve with null if no negative numbers found in this row
            })
        );

        Promise.all(rowCheckPromises)
          .then((rows) => {
            const rowsWithNegatives = rows.filter((row) => row !== null);
            resolve(rowsWithNegatives);
          })
          .catch((error) => {
            reject(error);
          });
      }, 0);
    } else {
      console.log("rejecting ... ");
      reject("BAD INPUT: Expected array as input");
    }
    console.log("returning from log");
  });
}


logRowsWithNegativeNumbers(array2D)
  .then((rows) => {
    if (rows.length > 0) {
      console.log("Rows with negative numbers:");
      rows.forEach((row) => console.log(row));
    } else {
      console.log("No rows contain negative numbers.");
    }
  })
  .catch((error) => {
    console.error(error);
  });
