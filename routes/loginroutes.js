const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
var app = express();
var bcrypt = require('bcrypt');
var nodemailer = require('nodemailer');
//Configuring express server
app.use(bodyparser.json());//MySQL details
var connection = mysql.createConnection({
host: 'localhost',
user: 'root',
password: 'root',
database: 'REGISTRATION',
multipleStatements: true
});
connection.connect((err)=> {
    if(!err)
    console.log('Connection Established Successfully');
    else
    console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
});

exports.register = async function(req,res) {
    var email= req.body.email;
    connection.query('SELECT * FROM Vendor_Reg WHERE email = ?',[email], async function (error, results, fields) {
        if (results.length === 0) {
                const password = req.body.password;
                var saltRounds = 10;   
                const encryptedPassword = await bcrypt.hash(password, saltRounds)

                var Vendor_Reg = {
                    password: encryptedPassword,
                    SupplierName: req.body.SupplierName,
                    SupplierAlias: req.body.SupplierAlias,
                    Address1: req.body.Address1,
                    Address2: req.body.Address2,
                    Address3: req.body.Address3,
                    City: req.body.City,
                    Pin: req.body.Pin,
                    State: req.body.State,
                    Country: req.body.Country,
                    IT_PAN: req.body.IT_PAN,
                    GST_Reg: req.body.GST_Reg,
                    GST_Reg_Type: req.body.GST_Reg_Type,
                    NSIC_Reg: req.body.NSIC_Reg,
                    MSC_Reg: req.body.MSC_Reg,
                    Approved_Vendor: req.body.Approved_Vendor,
                    NSIC_Dt: req.body.NSIC_Dt,
                    MSE_Dt: req.body.MSE_Dt,
                    GeM_Reg: req.body.GeM_Reg,
                    Per_NSIC_Val: req.body.Per_NSIC_Val,
                    Per_SSI_Val: req.body.Per_SSI_Val,
                    ISO_9000: req.body.ISO_9000,
                    ISO_14000: req.body.ISO_14000,
                    ISO_18000: req.body.ISO_18000,
                    Mobile: req.body.Mobile,
                    landline: req.body.landline,
                    Faxes: req.body.Faxes,
                    Email: req.body.email,
                    Alt_email: req.body.Alt_email,
                    Website: req.body.Website,
                    Proprietor_Name: req.body.Proprietor_Name,
                    Group_Name: req.body.Group_Name,
                    Holding_Company: req.body.Holding_Company,
                    Subsidiary: req.body.Subsidiary,
                    Established_Year: req.body.Established_Year,
                    Contact_Person: req.body.Contact_Person,
                    Designation: req.body.Designation,
                    Department: req.body.Department,
                    Ownership_Type: req.body.Ownership_Type,
                    Business_Nature: req.body.Business_Nature,
                    SC_ST_Enterprise: req.body.SC_ST_Enterprise,
                    Women_Enterprise: req.body.Women_Enterprise,
                    Registration_for_trial: req.body.Registration_for_trial,
                    Products_Offered: req.body.Products_Offered,
                    Product_Category: req.body.Product_Category,
                    Turn_Over_year_1: req.body.Turn_Over_year_1,
                    Turn_Over_Rs_1: req.body.Turn_Over_Rs_1,
                    Turn_Over_year_2: req.body.Turn_Over_year_2,
                    Turn_Over_Rs_2: req.body.Turn_Over_Rs_2,
                    Turn_Over_year_3: req.body.Turn_Over_year_3,
                    Turn_Over_Rs_3: req.body.Turn_Over_Rs_3,
                    HO_Address: req.body.HO_Address,
                    HO_State: req.body.HO_State,
                    HO_City: req.body.HO_City,
                    HO_Country: req.body.HO_Country,
                    HO_Pin: req.body.HO_Pin,
                    HO_Phone1: req.body.HO_Phone1,
                    HO_Phone2: req.body.HO_Phone2,
                    HO_Phone3: req.body.HO_Phone3,
                    HO_Email_Id: req.body.HO_Email_Id,
                    HO_Fax_Nos1: req.body.HO_Fax_Nos1,
                    HO_Fax_Nos2: req.body.HO_Fax_Nos2,
                    HO_Fax_Nos3: req.body.HO_Fax_Nos3,
                    HO_Website: req.body.HO_Website,
                    FS_Address: req.body.FS_Address,
                    FS_State: req.body.FS_State,
                    FS_City: req.body.FS_City,
                    FS_Country: req.body.FS_Country,
                    FS_Pin: req.body.FS_Pin,
                    FS_Phone1: req.body.FS_Phone1,
                    FS_Phone2: req.body.FS_Phone2,
                    FS_Phone3: req.body.FS_Phone3,
                    FS_Email_Id: req.body.FS_Email_Id,
                    FS_Fax_Nos1: req.body.FS_Fax_Nos1,
                    FS_Fax_Nos2: req.body.FS_Fax_Nos2,
                    FS_Fax_Nos3: req.body.FS_Fax_Nos3,
                    FS_Website: req.body.FS_Website,
                    CP_Address: req.body.CP_Address,
                    CP_State: req.body.CP_State,
                    CP_City: req.body.CP_City,
                    CP_Country: req.body.CP_Country,
                    CP_Pin: req.body.CP_Pin,
                    CP_Phone1: req.body.CP_Phone1,
                    CP_Phone2: req.body.CP_Phone2,
                    CP_Phone3: req.body.CP_Phone3,
                    CP_Email_Id: req.body.CP_Email_Id,
                    CP_Fax_Nos1: req.body.CP_Fax_Nos1,
                    CP_Fax_Nos2: req.body.CP_Fax_Nos2,
                    CP_Fax_Nos3: req.body.CP_Fax_Nos3,
                    CP_Website: req.body.CP_Website
                }

                connection.query('INSERT INTO Vendor_Reg SET ?', Vendor_Reg, function (error, results, fields) {
                    if (error) {
                        res.send({
                            "code": 400,
                            "failed": error
                        })
                    } else {
                        res.send({
                            "code": 200,
                            "success": "user registered sucessfully"
                        });
                    }
                });
            
        } else {
            res.send({
                "code":400,
                "failed":"user exists"
            });
       }    
    });
}


exports.login = function(req,res){
    var email = req.body.email;
    var password = req.body.password;
    connection.query('SELECT * FROM Vendor_Reg WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there is some error with query'
            })
      }else{
        if(results.length >0){
            bcrypt.compare(password, results[0].Password, function(err, ress) {
                if(!ress){
                    res.json({
                      status:false,                  
                      message:"email, password doesn't match "
                    });
                }else{                    
                    res.json({
                        status:true,
                        message:"Login Successful"
                    })
                }
            });         
        }
        else{
          res.json({
              status:false,
            message:"Email does not exits"
          });
        }
      }
    });
}

exports.reset = function(req,res) {
    const transport = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: true,
        auth: {
           user: 'lekya.sheral05@gmail.com',
           pass: 'ryandee1998'
        }
    });
}

