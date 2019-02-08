var express =  require("express");
var app = express();
var bodyParser = require("body-parser");

app.listen(process.env.PORT,process.env.IP,function(){
    console.log('Corva Compute has started');
});

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));


app.get("/compute/:request_id",function(req,res){
    res.render("homepage.ejs",{requestID:req.params.request_id});
})

app.post("/compute/:request_id", function(req,res){
    
    var requestID = req.params.request_id;
    var request = req.body.name.replace(/“/g,'"').replace(/”/g,'"');
    var parsedValue = JSON.parse(request);
    var timestamp = parsedValue.timestamp;
    var array1 = parsedValue.data[0].values;
    var array2 = parsedValue.data[1].values;
    var result = array1.map(function(item, index) {
        return item - array2[index];
     });
    var title = "Result"
    var final = {"request_id": requestID ,"timestamp": timestamp , "result": { "title": title, "values": result }};
    
    res.send(final);
    
})