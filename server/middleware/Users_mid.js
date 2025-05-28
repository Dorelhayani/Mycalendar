var md5 = require('md5');

// is Logged Function
// =====================================================================================================================
async function isLogged(req, res, next){
    const jwtToken = req.cookies.ImLoggedToYoman;
    let user_id=-1;
    if (jwtToken !== "") {
        jwt.verify(jwtToken, 'myPrivateKey', async (err, decodedToken) => {
            console.log("decodedToken=",decodedToken);
            if (err) { console.log("err=",err); }
            else {
                let data = decodedToken.data;
                console.log("data=",data);
                user_id = data.split(",")[0];
            }
        })
    }
    if(user_id < 0) res.redirect("/login");
    next();
}
// =====================================================================================================================


// Check Login Function
// =====================================================================================================================
async function CheckLogin(req, res, next){
    let userName = (req.body.userName !== undefined) ? addSlashes(req.body.userName) : "";
    let password = (req.body.password !== undefined) ? req.body.password : "";
    let enc_pass = md5("A"+password);
    let Query = `SELECT * FROM users WHERE userName = '${userName}' AND password = '${enc_pass}'`;

    const promisePool = db_pool.promise();
    let rows=[];
    try { [rows] = await promisePool.query(Query); }
    catch (err) { console.log(err); }

    if(rows.length > 0){
        req.validUser = true;
        let val = `${rows[0].id},${rows[0].name}`;
        var token = jwt.sign(
            {data: val},
            'myPrivateKey',
            { expiresIn: 31*24*60*60 }); // in sec
        res.cookie("ImLoggedToYoman", token, { maxAge: 31*24*60*60 * 1000, }); } // 3hrs in ms
    console.log("Generated token:", token);
    console.log("Cookies in response:", res.getHeader("Set-Cookie"));
    next();
}
// =====================================================================================================================


// Create
// =====================================================================================================================
async function AddUser(req, res, next){
    let name = (req.body.name !== undefined) ? addSlashes(req.body.name): "";
    let userName = (req.body.userName !== undefined)  ?addSlashes(req.body.userName): "";
    let password = (req.body.password !== undefined) ? req.body.password: "";
    let enc_pass = md5("A"+password);
    let email = (req.body.email !== undefined) ? addSlashes(req.body.email): "";
    let typeID = (req.body.typeID !== undefined) ? Number(req.body.typeID): -1;
    let StudentID = (req.body.StudentID !== undefined) ? addSlashes(req.body.StudentID): "";

    let Query="INSERT INTO users";
    Query +="(`name`,`userName`,`password`,`email`,`typeID`,`StudentID`)";
    Query +="VALUES";
    Query +=`('${name}','${userName}','${enc_pass}','${email}','${typeID}','${StudentID}')`;

    const promisePool = db_pool.promise();
    let rows = [];
    try{ [rows] = await promisePool.query(Query); }
    catch (err){ console.log(err) }
    next();
}
// =====================================================================================================================


// Update
// =====================================================================================================================
async function UpdateUser(req, res, next){
    let id = parseInt(req.params.id);
    if(id <= 0) {
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;

    let name = (req.body.name !== undefined) ? addSlashes(req.body.name): "";
    let userName = (req.body.userName !== undefined)  ?addSlashes(req.body.userName): "";
    let email = (req.body.email !== undefined) ? addSlashes(req.body.email): "";
    let typeID = (req.body.typeID !== undefined) ? parseInt(req.body.typeID): -1;
    let StudentID = (req.body.StudentID !== undefined) ? addSlashes(req.body.StudentID): "";


    let Query =`UPDATE users SET `;
    Query +=`name   ='${name}' ,`;
    Query +=`userName  ='${userName}' ,`;
    Query +=`email  ='${email}' ,`;
    Query +=`typeID='${typeID}' ,`;
    Query +=`StudentID     ='${StudentID}'  `;
    Query +=` WHERE id='${id}'`;

    const promisePool = db_pool.promise();
    let rows=[];
    try { [rows] = await promisePool.query(Query); }
    catch (err) { console.log(err);}
    next();
}
// =====================================================================================================================


// Read - All Users
// =====================================================================================================================
async function GetAllUsers(req,res,next){
    let Query="SELECT * FROM users";
    const promisePool = db_pool.promise();
    let rows=[];
    req.users_data = [];
    try {
        [rows] = await promisePool.query(Query);
        req.users_data = rows;
    } catch (err) { console.log(err);}
    next();
}
// =====================================================================================================================


// Read - One User
// =====================================================================================================================
async function GetOneUser(req,res,next){
    let id = parseInt(req.params.id);
    if(id === NaN ||(id <= 0) ){
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;

    let Query =`SELECT * FROM users  WHERE id = '${id}' `;
    const promisePool = db_pool.promise();
    let rows=[];
    req.one_user_data=[];
    try {
        [rows] = await promisePool.query(Query);
        if(rows.length > 0){ req.courses_data = rows[0]; }
    } catch (err) { console.log(err);}
    next();
}
// =====================================================================================================================


// Delete
// =====================================================================================================================
async function DeleteUser(req,res,next){
    let id = parseInt(req.body.id);
    if(id > 0) {
        let Query =`DELETE FROM users  WHERE id = '${id}' `;
        const promisePool = db_pool.promise();
        let rows = [];
        try{ [rows] = await promisePool.query(Query); }
        catch (err){ console.log(err) }
    }
    next();
}
// =====================================================================================================================

module.exports = { AddUser,GetOneUser,GetAllUsers,UpdateUser,DeleteUser, CheckLogin, isLogged }