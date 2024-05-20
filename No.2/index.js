const express = require("express");
const app = express();

const PORT = 3000;

//sentence: laki-laki perlu bertanggungjawab terhadap hidupnya
app.get("/longest-word/:sentence", (req, res) => {
    const sentence = req.params.sentence;
    const longestWord = findLongestWord(sentence);
    res.send(longestWord);
});

function findLongestWord(sentence) {
    const words = sentence.split(" ");
    let longestWord = "";

    for (const word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return longestWord;
}

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
