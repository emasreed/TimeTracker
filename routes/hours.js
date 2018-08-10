const db=require('../db.js');
const express = require('express');
const router = express.Router();


/* GET hours */
router.get('/', function(req, res, next) {
    const result=res;
    const db_result=db.query("SELECT * FROM hours;", [], (err,res)=>{
        result.status(200).send(res.rows);
    });
});


/* POST new hours entry */
router.post('/add', function(req, res, next) {
    const result=res;
    console.log(req.body);
    console.log(req.body.user_id);
    const quer="INSERT INTO hours(user_id, date, action_type, committee) VALUES($1, $2, $3, $4);";
    const db_result=db.query(quer, [req.body.user_id, req.body.date, req.body.description, req.body.committee], (err,res)=>{
        result.status(200).send(res);
    });
});

/* POST update hours */
router.post('/update/:update', function(req, res, next) {
    const result=res;
    const quer="UPDATE hours SET "+req.params.update+"=$2 WHERE user_id=$1 AND date=$3";
    const db_result=db.query(quer, [req.body.id,req.body.value,req.body.date], (err,res)=>{
        result.status(200).send("updated");
    });
});

/*POST delete hours */
router.post('/delete/:id/:date',function(req,res,next){
    const result=res;
    const quer="DELETE hours WHERE user_id=$1 AND date=$2;";
    const db_result=db.query(quer, [req.params.id,req.body.date], (err,res)=>{
        result.status(200).send("deleted");
    })
});

module.exports = router;

