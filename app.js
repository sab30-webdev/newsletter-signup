const express =require("express");
const bodyParser =require("body-parser");
const request=require("request")
const app =express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000,function(){
  console.log("port set to 3000");
})


app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
  var fname=req.body.fname;
  var lname=req.body.lname;
  var email=req.body.email;
  console.log(fname,lname,email);

  var data={
    members:[
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  }

  var jsonData=JSON.stringify(data);
  console.log(jsonData);

  var options={
    url:"https://us19.api.mailchimp.com/3.0/lists/1564fdac05",
    method:"POST",
    headers:{"Authorization":"sab1 e466ee625b057b296e558a329fe0fab2-us19"},
    body:jsonData
  }

  request(options,function(error,response,body){


    if (error){
      res.sendFile(__dirname+"/failure.html")
    } else {
      if (response.statusCode===200){
          res.sendFile(__dirname+"/success.html");
      } else {
          res.sendFile(__dirname+"/failure.html")
      }
    }
  })

  app.post("/failure",function(req,res){
    res.redirect("/");
  })

})


// e466ee625b057b296e558a329fe0fab2-us19

// 1564fdac05
