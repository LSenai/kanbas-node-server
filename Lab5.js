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
    { id: 1, title: "Task 1", completed: false , description: 'something', due: '2024-09-09'},
    { id: 2, title: "Task 2", completed: true, description: "huh", due: '2024-09-09' },
    { id: 3, title: "Task 3", completed: false, description: "3", due: '2024-09-09'},
    { id: 4, title: "Task 4", completed: true, description: "4", due: '2024-09-09' },
];

const Lab5 = (app) => {

    app.post("/a5/todos", (req, res) => {
        const newTodo = {
            ...req.body, 
            id: new Date().getTime(),
        };
        todos.push(newTodo); 
        res.json(newTodo);
    });

    app.delete("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.status(404).json({ message: `Unable to delete Todo with ID ${id}` })
        }
        todos.splice(todos.indexOf(todo), 1);
        res.sendStatus(200);
    });

    app.put("/a5/todos/:id", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        if (!todo) {
            res.status(404).json({ message: `Unable to update Todo with ID ${id}` })
        }
        todo.title = req.body.title;
        todo.description = req.body.description;
        todo.completed = req.body.completed;
        res.sendStatus(200);
    });

    /* WORKING WITH ARRAYS OF OBJECTS */
    /* TODOS */
    /* 
    CREATE operations 
    It's important to note that CREATE operations need to be implemented BEFORE READ.
    This is because the :id path parameter would interpret ':id' path param as the 'create' --> error.
    */
   app.get("/a5/todos/create", (req, res) => {
    const newTodo = {
        id: new Date().getTime(),
        title: "New Task",
        completed: false,  
    };
    todos.push(newTodo);
    res.json(todos);
   });

    /* READ OPERATIONS */
    app.get("/a5/todos", (req, res) => {
        // build out commmands for case of query strings
        const { completed } = req.query; // checks if 'completed' is in the URL query (right phrasing?)
        if (completed  !== undefined) { // if 'completed' was in the query, then it's not undefined, then execute if block
            const completedBool = completed === "true"; 
            const completedTodos = todos.filter(
                (t) => t.completed === completedBool);
            res.json(completedTodos);
            return;
        }
        res.json(todos); // if no query string, this just returns 'em all
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

    /* DELETE OPERATIONS */
    app.get("/a5/todos/:id/delete", (req, res) => {
        const { id } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        const todoIndex = todos.indexOf(todo);
        if (todoIndex !== -1) {
            todos.splice(todoIndex, 1);
        }
        res.json(todos);
    });

    /* UPDATE */
    app.get("/a5/todos/:id/title/:title", (req, res) => {
        const { id, title } = req.params;
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.title = title;
        res.json(todos);
    });

    app.get("/a5/todos/:id/description/:description", (req, res) => {
        const {id, description} = req.params
        const todo = todos.find((t) => t.id === parseInt(id));
        todo.description = description;
        res.json(todos);
    })

    app.get("/a5/todos/:id/completed/:completed", (req, res) => {
        const {id, completed} = req.params
        const todo = todos.find((t)=>t.id === parseInt(id));
        const boolCompleted = completed === 'true';
        todo.completed == boolCompleted;
        res.json(todos);
    })

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