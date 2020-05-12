
let h1Header=document.querySelector(".headerh1");
let h1one=document.querySelector(".h1one");
let h1two=document.querySelector(".h1two");


h1one.style.display='none'
h1two.style.display='none'


var h1Text=h1Header.textContent;
h1Header.innerHTML=""
var html=""
var counter=0;
let goal=`Speed Typing Game`
let wrongCounter=0;
let keepTyping=true;
let messageRef=""


function printHeader(){
    //end condition
    if(h1Header.innerHTML == "Speed Typing Game"){
        console.log("fx done")
        return;
    }

    
    var spanEl=document.createElement("span");
    spanEl.className=`headerSpan headerSpan${counter}`
    spanEl.innerText=h1Text[counter];
    messageRef+=h1Text[counter]
    h1Header.appendChild(spanEl);
    
    if(goal.split("").indexOf(h1Text[counter]) == -1){
        console.log("wrong-letter!")
        wrongCounter++
    }

    if(wrongCounter === 5){
        keepTyping=false;
        cleanUp()
    }
  
    counter++

    if(keepTyping){
    setTimeout(printHeader,200);
    }
 


}

printHeader()


function cleanUp(){
    messageRef=messageRef.split("")
    let localCounter=0;
    for(let i=counter;i>9;i--){
        localCounter++
        setTimeout(()=>{
          
          
            messageRef.pop()
       
      
         h1Header.innerHTML=""
         h1Header.innerHTML=messageRef.join("")
         console.log(localCounter)
        },100*i)

    }

    if(localCounter === 5){
        console.log("WTF?")
        setTimeout(()=>{
               finishPrinting()
        },1000)
       }
}


function finishPrinting(){
    console.log('finishPrinting Fired')
    for(let i=9;i<goal.length;i++){
        setTimeout(()=>{
        var spanEl=document.createElement("span");
        spanEl.className=`headerSpan headerSpan${i}`
        spanEl.innerText=goal[i];
        goal+=h1Text[i]
        h1Header.appendChild(spanEl);
        },i*50)
    }
    if(h1Header.innerHTML= goal){
    h1one.style.display='flex'
    h1two.style.display='flex'    
    }
}



/*GamePlay */
let currentwordDOM=document.querySelector("#currentword")
let scoreDOM=document.querySelector("#score")
let timerDOM=document.querySelector("#timer")
let gamecard=document.querySelector(".gamecard");
let startBtn=document.querySelector(".start-button");
let playerInput=document.querySelector(".playerinput");
let celebrateDOm=document.querySelector(".celebrate")
let celebrateArray=[ "👍", "😃"]

gamecard.style.display='none'

let score=0;
let timer=15;
let words=[];
let wordIdx=0;
let targetWordRef=""
let playerGuess=""
let wordcount=0;


function fetchWord(){
    fetch(`https://random-word-api.herokuapp.com/word?number=150`)
    .then(res=>res.json())
    .then(res=>{
         console.log(res)
        words=res
        // currentwordDOM.innerHTML=words[wordIdx]
        printWord()
    })
}


fetchWord()


function printWord(){
        currentwordDOM.innerHTML= words[wordIdx]
}


startBtn.onclick=startGame;

function startGame(){
    wordcount=0;
    runTimer()
    printWord();

    gamecard.style.display='flex'
    startBtn.style.display='none'
    scoreDOM.innerHTML=score;
}


document.onkeydown=(e)=>playerType(e);


function playerType(e){
    console.log(e.key)
    if(e.key === "Backspace"){
        playerGuess=playerGuess.split("");
        playerGuess.pop();
        playerGuess=playerGuess.join("");
        playerInput.innerHTML=playerGuess
        timer-=2;
    }
    if(e.keyCode >= 65 && e.keyCode <= 90){
    let key=e.key;
     playerGuess += key

    console.log(playerGuess);
    playerInput.innerHTML=playerGuess
    checkWord(playerGuess)
    }
}


function checkWord(word){
    if(word === words[wordIdx]){
        console.log("Correct!");
        wordIdx++
        printWord();
        playerInput.innerHTML=""
        score+=100;
        scoreDOM.innerHTML=score;
        playerGuess=""
        timer+=4
        wordcount++
        celebrateDOm.innerHTML=celebrateArray[Math.random() * 2 |0]
        
        setTimeout(()=>{
            celebrateDOm.innerHTML=""
        },1000)
    }
}


function runTimer(){
    if(timer <= 0){
        alert(`Game Over! \n
               Score:${score} \n
               WordsTyped:${wordcount} \n
               `)
               return;
    }
    timerDOM.innerHTML=timer;
    timer--;

    setTimeout(runTimer,1000);
}





