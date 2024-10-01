const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');// Import student routes
const app = express();
app.use(cors());
app.use(express.json());

app.use('/students', require('./routes/studentRoute')); // Use student routes
app.use('/scores', require('./routes/scoreRoute')); // Use score routes

const PORT = process.env.PORT || 8080;
mongoose.connect("mongodb://localhost:27017/CRUD")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log("Error: ", err);
    });

    app.post('/api/mapreduce', async (req, res) => {
        const mapFunction = function() {
            emit(this.nameSubject, { name: this.name, scoreTotal: this.scoreTotal });
        };
    
        const reduceFunction = function(key, values) {
            return values.reduce((max, current) => {
                return (current.scoreTotal > max.scoreTotal) ? current : max;
            });
        };
    
        try {
            await mongoose.connection.collection('scores').mapReduce(
                mapFunction,
                reduceFunction,
                { out: "resultCollection" }
            );
            res.status(200).send({ message: 'MapReduce completed successfully.' });
        } catch (error) {
            res.status(500).send({ error: 'MapReduce failed.', details: error });
        }
    });

    app.get('/api/results', async (req, res) => {
        const results = await mongoose.connection.collection('resultCollection').find().toArray();
        res.json(results);
    });