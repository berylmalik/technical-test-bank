const input = ["xc", "dz", "bbb", "dz"];
const query = ["bbb", "ac", "dz"];

// Function to count words
function countWords(input, query) {
    return query.map((word) => {
        return input.filter((item) => item === word).length;
    });
}

// Call the function and print the output
const output = countWords(input, query);
console.log(output);
