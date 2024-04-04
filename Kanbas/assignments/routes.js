import db from "../Database/index.js"

function AssignmentRoutes(app) {

    // CREATE
    app.post("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const newAssignment = {
            ...req.body,
            course: cid,
            _id: new Date().getTime().toString(),
        }
        db.assignments.push(newAssignment);
        res.send(newAssignment);
    });

    // READ 
    app.get("/api/courses/:cid/assignments", (req, res) => {
        const { cid } = req.params;
        const assignments = db.assignments
            .filter((a) => a.course === cid);
        res.send(assignments);  
    });



}
export default AssignmentRoutes;