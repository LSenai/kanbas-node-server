function Calculator(app) {
    app.get("/a5/add/:num1/:num2", (req, res) => {
        const params = req.params;
        const a = parseInt(params.num1);
        const b = parseInt(params.num2);
        const sum = a + b;

        res.send(`Sum of ${a} and ${b} is ${sum}`);
    });

    app.get("/a5/sub/:num1/:num2", (req, res) => {
        const params = req.params;
        const a = parseInt(params.num1);
        const b = parseInt(params.num2);
        const diff = a - b;

        res.send(`Difference of ${a} and ${b} is ${diff}`);
    });

    app.get("/a5/calculator")
}

export default Calculator;