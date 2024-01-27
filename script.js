// selecting all requried element
const selectPlayMode = document.querySelector(".select-player"),
singlePlayMode =  selectPlayMode.querySelector(".single"),
doublePlayMode =  selectPlayMode.querySelector(".double"),
selectBox = document.querySelector(".select-box"),
selectXBtn =  selectBox.querySelector(".player-x"),
selectOBtn =  selectBox.querySelector(".player-o"),
playSection =  document.querySelector(".play-section"),
allBox =  document.querySelectorAll("section span"),
players =  document.querySelector(".players"),
resultBox =  document.querySelector(".result-box"),
wonText =  resultBox.querySelector(".won-text"),
playAgain =  resultBox.querySelector(".btn");

// once window loaded
window.onload = () =>{
    singlePlayMode.onclick =() =>{
        selectPlayMode.classList.add("hide");//hide the select-player section on single btn clickes
        selectBox.classList.add("show");//show the select-box on player-x btn clicked
        singleMode(); //class this function, single player play mode
    }
    doublePlayMode.onclick = () =>{
        selectPlayMode.classList.add("hide");//hide the select-player section on double btn clickes
        selectBox.classList.add("show");//show the select-box on player-x btn clicked
        doubleMode();//call this function, double player play mode
    }
    
}
function doubleMode(){
    for (let i = 0; i < allBox.length; i++) { //add onclick attribute in all avialable section's span
        allBox[i].setAttribute("onclick","clickedBox1(this)");
    }
    selectXBtn.onclick = () =>{
        selectBox.classList.remove("show"); // hide the select-box on player-x btn clicked
        playSection.classList.add("show"); //show the play-section on player-x btn clicked
    }
    selectOBtn.onclick = () =>{
        selectBox.classList.remove("show"); // hide the select-box on player-o btn clicked
        playSection.classList.add("show"); //show the play-section on player-o btn clicked
        players.setAttribute("class","players active player"); //adding three class names in player element  
    }
}
function singleMode(){
    for (let i = 0; i < allBox.length; i++) { //add onclick attribute in all avialable section's span
        allBox[i].setAttribute("onclick","clickedBox(this)");
    }
    selectXBtn.onclick = () =>{
        selectBox.classList.remove("show"); // hide the select-box on player-x btn clicked
        playSection.classList.add("show"); //show the play-section on player-x btn clicked
    }
    selectOBtn.onclick = () =>{
        selectBox.classList.remove("show"); // hide the select-box on player-o btn clicked
        playSection.classList.add("show"); //show the play-section on player-o btn clicked
        players.setAttribute("class","players active player"); //adding three class names in player element  
    }
}
let playerXIcon = "fa-solid fa-xmark"; //class name of fontawesome cross icon
let playerOIcon = "fa-regular fa-circle"; //class name of fontawesome circle icon
let playerSign = "X"; //Suppose player will be X
let runBot = true; 

// user click function
function clickedBox(element){
    // console.log(element);
    if(players.classList.contains("player")){ //if players element has contains .player
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
        players.classList.add("active");
        // if player select O then we'll change the playerSign value is O
        playerSign = "O"; //Suppose player will be O
        element.setAttribute("id",playerSign);
    }
    else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
        players.classList.add("active");
        element.setAttribute("id",playerSign);
    }
    selectWinner(); // call winner function
    playSection.style.pointerEvents = "none"; //once user select the user can't select any other box until clicked element
    element.style.pointerEvents = "none"; //once user any box then that box can't be selected agin
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed(); //generating random time delay so bot will delay randomly
    setTimeout(() =>{
        bot(runBot);  
    }, randomDelayTime);
}
function clickedBox1(element){
    // console.log(element);
    if(players.classList.contains("player")){ //if players element has contains .player
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //adding circle icon tag inside user clicked element
        players.classList.add("active");
        // if player select O then we'll change the playerSign value is O
        playerSign = "O"; //Suppose player will be O
        element.setAttribute("id",playerSign);
        players.setAttribute("class","players player1");
        players.classList.remove("player");
        element.style.pointerEvents = "none";
    }
    else{
        playerSign = "X";
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
        players.classList.add("active");
        element.setAttribute("id",playerSign);
        players.setAttribute("class","players active player");
        players.classList.remove("player1");
        element.style.pointerEvents = "none";
    }
    selectWinner(); // call winner function
}

 // bot click function
function bot(runBot){
   if(runBot){ //if runBot is true then run the following codes
     // first change the playerSign. so if user has X value in id then bot will have O
     playerSign ="O";
     let array = []; //creating empty array ,well store unselected box index in this array
     for (let i = 0; i < allBox.length; i++) {
         if(allBox[i].childElementCount == 0){ //if span has no any child element
             array.push(i); // inserting unclicked or unselected boxes inside array means that span has no children
            //  console.log(i+" "+"has no children");
         }
     }
     let randomBox = array[Math.floor(Math.random() * array.length)]; // getting rabdom index from array so bot will select random unselected box
     if(array.length > 0){
         if(players.classList.contains("player")){ //if players element has contains .player
             allBox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`; //adding cross icon tag inside user clicked element
             players.classList.remove("active");
             playerSign = "X";
             allBox[randomBox].setAttribute("id",playerSign);
         }
         else{
             allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //adding circlr icon tag inside user clicked element
             players.classList.remove("active");
             allBox[randomBox].setAttribute("id",playerSign);    
         }
     selectWinner(); // call winner function
     }
    allBox[randomBox].style.pointerEvents = "none"; // once bot click any box then user can't select or cliclk on the box
    playSection.style.pointerEvents = "auto";
    playerSign = "X"; // passing the X value
   }
}

// let work the select the winner
function getClass(idname){
    return document.querySelector(".box"+idname).id; // returning id name
}

function checkClass(val1, val2, val3, sign){
    if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
        return true;
    }
}
function selectWinner(){ // if one combination of them matched then select the winner
    if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) || checkClass(7,8,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign)){
        // console.log(playerSign+" "+"is a winner!");
        // once match won bby someone the stop the bot
        runBot = false;
        bot(runBot);

        // let show the result box with player sign
        setTimeout(() =>{ //we'll delay to show result box
            playSection.classList.remove("show");
            resultBox.classList.add("show");
        },200); //700 ms delay
        wonText.innerHTML = `Player <p>${playerSign}</p> won the game!`;
    }
    else{
        //if match has draw
        //first check all id ,if all span has id and no one won the game then we'll draw the game
        if(getClass(1) !="" && getClass(2) !="" && getClass(3) !="" && getClass(4) !="" && getClass(5) !="" && getClass(6) !="" && getClass(7) !="" && getClass(8) !="" && getClass(9) !=""){
            runBot = false;
            bot(runBot);
    
            // let show the result box with player sign
            setTimeout(() =>{ //we'll delay to show result box
                playSection.classList.remove("show");
                resultBox.classList.add("show");
            },700); //700 ms delay
            wonText.textContent = `Match has been drawn!`;
        }
    }
}

playAgain.onclick = () => {
    window.location.reload(); //reload the current page
}
