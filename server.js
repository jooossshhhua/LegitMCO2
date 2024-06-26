const mysql = require('mysql2');
const path = require('path');
const express = require('express');

const app = express();

const connection = mysql.createConnection({
    host: 'ccscloud.dlsu.edu.ph',
    port: 20075,
    user: 'root',
    password: 'STADVDB25PW',
    database: 'mco2',
});
app.use(express.json());
// Connect to the database1
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to database1:', err);
        return;
    }
    console.log('Connected to the database1');
});


const connection1 = mysql.createConnection({
    host: 'ccscloud.dlsu.edu.ph',
    port: 20076,
    user: 'root',
    password: 'STADVDB25PW',
    database: 'mco2',
});
app.use(express.json());
// Connect to the database2
connection1.connect((err) => {
    if (err) {
        console.error('Error connecting to database2:', err);
        return;
    }
    console.log('Connected to the database2');
});


const connection2 = mysql.createConnection({
    host: 'ccscloud.dlsu.edu.ph',
    port: 20077,
    user: 'root',
    password: 'STADVDB25PW',
    database: 'mco2',
});
app.use(express.json());
// Connect to the database3
connection2.connect((err) => {
    if (err) {
        console.error('Error connecting to database3:', err);
        return;
    }
    console.log('Connected to the database3');
});



app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.render('home');
});
app.get('/add', (req, res) => {
    res.render('add');
});
app.get('/appointment', (req, res) => {
    res.render('appointment');
});
app.listen(6969, () => {
    console.log('Server is running 6969');
});
app.get('/view-appointment', (req, res) => {
    res.render('view');
});

app.post('/add', (req, res) => {
    console.log('INSIDE HERE ADDING OF DATA POST REQUEST');
    console.log(req.body);
    connection.query(
        'INSERT INTO appointments SET ?',
        req.body,
        (error, results, fields) => {
            if (error) {
                console.error('Error inserting data:', error);
                res.status(500).send('Error inserting data');
                return;
            }
            console.log('Data inserted successfully:', results);
            res.status(200).json({
                data: {
                    results,
                },
            });
        }
    );
});
app.patch('/add', (req, res) => {
    console.log('INSIDE HERE UPDATING  DATA POST REQUEST');
    console.log(req.body);
    const {
        id,
        status,
        QueueDate,
        type,
        isVirtual,
        Age,
        City,
        Province,
        RegionName,
        Region,
        pxid,
    } = req.body;
    /*
    console.log(id);
    console.log(status);
    console.log(QueueDate);
    console.log(type);
    console.log(isVirtual);
    console.log(Age);
    console.log(City);
    console.log(Province);
    console.log(RegionName);
    console.log(Region);
    console.log(pxid);*/
    // Update data in the database

    connection.query(
        'UPDATE appointments SET status=?, QueueDate=?, type=?, isVirtual=?, age=?, City=?, Province=?, RegionName=?, Region=?, pxid=? WHERE id=?',
        [
            status,
            QueueDate,
            type,
            isVirtual,
            Age,
            City,
            Province,
            RegionName,
            Region,
            pxid,
            id,
        ],
        (error, results, fields) => {
            if (error) {
                console.error('Error updating data:', error);
                res.status(500).send('Error updating data');
                return;
            }
            console.log('Data updated successfully:', results);
            res.status(200).send('Data updated successfully');
        }
    );
});
app.delete('/add', (req, res) => {
    console.log('INSIDE HERE  OF DELETE APPOINTMENT POST REQUEST');
    console.log(req.body);
    const { id } = req.body;

    // Delete appointment from the database
    connection.query(
        'DELETE FROM appointments WHERE id = ?',
        [id],
        (error, results, fields) => {
            if (error) {
                console.error('Error deleting appointment:', error);
                res.status(500).send('Error deleting appointment');
                return;
            }
            console.log('Appointment deleted successfully:', results);
            res.status(200).send('Appointment deleted successfully');
        }
    );
});
app.get('/appointment/:id', (req, res) => {
    console.log('INSIDE GET APPOINTMENT');

    const id = req.params.id;

    // Select appointment from the database based on ID
    connection.query(
        'SELECT * FROM appointments WHERE id = ?',
        [id],
        (error, results, fields) => {
            if (error) {
                console.error('Error fetching appointment:', error);
                res.status(500).send('Error fetching appointment');
                return;
            }

            if (results.length === 0) {
                console.log('Appointment not found');
                res.status(404).send('Appointment not found');
                return;
            }

            const appointment = results[0];
            console.log('Appointment found:', appointment);
            res.status(200).json({
                data: {
                    appointment,
                },
            });
        }
    );
});
