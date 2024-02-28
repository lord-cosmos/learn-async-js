const array2D = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

function sum2DArray(arr) {
  return new Promise((resolve, reject) => {
    console.log("Sum called ... ");
    if (Array.isArray(arr)) {
      setTimeout(() => {
        const rowSumPromises = arr.map(
          (row) =>
            new Promise((rowResolve, rowReject) => {
              let sum = 0;
              for (let j = 0; j < row.length; j++) {
                sum += row[j];
              }
              rowResolve(sum);
            })
        );

        Promise.all(rowSumPromises)
          .then((rowSums) => {
            const totalSum = rowSums.reduce((acc, curr) => acc + curr, 0);
            console.log("resolving ... ");
            resolve(totalSum);
          })
          .catch((error) => {
            reject(error);
          });
      }, 0);
    } else {
      console.log("rejecting ... ");
      reject("BAD INPUT: Expected array as input");
    }
    console.log("returning from sum");
  });
}

sum2DArray(array2D)
  .then((result) => {
    console.log(result); // Output: 45
  })
  .catch((error) => {
    console.error(error);
  });
