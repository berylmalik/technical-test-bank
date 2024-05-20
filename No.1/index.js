const express = require("express");
const app = express();

const PORT = 3000;

// ---->> input = NEGIE1
app.get("/reverse/:input", (req, res) => {
    const input = req.params.input;
    const reversed = reverseString(input);
    res.send(reversed);
});

function reverseString(str) {
    const letters = str.slice(0, -1);
    const number = str.slice(-1);
    const reversedLetters = letters.split("").reverse().join("");
    return reversedLetters + number;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
