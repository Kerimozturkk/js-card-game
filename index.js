
let randomIndexs = [];
let randomIndexsSize = 16;

let bjkPlayers = [
    {name:"Atiba Hutchinson",img:"img/atiba_hutchinson.png"},
    {name:"Necip Uysal",img:"img/necip_uysal.png"},
    {name:"Gedson Fernandes",img:"img/gedson_fernandes.png"},
    {name:"Kevin N'koudou",img:"img/kevin_nkoudou.png"},
    {name:"Wout Weghorst",img:"img/wout_weghorst.png"},
    {name:"Talha Sonuc",img:"img/talha_sonuc.png"},
    {name:"Cenk Tosun",img:"img/cenk_tosun.png"},
    {name:"Valentine Rosier",img:"img/valentine_rosier.png"},
];

const body = document.querySelector("body");
const container = document.querySelector('.container');
const startBtn = document.querySelector('#startBtn');
const reloadBtn = document.querySelector('#reloadBtn');
const startTimer = document.querySelector('#startTimer');

let maxOpenedCards = [];

const wrongMoveCount = document.querySelector('#wrongMoveCount');
let fault = 0;

let filledArr = fillRandomArr();
let playersWithIndexs = IndexDealer(filledArr);

displayCard(playersWithIndexs);

cardsArr = [...document.querySelectorAll('.playerBox')];



reloadBtn.addEventListener("click",function(){
    window.location.reload();
})

function cardsEvents (arr) { 
    // Eventi fonksiyona atayıp istediğim yerde çalışması için çağırıcam.
    arr.forEach(item => {
        if(!item.classList.contains("untouchable")){
            item.addEventListener("click",inDaEvent);
        }
    })
}

function inDaEvent() {
    maxOpenedCards.push(this); //item -> this
    cardClose3sec(this); //item -> this
}


// element.classList.add("close");
// element.classList.remove("open","untouchable");

function cardClose3sec(element) {
    if(maxOpenedCards.length == 2){
        element.classList.remove("close");
        element.classList.add("open");   
        isRight();

    }else{
        element.classList.remove("close");
        element.classList.add("open");   
    }

}

function isRight() {
    let card1 = maxOpenedCards[0];
    let card2 = maxOpenedCards[1];

    let card1Name = card1.firstElementChild.children[1].textContent;
    let card2Name = card2.firstElementChild.children[1].textContent;
    
    if((card1Name == card2Name) && (card1.id != card2.id)){
        maxOpenedCards.forEach(item => {
            item.classList.add("untouchable");
        });
        card1.removeEventListener("click",inDaEvent);
        card2.removeEventListener("click",inDaEvent);
        playerChecker(card1Name);
        maxOpenedCards = [];
        areYouWinningSon();
        
    }else{
        wrongCountIncreaser();
        setTimeout(function(){
            maxOpenedCards.forEach(item => {
                item.classList.remove("open");
                item.classList.add("close");
            });

            maxOpenedCards = [];
        },1000)

        if(wrongMoveCount.textContent == 5){
            body.innerHMTL = " ";
            restarter();
        }
        
    }
}

function playerChecker(playerName) {

    bjkPlayers.forEach(item => {
        if(item.name == playerName){
            item.status = "Done";
        }
    });

}

function areYouWinningSon(){
    let result = bjkPlayers.every(item => item.status == "Done");
    if(result){
        celebration();
    }
}

function celebration(){
    let p = document.createElement("p");
    p.style.width = "%20";
    p.style.fontSize = "30px";
    p.style.marginTop = "20px";
    p.style.color = "red";
    p.textContent = "Tebrikler Başardınız";

    let div1 = document.createElement("div");
    div1.classList.add("firework");
    let div2 = document.createElement("div");
    div2.classList.add("firework");
    let div3 = document.createElement("div");
    div3.classList.add("firework");

    body.firstElementChild.firstElementChild.append(p);
    body.append(div1);
    body.append(div2);
    body.append(div3);



    // body.innerHTML += fireworks;
    //body'nin innerHTML'ini değiştimek restartBtn eventini bozdu. body'nin innerHTML'li değişince eventlere bir şey oluyor mu??
    //Bu Global Scopa'taki event boşluğu gitti sanki neden ??

}


function restarter() {
    body.children[0].remove();
    let div = document.createElement("div");
    div.style.width = "40%";
    div.style.height = "500px";
    div.style.margin = "100px auto";
    div.style.textAlign = "center";

    let h3 = document.createElement("h3");
    h3.textContent = "Başaramadın tekrar denemek istermisin";

    let button = document.createElement("button");
    button.textContent = "Başlat";

    div.append(h3);
    div.append(button);
    body.append(div);

    button.addEventListener("click",function(){
        window.location.reload();
    })

}

function wrongCountIncreaser(){
    fault++;
    wrongMoveCount.textContent = fault;
}


startBtn.addEventListener("click",function(){
    allCardSwitcher();
    startBtn.setAttribute("disabled","true");
    timerStart(5);
})


function timerStart (second) {
    if(second != 0){
        setTimeout(function(){
            second--;
            startTimer.textContent = second;
            return timerStart(second);
        },1000)
    }else{
        startTimer.textContent = "İyi Şanslar";
        allCardSwitcher();
        cardsArr.forEach(item => {
            item.classList.remove("untouchable");
         });

        cardsEvents(cardsArr);
    }
}

function allCardSwitcher () {
    cardsArr.forEach(item => {
        item.classList.toggle("close");
    })
}

function displayCard(players){
    for(let i = 0; i < players.length * 2; i++){
        players.forEach(player => {
            player.indexs.forEach(index => {
                if(index == i){
                    container.innerHTML += cardCreator(i,player.img,player.name);
                }
            })
        })
    }
}

function IndexDealer(array){
    for(let i = 0, j = 0; i < array.length, j < bjkPlayers.length; i += 2, j++){
        bjkPlayers[j].indexs = array.slice(i,i+2);
    }
    return bjkPlayers;
}

function fillRandomArr() {
    let number;
    for(let i = 0; i < randomIndexsSize; i++){
        do{
    
            number = Math.floor(Math.random() * randomIndexsSize);
            
        }while(randomChecker(number))
        randomIndexs.push(number);
    }
    return randomIndexs;
}


function cardCreator(id,src,name) {
    const card = `
            <div class="playerBox close untouchable" id="${id}">
                <div class="info">
                    <img src="${src}">
                    <h3>${name}</h3>
                </div>
            </div>
    `;
    return card;
}

function randomChecker(number){
    if(randomIndexs.length == 0){
        return false;
    }else if(randomIndexs.includes(number)){
        return true;
    }else{
        return false;
    }
}






