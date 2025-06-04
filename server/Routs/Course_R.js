const express = require('express');
const router = express.Router()
module.exports = router;
const course_MID = require("../middleware/course_mid");

// Create
// =====================================================================================================================
router.get("/Add", (req,res)=>{ res.render("crs_add",{ data: {} }); });
router.post("/Add",[course_MID.AddCourse], (req, res) => { res.redirect("/course/List"); });
// =====================================================================================================================


// Read
// =====================================================================================================================
router.get("/List",[course_MID.GetAllCourses],(req,res)=>{
    res.render("crs_list",{
        page_title:"Courses List",
        courses: req.courses_data,
        page: req.page,
        total_pages: req.total_pages,
    });
});
// =====================================================================================================================


// Delete
// =====================================================================================================================
router.post("/Delete", [course_MID.DeleteCourse] ,(req,res)=>{ res.redirect("/course/List"); })
// =====================================================================================================================


// Update
// =====================================================================================================================
router.get("/Edit/:id",[course_MID.GetOneCourse], (req,res)=>{
    if(req.GoodOne){ res.render("crs_add",{ data: req.one_course_data,});}
    else res.redirect("/course/List"); });
router.post("/Edit/:id",[course_MID.UpdateCourse], (req, res) => { res.redirect("/course/List"); });
// =====================================================================================================================

