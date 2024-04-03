import Database from "../Database/index.js";

/**
 * Initializes the routes for handling courses.
 *
 * @param {Object} app - The Express app object.
 */
export default function CourseRoutes(app) {

    const API_COURSES = "/api/courses";

    app.get("/api/courses/:id", (req, res) => {
        const { id } = req.params;
        const course = Database.courses
          .find((c) => c._id === id);
        if (!course) {
          res.status(404).send("Course not found");
          return;
        }
        res.send(course);
      });
    

    app.put(`${API_COURSES}/:id`, (req, res) => {
        const { id } = req.params;
        const course = req.body;
        Database.courses = Database.courses.map((c) => c.id === id ? {...c, ...course} : c);
        res.sendStatus(204);
    });

    app.delete(`${API_COURSES}/:id`, (req, res) => {
        const { id } = req.params;
        Database.courses = Database.courses.filter((c) => c._id !== id);
        res.sendStatus(204)
    });

    // Create new course
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
