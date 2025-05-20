const md5 = require("md5");
const {CheckLogin} = require("./Users_mid");
const {router} = require("express/lib/application");
async function userNameDB(req, res, next){
    let userName = (req.body.userName !== undefined)  ?addSlashes(req.body.userName): "";
    let password = (req.body.password !== undefined) ? md5(req.body.password): "";
    // req.loginSuccess = rows.length > 0;
    req.GoodOne = true;
    let Query =`SELECT * FROM users  WHERE userName = '${userName}' AND password = '${password}'`;
    const promisePool = db_pool.promise();
    let rows=[];
    req.one_user_data=[];
    try {
        [rows] = await promisePool.query(Query);
        if(rows.length > 0){ req.courses_data = rows[0]; }
    } catch (err) { console.log(err);}
    next();
}

module.exports = { userNameDB }