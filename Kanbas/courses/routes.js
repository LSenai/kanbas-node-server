import Database from "../Database/index.js";

/**
 * Initializes the routes for handling courses.
 *
 * @param {Object} app - The Express app object.
 */
export default function CourseRoutes(app) {

    const API_COURSES = "/api/courses";

    app.post(`${API_COURSES}`, (req, res) => {
        const course = {...req.body, 
            id: new Date().getTime().toString() };
        Database.courses.push(course);
        res.send(course);
    })
    
    app.get("/api/courses", (req, res) => {
        const courses = Database.courses;
        res.send(courses)
    })
}