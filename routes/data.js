var express = require('express');
var router = express.Router();
const db=require('../db.js');
const accountSid = 'ACbf9a9239ab35f92a93d7d3177c2efbc5';
const authToken = '1ae1dde91a28651f1501deaaec0f26f0';
const client = require('twilio')(accountSid, authToken);





router.get('/report',function(req, res){
    const result=res;
    const query='SELECT *\n' +
        'FROM users\n' +
        'WHERE id not in (Select user_id FROM hours where\n' +
        'date_part(\'week\',date) =date_part(\'week\',current_date));'
    const db_result=db.query(query, [], (err,res)=>{
        console.log(res.rows);
        result.status(200).send(res.rows);
    });
});

router.post('/report/send',function(req, res){
    const result=res;
    const query='SELECT *\n' +
        'FROM users\n' +
        'WHERE id not in (Select user_id FROM hours where\n' +
        'date_part(\'week\',date) =date_part(\'week\',current_date));';
        req.body.messages=JSON.parse(req.body.messages);
        console.log("messages",req.body.messages);
        let numbers=[];

        req.body.messages.forEach(function(entry){
            const phone_number='+1'+entry.phone;
            const body="Dear "+entry.first_name+", This is a reminder to complete your office hours before the end of the week!" +
                "\n Sincerly, \n Your Friendly Chief of Staff";
            numbers.push({number:phone_number, message:body});
        });
        console.log(numbers);

        sendMessage(numbers);
        console.log('complete');
        result.status(200).send({status:"complete"});
});

router.post('/sms', (req, res) => {
    const twiml = new MessagingResponse();

    twiml.message('The Robots are coming! Head for the hills!');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
});

function sendMessage(lom){
    if(lom[0] != null){
        client.messages
            .create({
                body: lom[0].message,
                from: '+18124870394',
                to: lom[0].number
            })
            .then(sendMessage(lom.slice(1)))
            .done();
    }
    console.log("Function completed");
    return;
}



module.exports = router;