module.exports = function (app, db) {
    var ObjectID = require('mongodb').ObjectID;
    //read
    app.get('/sessions/:id', (req, res) => {
        const id = req.params.id;
        const session = {'_id': new ObjectID(id)};
        db.collection('sessions').findOne(session, (err, item) => {
            if (err) {
                ers.send({'error': 'A error has occured'});
            } else {
                res.send(item);
            }
        });
    });

    //create
    app.post('/sessions', (req, res) => {
        const session = {
            description: req.body.description,
            date: req.body.date
        }
        db.collection('sessions').insertOne(session, (err, results) => {
            if (err) {
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(results.ops[0]);
            }
        })
    });

    app.delete('/sessions/:id', (req, res) => {
        const id = req.params.id;
        const session = {'_id': new ObjectID(id)};
        db.collection('sessions').removeOne(session, (err) => {
            if (err) {
                res.send({'error': 'An Error has occured'});
            } else {
                res.send('Session ' + id + ' deleted!');
            }
        });
    });

    app.put('/sessions/:id', (req,res) => {
       const id = req.params.id;
        const session = {'_id': new ObjectID(id)};
        const input = {
            description: req.body.description,
            date: req.body.date
        };
        db.collection('sessions').update(session, input, (err) => {
            if (err){
                res.send({'error': 'An error has occurred'});
            } else {
                res.send(session);
            }
        });
    });



    app.get('/next', (req, res) => {
        let date = require('date-and-time');
        let now = new Date();
        now =  date.format(now,'YYYY-MM-DD');
        const query = { date: { $gte: now} }
        const orderby = { date: 1 }
        db.collection('sessions').find(query).sort(orderby).toArray(function(err, item)  {
            if (err) {
                res.send({'error': 'A error has occured'});
            } else {
                res.send(item[0]);
            }
        });
    });

    app.get('/date/:date', (req, res) => {
        let dateinput = req.params.date;
        const query = { date: { $gte: dateinput} }
        const orderby = { date: 1 }
        db.collection('sessions').find(query).sort(orderby).toArray(function(err, item)  {
            if (err) {
                res.send({'error': 'A error has occured'});
            } else {
                res.send(item[0]);
            }
        });
    });
};