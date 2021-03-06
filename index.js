const express = require('express');
const app = express();
const data = require('./data.json');
const PORT = process.env.PORT || 8000;

app.use(express.static(__dirname + '/public'));
app.use(express.json());


app.get('/', (req,res)=>{
    res.sendFile(__dirname + './public/index.html');
});

app.get('/question:id', (req, res)=>{
    let id = req.params.id;
    res.json({"question": data.questions[id].question, "id": data.questions[id].id, "images": data.questions[id].images});
});

app.post('/answer:id', (req,res)=>{
    let id = req.params.id;
    let answer = req.body.answer;
    if(data.questions[id].answer == answer){
        res.json({success: true, nextURL: data.questions[id].nextURL});
    }else{
        res.json({success: false});
    }
    
});

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})