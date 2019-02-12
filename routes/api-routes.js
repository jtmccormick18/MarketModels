const db = require("../models");
const jwt = require('jsonwebtoken');
const authentication = require('../middleware/authentication');
module.exports = function (app) {

    /* ------------------------
        Task Routes
    ---------------------------*/

    app.get('/api/models', function (req, res) {
        db.sequelize.query(`select * from realprop LIMIT 0,10`)
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            });
    })
    //Grant access to authorized users and trade a token
    app.post('/api/login', function (req, res) {
        db.AuthUser.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function (user) {
            jwt.sign({
                username: user.username,
                id: user.id
            }, process.env.SK, { expiresIn: '30m' }, (err, token) => {
                res.json({
                    token: token,
                    id: user.id,
                    username: user.username,
                })
            })
        })
    });
    //Getting Neighborhood Numbers to relay Neighborhood information
    app.get('/api/neighbhood/:neigh', function (req, res) {
        db.sequelize.query(`select neigh,descripton,subd_name,count(REALKEY) as PARCEL_COUNT,avg(curr_val) as VAL_AVG,avg(A_VALUE) as LAND_VAL_AVG,avg(TOTALACRES) as ACRE_AVG from neighbor inner join realprop on neighbor.neigh=realprop.neighbhood where neigh like '${req.params.neigh}%' group by subd_name order by neigh`)
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    })
    //Getting Specific Model Information to allow editing and page rendering
    app.get('/api/ModelInfo/:neigh', function (req, res) {
        db.sequelize.query(`select neigh,descripton,subd_name,realprop.parcel_no,curr_val,A_VALUE as LAND_VAL,TOTALACRES as ACRES from realprop left join neighbor on realprop.neighbhood=neighbor.neigh where neigh='${req.params.neigh}' order by parcel_no`)
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.json(err)
            })
    })
}