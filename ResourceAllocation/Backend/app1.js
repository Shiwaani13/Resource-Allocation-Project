var express = require('express'); 
http=require('http');
path=require('path');
var app = express(); 
var bodyParser= require('body-parser');
var mysql=require('mysql');
var multer=require('multer');
var xlstojson=require('xls-to-json');
var xlsxtojson=require('xlsx-to-json');

(async function(){
try{
    connection=await mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'employees'
    });
    console.log("Success");
}
catch(err)
{
    console.log("Error"+err);
}
})()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extendd:true}));
var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploader1/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
var upload = multer({ //multer settings
                storage: storage,
                fileFilter : function(req, file, callback) { //file filter
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('Wrong extension type'));
                    }
                    callback(null, true);
                }
            }).single('file');
            
            app.use(function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
                res.setHeader('Access-Control-Allow-Methods', 'POST');
                res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
                res.setHeader('Access-Control-Allow-Credentials', true);
                next();
                });


            /* API path that will upload the files */
app.post('/api/upload', function(req, res) {
    var exceltojson;
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
        /** Multer gives file info in req.file object */
        if(!req.file){
            res.json({error_code:1,err_desc:"No file passed"});
            return;
        }
        
        if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
            exceltojson = xlsxtojson;
        } else {
            exceltojson = xlstojson;
        }
        try {
            exceltojson({
                input: req.file.path,
                output: "filesave.json", 
                lowerCaseHeaders:true
                 
            },
            function(err,result){
                if(err) {
                    return res.json({error_code:1,err_desc:err, data: null});
                } 
                res.send("Uploaded!!");
                console.log("no error while conversion");
            });//

                const fs=require('fs')
                
                let jsonData=JSON.parse(fs.readFileSync('filesave.json','utf-8'));                
                console.log("Upload success!");
               
        var res_val=[],proj_val=[],status_val=[],skill_arr=[];
            
        for(var i=0;i<jsonData.length;i++)
            {

               res_val.push([jsonData[i].resource_id,jsonData[i].resource_name,jsonData[i].role]);
               status_val.push([jsonData[i].resource_id,jsonData[i].pid,jsonData[i].iu,jsonData[i].pay_class,jsonData[i].status]);
               proj_val.push([jsonData[i].resource_id,jsonData[i].client_name,jsonData[i].project_name,jsonData[i].current_DM]);
               var arr=jsonData[i].portfolio.split(",");
               for(var element in arr)
               {
                skill_arr.push([jsonData[i].resource_id,arr[element]]);

               }
            
            }
            
            connection.query("TRUNCATE project_details");
            connection.query(" TRUNCATE res_status");
            connection.query("TRUNCATE res_portfolio");
            connection.query("delete from resource_details where resource_name!='NULL'");
            console.log("Truncate success!");
          
            connection.query('INSERT INTO resource_details(resource_id,resource_name,role) VALUES ?', [res_val], function(err,result) {
                if(err) {
                   console.log(err);
                }
               else {
                  console.log("Uploaded into resouce_details!");
                 }
               });
               
               connection.query('INSERT INTO res_portfolio(resource_id,portfolio) VALUES ?', [skill_arr], function(err,result) {
                if(err) {
                   console.log(err);
                }
               else {
                  console.log("Uploaded into res_portfolio!");
                 }
               });

            connection.query('INSERT INTO res_status(res_id,pid,iu,pay_class,status_type) VALUES ?',[status_val],function(err,result){
                if(err) {
                    console.log(err);
                 }
                else {
                   console.log("Uploaded into res_status!");
                  }
                }); 

            connection.query('INSERT INTO project_details(resource_id,client_name,project_name,current_DM) VALUES ?', [proj_val], function(err,result) {
                if(err) {
                   throw(err);
                }
               else {
                  console.log("Uploaded into project_details!");
                }
              });
              
              //To extract data from database:

           
     } catch (e){
            res.json({error_code:1,err_desc:"Corupted excel file"}); //sends "" to web server
        }
    })
})

app.get('/api/search',function(req,res){
    let sql = "SELECT r.resource_id,r.resource_name,r.role,sk.portfolio,s.status_type,pr.project_name,pr.current_DM FROM resource_details r,res_status s,project_details pr,res_portfolio sk where r.resource_id=s.res_id and r.resource_id=pr.resource_id and r.resource_id=sk.resource_id";
connection.query(sql, (error, results, fields) => {
if (error) {
return console.error(error.message);
}
console.log("Sent to angular");
res.send(JSON.stringify({results}));
}); 
    

});

app.get('/api',function(req,res){
    res.end('file catcher example');
    //res.sendFile(__dirname + "/index.html");     //to send static file as response to http request
});
app.listen('3000', function(){          //listens to a connection
    console.log('running on 3000...');
});