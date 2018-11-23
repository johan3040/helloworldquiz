
let id = 0;

function init(){
   let button = document.querySelector("#startBtn");
   button.addEventListener("click",startGame);
   

}
function startGame(e){
    e.preventDefault();
    document.querySelector("#userForm").style.display= "block";
    document.querySelector('#startPage').style.display = 'none';
    document.querySelector("#hintBtn").style.display = 'none';
    fetchQuestion();
    let hint = document.querySelector("#hintBtn")
    hint.addEventListener("click",handleClick);
    let form = document.getElementById("userForm");
    form.addEventListener("submit", handleClick);
}
function handleClick(e){
    e.preventDefault();
   // console.log("hint")
    //document.getElementById("hintBtn").innerHTML = "hejsan här har du en hint"

    let form = document.getElementById("userForm");
    let formData = new FormData(form);
    let content = formData.get('answer');

    let answer = {
        answer: content,
        id: id
    }

    handleFetch(answer);
}

function fetchQuestion(url = '/question0'){
    fetch(url)
    .then(res=> res.json())
    .then(res=> {
        id = res.id;
        document.getElementById("question").innerHTML = res.question;
        if(id == 8)createGame();
    })
}

function handleFetch(answer){
    let options= {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(answer)
    }

    fetch("/answer" + id, options)
    .then(res => res.json())
    .then(res => {
        if(res.success){
            document.getElementById("userInput").value = "";

            if(res.nextURL){
                fetchQuestion(res.nextURL);
            }
            else{
                while(document.getElementById("game").hasChildNodes()){
                    document.getElementById("game").removeChild(document.getElementById("game").firstChild);
                }
                document.getElementById("question").innerHTML = "Grattis du klarade alla frågor!";
                document.querySelector("#userForm").style.display = "none";
                document.querySelector("#lastPage").style.display = "inline-block";
            } 

        }else{
            console.log("fel");
        }
    })
}

function createGame(){
    let container = document.createElement("div");
    let mouse = document.createElement("div");
    container.setAttribute("id", "gameField");
    mouse.setAttribute("id", "mouse");
    mouse.style.top = "50px";
    mouse.style.left = "50px";

    container.appendChild(mouse);
    document.getElementById("game").appendChild(container);

    let x;
    let y;
    container.addEventListener("mousemove", (e)=>{
        x = e.clientX;
        y = e.clientY;
        let mousePos = mouse.getBoundingClientRect();
        if((((x-mousePos.x)*(x-mousePos.x))+((y-mousePos.y)*(y-mousePos.y))) < (Math.pow(60, 2))){  
            mouse.style.left = x < 250 ? Math.floor(Math.random()*(420-250+1)+250) + "px" : Math.floor(Math.random()*(230-50+50)+50) + "px";
            mouse.style.top = y < 250 ? Math.floor(Math.random()*(420-260+1)+260) + "px" : Math.floor(Math.random()*(230-50+50)+50) + "px";
        }
    })

    mouse.addEventListener("mouseover", (e)=>{
        let elem = document.createElement("h4");
        elem.innerHTML = "mousetrap";
        document.getElementById("game").appendChild(elem);
    });
}



window.addEventListener("load", init);