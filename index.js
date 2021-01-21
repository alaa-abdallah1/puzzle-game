
 
async function createCards() {
    let myPromise = new Promise(function(myResolve, myReject) {   
        for (let i = 0; i < 10; i++) {
        
            var alpha = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", 
            "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
        
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
            document.querySelector(".cards").insertAdjacentHTML('afterbegin',node)
        }
    });

}    




createCards();

 
  var success = new Audio('music/success.wav');
  var fail = new Audio('music/fail.mp3');




var cards = Array.from(document.querySelectorAll(".card .card-inner"))
var cardsCount = cards.length

var startButton = document.querySelector(".start-button")
startButton.onclick = function () {

    var backMusic  =  new Audio('music/back-music.mp3');
    backMusic.play()

    document.querySelector(".start").style.display = "none"

    var person = prompt("Please enter your name", "Harry Potter");
    if (person != null) {
        if (person.length > 15) {
            document.querySelector(".name span").innerHTML = person.slice(0, 12) + "..."            
        } else {
            document.querySelector(".name span").innerHTML = person        
        }
    }

}



var triesCount = 0

var tries = document.querySelector(".tries span")

var finalResult = 0

var blocks = []

cards.forEach(card => {

        card.onclick = function() {
            
            blocks.push(card)

            var one = blocks[0].getAttribute("data-chars")
            if (blocks.length > 1) {
                var two = blocks[1].getAttribute("data-chars")
            }
            
            if (blocks.length < 3) {

                card.classList.add("fliped")
                blocks[0].classList.add("no-clicked")
                

                if (blocks.length == 2) {
                    triesCount++
                    tries.innerHTML = triesCount


                    if (one === two) {
                        success.play();

                        finalResult = finalResult +2
                            
                            blocks = []

                        } else {
                            setTimeout(() => {
                                fail.play();
                                blocks[0].classList.remove("fliped")
                                blocks[1].classList.remove("fliped")
                                blocks[0].classList.remove("no-clicked")


                                blocks = []
                            }, 2000);
                        }  
                }
            }
            console.log(check())
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


