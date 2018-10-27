let mysql = require('mysql');

let pool = mysql.createPool({
    connectionLimit: 50000,
    user: "root",
    password: "dkd!@#",
    database: "DKD"
});

const ERROR_CODE = {
    Unavailable_ID: 401,
    No_matched_ID: 402,
    Wrong_credentials: 403,
    DB_error: 501
};
module.exports.ERROR_CODE = ERROR_CODE;



module.exports.setDB = function (ID, K1, K2, frame, vital, callback) {
    pool.getConnection(function (err, con) {
        if(err){
            console.log(err);
            callback(ERROR_CODE.DB_error);
        }else{
            if(ID == "c001") {
                let sql = "INSERT INTO c001 (ID, K1, K2, frame, vital) VALUES (?, ?, ?, ?, ?)";
                let values = [ID, K1, K2, frame, vital];
                //vital = [혈압, 체온, 심박수, 호흡]
                con.query(sql, values, function (err, result) {
                    con.release();
                    if(err) {
                        console.log(err);
                        callback(ERROR_CODE.DB_error);
                    }else if(!result.affectedRows){
                        callback(ERROR_CODE.Wrong_credentials);
                    }else{
                        callback(false);
                    }
                })
            }
        }
    })
};