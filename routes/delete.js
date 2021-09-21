var express = require('express');
var router = express.Router();
var axios = require('axios');
var common = require('../common/common.json');

router.post('/', function(req, res, next) {
    let data = req.body
    axios.post(`${common.URL}/tcb/databasedelete`,data,{
        params: {
            access_token: req.query.access_token
        },
    }).then(response=>{
        res.send(response.data);
    }).catch(err=>{
        res.send(err)
    })
});

module.exports = router;
