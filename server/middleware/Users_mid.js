// Create
// =====================================================================================================================
async function AddUser(req, res, next){
    let name = addSlashes(req.body.name);
    let userName = addSlashes(req.body.userName);
    let password = addSlashes(req.body.password);
    let email = addSlashes(req.body.email);
    let typeID = parseInt(req.body.typeID);
    let StudentID = parseInt(req.body.StudentID);
    let Q=`INSERT INTO users (name,userName,password,email,typeID,StudentID) 
    VALUES ('${name}','${userName}','${password}','${email}','${typeID}','${StudentID}')` ;
    const promisePool = db_pool.promise();

    let rows = [];
    try{
        [rows] = await promisePool.query(Q);
    } catch (err){ console.log(err) }
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
    let name = addSlashes(req.body.name);
    let userName = req.body.userName;
    let password = req.body.password;
    let email = req.body.email;
    let typeID = parseInt(req.body.typeID);
    let StudentID = parseInt(req.body.StudentID);

    let Query = `UPDATE users SET name='${name}',userName = '${userName}', password = '${password}', email = '${email}', 
typeID = '${typeID}', StudentID = '${StudentID}' WHERE id='${id}'`;
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
    } catch (err) { console.log(err);}
    next();
}
// =====================================================================================================================


// Read
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

// Read
// =====================================================================================================================
async function GetOneUser(req,res,next){
    let id = parseInt(req.params.id);
    if(id === NaN ||(id <= 0) ){
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;

    let Q=`SELECT * FROM users  WHERE id = '${id}' `;
    const promisePool = db_pool.promise();
    let rows=[];
    req.one_user_data=[];
    try {
        [rows] = await promisePool.query(Q);
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
        try{
            [rows] = await promisePool.query(Query);
        } catch (err){ console.log(err) }
    }
    next();
}
// =====================================================================================================================

module.exports = {
    AddUser,GetOneUser,GetAllUsers,UpdateUser,DeleteUser
}