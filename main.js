// Initialize canvas
const canvas = document.getElementById("canvas");
canvas.width = 520;
canvas.height = 620;
const ctx = canvas.getContext("2d");
ctx.font = "50px Courier New";
ctx.textAlign = "center";

// Add events
window.onkeydown = addText;
//window.onresize = function(){canvas.width=window.innerWidth;canvas.height=window.innerHeight;drawBoxes()}

// Load words
const wordsFile = document.getElementById("words.txt");
const availableKeys = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
const words = ["tests", "words", "congo"];

// Load gradients
const GRADIENTS = {
    GREEN: ctx.createLinearGradient(0, 0, 0, canvas.height),
    YELLOW: ctx.createLinearGradient(0, 0, 0, canvas.height),
    RED: ctx.createLinearGradient(0, 0, 0, canvas.height),
}
GRADIENTS.GREEN.addColorStop(0, "forestgreen");
GRADIENTS.GREEN.addColorStop(1, "darkgreen");
GRADIENTS.YELLOW.addColorStop(0, "yellow");
GRADIENTS.YELLOW.addColorStop(1, "orange");
GRADIENTS.RED.addColorStop(0, "red");
GRADIENTS.RED.addColorStop(1, "darkred");

// Load variables
let keyWord = "congo";
let wordLength = 5;
let maxTries = 6;
let rows = [];
let word = "";


/*
Called when key is pressed
If backspace is pressed deletes a character
If enter is pressed checks word
Any other characters in available keys are added
 */
function addText(e) {
    switch (e.key) {
        case "Backspace":
            if (word.length > 0) {
                word = word.slice(0, word.length - 1)
                drawBox(word.length, rows.length);
            }
            return;
        case "Enter":
            const wordResults = checkWord(word);
            if (wordResults[0]) {
                for (let i = 0; i < wordLength; i++) {
                    let char = word.charAt(i);
                    let color = "#fff";
                    if (keyWord.indexOf(char) > -1) {
                        if (char === keyWord.charAt(i)) {
                            color = GRADIENTS.GREEN;
                        } else {
                            color = GRADIENTS.YELLOW;
                        }
                    } else {
                        color = GRADIENTS.RED;
                    }
                    drawBox(i, rows.length, word.charAt(i), color);
                }
                if (word === keyWord) {
                    alert("You guessed the word!");
                }
                rows.push(word);
                word = "";
            } else {
                alert(wordResults[1]);
            }
            return;
        default:
            if (availableKeys.indexOf(e.key) === -1) return;
            if (word.length < wordLength) {
                drawBox(word.length, rows.length, e.key);
                word += e.key;
            } else {
                alert("You cannot have more than "+wordLength+ " characters");
            }

    }
}

/*
Checks if word meets requirements
 */
function checkWord(w) {
    if (w.length !== wordLength) return [false, "Word is not "+wordLength+" characters long."];
    return [true];
    if (words.indexOf(w) === -1) return [false, "Word is unavailable."];
    return [true, "Good job."];
}

/*
Draw the background of the canvas
 */
function drawBackground() {
    const grad = ctx.createLinearGradient(canvas.width, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "blue");
    grad.addColorStop(1, "purple");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
drawBackground();

/*
Visual display of boxes on canvas
 */
function drawBox(xPos, yPos, letter, color) {
    const size = 80;
    const x = xPos * size + 20 * (xPos+1);
    const y = yPos * size + 20 * (yPos+1);
    ctx.fillStyle = "#000000";
    ctx.fillRect(x, y, size, size);
    ctx.fillStyle = color || "#FFFFFF";
    ctx.fillRect(x+.05*size, y+.05*size, 0.9*size, 0.9*size);
    if (letter) {
        ctx.fillStyle = "#000000";
        ctx.fillText(letter.toUpperCase(), x+size/2, y+size*.7);
    }
}

/*
Initializes screen
 */
function drawBoxes() {
    drawBackground();
    for (let x = 0; x < 5; x++) {
        for (let y = 0; y < 6; y++) {
            drawBox(x, y);
        }
    }
}
drawBoxes();