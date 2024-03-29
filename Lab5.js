// Object state persists as long as server is running.
// Rebooting the server resets the object
const assignment = {
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  };


const module = {
    id: 1, name: "What is Human Rights?",
    description: "An opening discussion defining key terms and concepts in Human Rights", 
    course: "HR101"
}

const todos = [
    { id: 1, title: "Task 1", completed: false },
    { id: 2, title: "Task 2", completed: true },
    { id: 3, title: "Task 3", completed: false },
    { id: 4, title: "Task 4", completed: true },
];

const Lab5 = (app) => {

    /* WORKING WITH ARRAYS OF OBJECTS */
    app.get("/a5/todos", (req, res) => {
        res.json(todos);
    });

    /* Retrieving item by ID */
    app.get("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        
        if (!todo) {
            res.status(404).json({ error: "Todo not found" }); // Send a 'Not Found' error
        } else {
            res.json(todo);
        }
    });
    
    /* WORKING WITH OBJECTS */
    /* MODULE */
    app.get("/a5/module", (req, res) => {
        res.json(module);
    });

    app.get("/a5/module/name", (req, res) => {
        res.json(module.name);
    });

    app.get("/a5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    })

    // edit description

    /* ASSIGNMENT */
    // use .json() instead of .send if you know the response is formatted as JSON
    app.get("/a5/assignment", (req, res) => {
        res.json(assignment);
    });

    app.get("/a5/assignment/title", (req, res) => {
        res.json(assignment.title);
    });

    app.get("/a5/assignment/title/:newTitle", (req, res) => {
        const { newTitle } = req.params;
        assignment.title = newTitle;
        res.json(assignment)
    })

    // edit score
    app.get("/a5/assignment/score/:newScore", (req, res) => {
        const { newScore } = req.params;
        assignment.score = newScore;
        res.json(assignment)
    })

    // edit completed(T/F)
    app.get("/a5/assignment/completed/:toggleComplete", (req, res) => {
        const { toggleComplete } = req.params;
        assignment.completed = toggleComplete;
        res.json(assignment)
    })

    // ROUTE BASICS
    // Route 1: Basic welcome message
    app.get("/a5/welcome", (req, res) => {
        res.send("Welcome to Assignment 5");
    });
    // Route 2: Addition using path parameters
    app.get("/a5/add/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) + parseInt(b);
        res.send(sum.toString());
      });
    
    // Route 3: Subtraction using path parameters
    app.get("/a5/subtract/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const sum = parseInt(a) - parseInt(b);
        res.send(sum.toString());
      });    

    // Route 4: Multiplication 
    app.get("/a5/multiply/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const result = parseInt(a) * parseInt(b);
        res.send(result.toString());
    });

    // Route 5: Division
    app.get("/a5/divide/:a/:b", (req, res) => {
        const { a, b } = req.params;
        const result = parseInt(a) / parseInt(b);
        res.send(result.toString());
    });

    // Route 6: Query parameter calculator
    app.get("/a5/calculator", (req, res) => {
        const { a, b, operation } = req.query;
        let result = 0;
        switch (operation) {
            case "add":
                result = parseInt(a) + parseInt(b);
                break;
            case "subtract":
                result = parseInt(a) - parseInt(b);
                break;
            case "multiply":
                result = parseInt(a) * parseInt(b);
                break;
            case "divide":
                result = parseInt(a) / parseInt(b);
                break;
            default:
                result = "Invalid operation";
        }
        res.send(result.toString());
    });
};
export default Lab5;