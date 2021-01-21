
 
async function createCards() {
    let myPromise = new Promise(function(myResolve, myReject) {   
        for (let i = 0; i < 10; i++) {
            // Array OF Alpha
            var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", 
            "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
            // Create Node
            var node = `
                        <div class="col-3">
                            <div class="card">
                            <div class="card-inner" data-chars="${alpha[i]}">
                                <div class="front"></div>
                                <div class="back">${alpha[i]}</div>
                            </div>
                            </div>
                        </div>
        
                        <div class="col-3">
                            <div class="card">
                            <div class="card-inner" data-chars="${alpha[i]}">
                                <div class="front"></div>
                                <div class="back">${alpha[i]}</div>
                            </div>
                            </div>
                        </div>
                      `  
            // Append Html Inside Cards Element          
            document.querySelector(".cards").insertAdjacentHTML('afterbegin',node)
        }
    });

}    
// fire the function when the page loaded
createCards();

// declare Variables
var success     = new Audio('music/success.wav');
var fail        = new Audio('music/fail.mp3');
var cards       = Array.from(document.querySelectorAll(".card .card-inner"))
var cardsCount  = cards.length
var triesCount  = 0
var tries       = document.querySelector(".tries span")
var finalResult = 0
var blocks      = []
var startButton = document.querySelector(".start-button")

startButton.onclick = function () {
    // Play Music When The Page Loaded
    var backMusic  =  new Audio('music/back-music.mp3');
    backMusic.loop = true
    backMusic.play()
    // Hide Start Menu
    document.querySelector(".start").style.display = "none"
    // Show Pronpet To Take Name
    var person = prompt("Please enter your name", "Harry Potter");
    if (person != null) {
        if (person.length > 15) {
            document.querySelector(".name span").innerHTML = person.slice(0, 12) + "..."            
        } else {
            document.querySelector(".name span").innerHTML = person        
        }
    }

}


cards.forEach(card => {
        card.onclick = function() {
            // Push Card Inside Block Array
            blocks.push(card)
            // Declare Var One That Block[0]
            var one = blocks[0].getAttribute("data-chars")
            if (blocks.length > 1) {
                var two = blocks[1].getAttribute("data-chars")
            }
            
            if (blocks.length < 3) {
                // Flip Card First
                card.classList.add("fliped")
                // Make Blocks Disable
                blocks[0].classList.add("no-clicked")
                
                if (blocks.length == 2) {
                    // Increament Tries and Put The Number Inside The Tries Span
                    triesCount++
                    tries.innerHTML = triesCount
                    
                    // Check If Blocks[0] === Blocks[1]
                    if (one === two) {
                        // Fire Success Sound
                        success.play();
                        // Increament finalResult
                        finalResult = finalResult +2
                        // Empty Array
                        blocks = []
                        } else {
                            setTimeout(() => {fail.play();}, 1500);
                            setTimeout(() => {
                                blocks[0].classList.remove("fliped")
                                blocks[1].classList.remove("fliped")
                                blocks[0].classList.remove("no-clicked")
                                blocks = []
                            }, 2000);
                        }  
                }
            }
            check()
        }  
})

function check() {
    if (cardsCount === finalResult) {
        cards.forEach(card => {
            card.classList.remove("fliped")
        })
        finalResult = 0
        tries.innerHTML = 0
        shuffleElements()
        startButton.innerHTML = "Play Again"
        document.querySelector(".start").style.background = "url(images/win.jpg)"
        document.querySelector(".start").style.display = "block"
        return "Good"
    } else {
        return "bad"
    }
}




// suffle cards and reorder them.

function shuffleElements() {
    var elements = document.querySelector(".cards");
    for (var i = elements.children.length; i >= 0; i--) {
        elements.appendChild(elements.children[Math.random() * i | 0]);
    }
}

shuffleElements()


