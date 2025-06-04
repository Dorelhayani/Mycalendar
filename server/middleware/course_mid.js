// Create
// =====================================================================================================================
async function AddCourse(req, res, next){
    let name = addSlashes(req.body.name);
    let Query =`INSERT INTO course ( name) VALUES ('${name}')` ;

    const promisePool = db_pool.promise();

    let rows = [];
    try{ [rows] = await promisePool.query(Query);}
    catch (err){ console.log(err) }
    next();
}
// =====================================================================================================================


// Update
// =====================================================================================================================
async function UpdateCourse(req, res, next){
    let id = parseInt(req.params.id);
    if(id <= 0) {
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;
    let name = addSlashes(req.body.name);
    let Query = `UPDATE course SET name='${name}' WHERE id='${id}'`;
    const promisePool = db_pool.promise();
    let rows=[];
    try { [rows] = await promisePool.query(Query);}
    catch (err) { console.log(err);}
    next();
}

// =====================================================================================================================


// Read
// =====================================================================================================================

//  get all courses

// async function GetAllCourses(req,res,next){
//     let Query="SELECT * FROM course";
//     const promisePool = db_pool.promise();
//     let rows=[];
//     req.courses_data=[];
//     try {
//         [rows] = await promisePool.query(Query);
//         req.courses_data=rows;
//     } catch (err) { console.log(err);}
//     next();
// }

// option to skip forward & backward pages
async function GetAllCourses(req,res,next){
    let page=0;
    let rowPerPage=2;
    if(req.query.p !== undefined){
        page=parseInt(req.query.p);
    }
    req.page = page;

    let rows=[];
    //--- count pages---
    let Query = "SELECT COUNT(id) AS cnt FROM course";
    const promisePool = db_pool.promise();
    let total_rows=0;
    try {
        [rows] = await promisePool.query(Query);
        total_rows=rows[0].cnt;
    } catch (err) {
        console.log(err);
    }
    req.total_pages = Math.floor(total_rows/rowPerPage);
    //--- get current page ---
    Query="SELECT * FROM course";
    Query += ` LIMIT ${page*rowPerPage},${rowPerPage} `;
    req.courses_data=[];
    try {
        [rows] = await promisePool.query(Query);
        req.courses_data=rows;
    } catch (err) {
        console.log(err);
    }

    next();
}

// get course per student

// async function GetAllCourses(req,res,next){
//     let filter = (req.query.filter !== undefined) ? req.query.filter : "";
//     let Query="SELECT * FROM course";
//     let wh="";
//     if(filter !== ""){
//         wh += (wh === "")?" WHERE " : " AND ";
//         wh += ` ( name LIKE '%${filter}%' )`;
//     }
//     if(req.id !== undefined){
//         wh += (wh === "")?" WHERE " : " AND ";
//         wh += ` ( id IN (SELECT id FROM course WHERE id=${req.id}) )`;
//     }
//     Query += wh;
//     Query+= " LIMIT 0,100 ";
//
//     const promisePool = db_pool.promise();
//     let rows=[];
//     req.courses_data=[];
//     try {
//         [rows] = await promisePool.query(Query);
//         req.courses_data=rows;
//     } catch (err) {
//         console.log(err);
//     }
//
//     next();
// }
// =====================================================================================================================


// Get One Course
// =====================================================================================================================
async function GetOneCourse(req,res,next){
    let id = parseInt(req.params.id);
    if(id === NaN ||(id <= 0) ){
        req.GoodOne = false;
        return next();
    }
    req.GoodOne = true;

    let Query =`SELECT * FROM course WHERE id = '${id}' `;
    const promisePool = db_pool.promise();
    let rows=[];
    req.one_course_data=[];
    try {
        [rows] = await promisePool.query(Query);
        if(rows.length > 0){ req.courses_data = rows[0]; }
    } catch (err) { console.log(err);}
    next();
}
// =====================================================================================================================


// Delete
// =====================================================================================================================
async function DeleteCourse(req,res,next){
let id = parseInt(req.body.id);
if(id > 0) {
    let Query =`DELETE FROM course  WHERE id = '${id}' `;
    const promisePool = db_pool.promise();
    let rows = [];
    try{ [rows] = await promisePool.query(Query); }
    catch (err){ console.log(err) }
}
    next();
}
// =====================================================================================================================

module.exports = { AddCourse,UpdateCourse,GetAllCourses,DeleteCourse,GetOneCourse }