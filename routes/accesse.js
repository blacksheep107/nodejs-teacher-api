var express = require('express');
var router = express.Router();
var axios = require('axios');
var common = require('../common/common.json');
/* GET users listing. */
router.get('/', function(req, res, next) {
    axios.get(`${common.URL}/cgi-bin/token`,{
        params: {
            grant_type:'client_credential',
            appid: common.APPID,
            secret: common.APPSECRET
        }
    }).then(response=>{
        console.log(response.data)
        res.send(response.data);
    }).catch(err=>{
        res.send(err)
    })
});

module.exports = router;
