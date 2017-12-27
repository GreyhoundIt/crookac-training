module.exports = function (app, db) {
    app.post('/sessions', (req, res) => {
        console.log(req.body)
        res.send('Hello');
    });
};