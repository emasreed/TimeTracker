const db=require('../db.js');
const express = require('express');
const router = express.Router();


/* GET committees */
router.get('/', function(req, res, next) {
    const result=res;
    const db_result=db.query("SELECT * FROM committee;", [], (err,res)=>{
        result.status(200).send(res.rows);
    });
});

/* GET committee by name */
router.get('/name/:name', function(req, res, next) {
    const result=res;
    console.log(req.params.name);
    const db_result=db.query("SELECT * FROM committee WHERE name=$1;", [req.params.name], (err,res)=>{
        if(err){
            result.status(400).send(err);
        }
        result.status(200).send(res.rows);
    });
});

/*POST new Committee*/
router.post('/add', function(req, res, next){
    const result=res;
    console.log(req.body);
    let id=0;
    const id_query=db.query("SELECT MAX(id) FROM committee;",[],(err,res)=>{
        if(err){
            console.log(err);
            return;
        }
        id=res.rows[0].max;
        console.log(id);
        if(req.body.head==null){
            result.status(500).send("cannot have null husky_id");
        }else{
            let query='INSERT INTO committee(id, name, head)' +
                ' VALUES($1, $2, $3);';
            let values=[id+1,req.body.name, req.body.head];
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

/* POST update committee */
router.post('/update/:update', function(req, res, next) {
    const result=res;
    const quer="UPDATE committee SET "+req.params.update+"=$2 WHERE id=$1";
    const db_result=db.query(quer, [req.body.id,req.body.value], (err,res)=>{
        result.status(200).send("updated");
    });
});

/*POST delete committee */
router.post('/delete/:id/:date',function(req,res,next){
    const result=res;
    const quer="DELETE committee WHERE id=$1;";
    const db_result=db.query(quer, [req.params.id], (err,res)=>{
        result.status(200).send("deleted");
    })
});

module.exports = router;

