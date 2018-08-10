const db=require('../db.js');
const express = require('express');
const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
    const result=res;
    const db_result=db.query("SELECT * FROM users;", [], (err,res)=>{
        result.status(200).send(res.rows);
    });
});



/* GET users by husky_id */
router.get('/id/:id', function(req, res, next) {
    const result=res;
    console.log(req.params.id);
    const db_result=db.query("SELECT * FROM users WHERE id=$1;", [req.params.id], (err,res)=>{
        result.status(200).send(res.rows);
    });
});

/* GET users by husky_id */
router.get('/hid/:id', function(req, res, next) {
    const result=res;
    console.log(req.params.id);
    const db_result=db.query("SELECT * FROM users WHERE husky_id=$1;", [req.params.id], (err,res)=>{
        result.status(200).send(res.rows);
    });
});

router.post('/new/active', function(req, res, next){
    const result=res;
    console.log(req.body);
    let id=0;
    const id_query=db.query("SELECT MAX(id) FROM users;",[],(err,res)=>{
        id=res.rows[0].max;
        console.log(id);
        if(req.body.husky==null){
            result.status(500).send("cannot have null husky_id");
        }else{
            let query='INSERT INTO users(id, husky_id, first_name, last_name, phone)' +
                ' VALUES($1, $2, $3, $4, $5);';
            let values=[id+1,req.body.husky, req.body.first, req.body.last, req.body.phone];
            const add_query=db.query(query,values, (err,res)=>{
                if(err){
                    console.log(err.stack);
                    result.status(500).send("error adding info to database");
                }else{
                    result.status(200).send('successfully added to database');
                }
            })

        }


    });
});


router.post('/update/:update',function(req, res, next){
        const result=res;
       let query="UPDATE users SET "+req.params.update+"=$2 WHERE \"id\"=$1;";
       let values=[req.body.id, req.body.value];
       db.query(query,values,(err,res)=>{
           if(err){
               console.log(err.stack);
               result.status(500).send("error updating database");
           }else{
               result.status(200).send('database successfully updated');
           }
       })
});





module.exports = router;
