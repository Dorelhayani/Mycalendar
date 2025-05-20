const express = require('express');
const router = express.Router()
module.exports = router;
const Login_MID = require("../middleware/Login_mid");
const users_MID = require("../middleware/Users_mid");
const {CheckLogin} = require("../middleware/Users_mid");
const {userNameDB} = require("../middleware/Login_mid");
const md5 = require("md5");
router.get("/", (req,res)=>{ res.render("login",{ data: {} }); });

router.post("/Login",[Login_MID.userNameDB],(req,res)=>{
    if(req.GoodOne){
        res.render("usrs_list",{ page_title:"Users List", users : req.users_data, });
    }
    else res.redirect("/");
});


// router.get("/Login",[users_MID.CheckLogin],(req,res)=>{
//     if(req.GoodOne){
//         res.render("usrs_list",{ page_title:"Users List", users : req.users_data, });
//     }
//     else res.redirect("/");
// });
