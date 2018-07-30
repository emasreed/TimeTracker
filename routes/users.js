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

/* GET active users */
router.get('/active', function(req, res, next) {
    const result=res;
    const db_result=db.query("SELECT * FROM users WHERE active=TRUE;", [], (err,res)=>{
        result.status(200).send(res.rows);
    });
});


/* GET users by husky_id */
router.get('/id/:id', function(req, res, next) {
    const result=res;
    console.log(req.params.id);
    const db_result=db.query("SELECT * FROM users WHERE husky_id='"+req.params.id+"';", [], (err,res)=>{
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
            let query='INSERT INTO users(id,husky_id,pos,college,special_interest, first_name, last_name, active)' +
                ' VALUES($1, $2, $3, $4, $5, $6, $7, $8);';
            let values=[id+1,req.body.husky,req.body.pos,req.body.college, req.body.special, req.body.first, req.body.last, true];
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
       let query="UPDATE users SET $1=$3 WHERE \"id\"=$2;";
       let values=[req.params.update,req.body.id, req.body.value];
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
