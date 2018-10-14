
let id = 0;

function init(){
    fetchQuestion();
    let form = document.getElementById("userForm");
    form.addEventListener("submit", handleClick);
}

function handleClick(e){
    e.preventDefault();

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
                document.getElementById("question").innerHTML = "Grattis du klarade alla frågor!";
            } 

        }else{
            console.log("fel");
        }
    })
}



window.addEventListener("load", init);