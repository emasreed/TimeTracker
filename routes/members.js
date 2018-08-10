const db=require('../db.js');
const express = require('express');
const router = express.Router();


/* GET active senators */
router.get('/senators', function(req, res, next) {
    const result=res;
    const db_result=db.query("SELECT * FROM senators WHERE active=TRUE;", [], (err,res)=>{
        result.status(200).send(res.rows);
    });
});


/* POST new Senator */
router.post('/senators/add', function(req, res, next) {
    const result=res;
    const quer="INSERT INTO senators(id, constituency, special, active) VALUES($1, $2, $3, TRUE);";
    const db_result=db.query(quer, [req.body.id,req.body.constituency, req.body.special, ], (err,res)=>{
        result.status(200).send(res.rows);
    });
});

/* POST update Senator */
router.post('/senators/update/:update', function(req, res, next) {
    const result=res;
    const quer="UPDATE senators SET "+req.params.update+"=$2 WHERE id=$1";
    const db_result=db.query(quer, [req.body.id,req.body.value], (err,res)=>{
        result.status(200).send(res.rows);
    });
});

/*POST deactivate Senator */
router.post('/senators/delete/:id',function(req,res,next){
    const result=res;
    const quer="UPDATE senators SET active=FALSE WHERE id=$1;"
    const db_result=db.query(quer, [req.params.id], (err,res)=>{
        result.status(200).send(res.rows);
    })
})

module.exports = router;

