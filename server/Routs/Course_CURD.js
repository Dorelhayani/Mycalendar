const express = require('express');
const router = express.Router()
module.exports = router;

// Create
// =====================================================================================================================
router.post("/Add",(req, res) => {
    let name = addSlashes(req.body.name);
    let Q=`INSERT INTO \`course\` (\`name\`) VALUES ('${name}')` ;
    db_pool.query(Q, function(err){
        if(err){  res.status(500).json({message: err})  }
        else{  res.status(200).json({message: "OK"});  }    });  });
// =====================================================================================================================


// Read
// =====================================================================================================================
router.get("/List",(req, res) => {
    let q="SELECT * FROM `course` ";
    db_pool.query(q, function(err, rows){
        if(err)  {  res.status(500).json({message: err})  }
        else {  res.status(200).json(rows );  }    });    });
// =====================================================================================================================


// Update
// =====================================================================================================================
router.patch("/Update",(req, res) => {
    let id=req.body.id;
    let name=req.body.name;
    let Q =`UPDATE \`course\`  SET \`name\`='${name}' WHERE id=${id} `;
    db_pool.query(Q, function(err){
        if(err){ res.status(500).json({message: err}) }
        else{  res.status(200).json({message: "OK"});  }    });    });
// =====================================================================================================================


// Delete
// =====================================================================================================================
router.delete("/Delete",(req, res) => {
    let id=req.body.id;
    let q=`DELETE FROM \`course\` WHERE id='${id}' `;
    db_pool.query(q, function(err){
        if(err){  res.status(500).json({message: err})  }
        else {  res.status(200).json({message: "OK"});  }    });    });
// =====================================================================================================================
