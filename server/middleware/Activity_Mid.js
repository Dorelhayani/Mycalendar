// Create
// =====================================================================================================================
async function AddActivity(req, res, next){
    let userID = req.user_id;
    let Course_id = (req.body.Course_id !== undefined) ? addSlashes(req.body.Course_id) :  "" ;
    let StudyDate = (req.body.StudyDate !== undefined) ? addSlashes(req.body.StudyDate) : "";
    let startTime = (req.body.startTime !== undefined) ? addSlashes(req.body.startTime) : "";
    let endTime = (req.body.endTime !== undefined) ? addSlashes(req.body.endTime) : "";
    let Notes = (req.body.Notes !== undefined) ? addSlashes(req.body.Notes) : "";
    let isPlan = 1;

    let Query = "INSERT INTO studydata";
    Query +="(`userID`,`StudyDate`,`Course_id`,`startTime`,`endTime`,`Notes`)";
    Query +="VALUES";
    Query +=`('${userID}','${StudyDate}','${Course_id}','${startTime}','${endTime}','${isPlan}', '${Notes}')`;

    req.ok = false;
    const promisePool = db_pool.promise();
    let rows = [];
    try{
        [rows] = await promisePool.query(Query);
        req.ok = true;
    }
    catch (err){ console.log(err) }
    next();
}
// =====================================================================================================================


// Update
// =====================================================================================================================
// =====================================================================================================================


// Read
// =====================================================================================================================
async function GetActivities(req,res,next){
    let Query="SELECT * FROM studydata";
    const promisePool = db_pool.promise();
    let rows=[];
    req.StudyData_data=[];
    try {
        [rows] = await promisePool.query(Query);
        req.StudyData_data=rows;
    } catch (err) { console.log(err);}
    next();
}
// =====================================================================================================================


// Delete
// =====================================================================================================================
// =====================================================================================================================

module.exports = { AddActivity,GetActivities }