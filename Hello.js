export default function Hello(app) {
    function rootHandler(req, res) {
        res.send('Hello World!');
    }
    app.get('/', rootHandler);
    app.listen(4000);
}

