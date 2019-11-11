const dbconfig = require('../../config/database.config');
const SqlObj = require('../utility/MySql.connect');
const axios = require('axios');
const helperFunc = require('../utility/helperFunc');
const curlObj = require('../utility/curlRequest');

// TODO response chek for SQL Resultset
module.exports.emailCount = async (req, res)=>{
    // console.log("controller")
    try{
        const dbParamEmail = dbconfig['local']['email'];
        var mysqlObjEmail = new SqlObj(dbParamEmail);
        let citywiseEmail = await mysqlObjEmail.query(" SELECT COUNT(1) AS cnt , receiver_email FROM\
            tbl_email_analysis WHERE jd_flag=0 AND receiver_email IN ('pune@justdial.com','mumbai@justdial.com',\
            'kolkata@justdial.com','hyderabad@justdial.com','bangalore@justdial.com','chd@justdial.com',\
            'chennai@justdial.com','coimbatore@justdial.com','delhi@justdial.com','chandan.kumar6@justdial.com') GROUP BY receiver_email");
        res.status(200).json({
            message: "emailCount Api is working !!!",
            data: citywiseEmail
        })
    }catch(err){
        res.status(500).json({
            errorCode: 1,
            errorStatus: err.message
        })
    }
    
}

// TODO response chek for SQL Resultset

module.exports.getCompanyDetails = async (req, res)=>{
    let params = {
        eid : req.body.eid,
        dcity: req.body.city,
        phone: req.body.phone,
        scity: req.body.city
    }
    console.log("--phone--number--", params)
    // if (params['phone']){
    let advSearchUrlWithPhone = `http://192.168.20.164/mvc/autosuggest/Adv_search?dcity=${params['dcity']}&scity=${params['scity']}&pincode=&compname=&catid=&contpname=&addr=&street=&area=&phone=${params['phone']}&state=&eid=&pid=&web=&mod=cs&stpos=0&limit=10&debug=0&ncatid=&paid=3&act=3&t=728&debug=0`;
    // }
    let advSearchUrlWithoutPhone = `http://192.168.20.164/mvc/autosuggest/Adv_search?dcity=${params['dcity']}&scity=${params['scity']}&pincode=&compname=&catid=&contpname=&addr=&street=&area=&phone=&state=&eid=${params['eid']}&pid=&web=&mod=cs&stpos=0&limit=10&debug=0&ncatid=&paid=3&act=3&t=728&debug=0`; 
    // console.log("advSearchUrl ---",advSearchUrl )
    try{
        axios.all(
            [
                axios.get(advSearchUrlWithPhone),
                axios.get(advSearchUrlWithoutPhone)
            ]
        ).then(axios.spread((withPhone, withoutPhone) => {
            if ( withPhone.data && withoutPhone.data ){
                if (withoutPhone.data.results && withoutPhone.data.results.hasOwnProperty('data')){
                    let data = withoutPhone.data.results
                    res.status(200).json({
                        errorCode: 0,
                        data: data
                    })
                }else {
                    let data = withPhone.data.results
                    res.status(200).json({
                        errorCode: 0,
                        data: data
                    })
                }
            }

        }));
    }catch(err){
        res.status(500).json({
            errorCode: 1,
            errorStatus: err.message
        })
    }
    
}


// TODO response chek for SQL Resultset
module.exports.getEmailContent = async (req, res)=>{
    // console.log("controller")
    let email_id = req.query.email;
    console.log("email_id------getEmailContent-----------", email_id)
    try{
        const dbParamEmail = dbconfig['local']['email'];
        var mysqlObjEmail = new SqlObj(dbParamEmail);
        let citywiseEmailContent = await mysqlObjEmail.query("SELECT senders_email, read_flag, receiver_email,email_subject ,email_date FROM  tbl_email_analysis WHERE jd_flag=0 AND receiver_email ='"+email_id+"' ORDER BY id DESC");

        res.status(200).json({
            message: "getEmailContent Api is working !!!",
            data: citywiseEmailContent
        })
    }catch(err){
        res.status(500).json({
            errorCode: 1,
            errorStatus: err.message
        })
    }
    
}
 

// TODO response chek for SQL Resultset
module.exports.getEmailBody = async (req, res)=>{
    // console.log("controller")
    console.log('---getemail---body----------', req.body)
    let retArr = {}
    if (!req.body.senders_email) {
        // retArr['errorCode'] = 1;
        // retArr['errorStatus'] = 'senders_email is missing';
        retArr = {
            errorCode: 1,
            errorStatus: 'senders_email is missing'
        }
        return res.status(400).send(retArr);
    }
    if (!req.body.receiver_email) {
        retArr = {
            errorCode: 1,
            errorStatus: 'receiver_email is missing'
        }
        return res.status(400).send(retArr);
    }
    if (!req.body.email_date) {
        retArr = {
            errorCode: 1,
            errorStatus: 'email_date is missing'
        }
        return res.status(400).send(retArr);
    }
    try{
        const dbParamEmail = dbconfig['local']['email'];
        var mysqlObjEmail = new SqlObj(dbParamEmail);
        let getEmailBody = "SELECT senders_email, receiver_email, email_subject, id AS ticketId, email_text, phone_numbers FROM tbl_email_analysis WHERE senders_email= '"+req.body.senders_email+"' AND receiver_email= '"+req.body.receiver_email+"' AND email_date='"+req.body.email_date+"'";
        console.log("-----------------------Query---------------",getEmailBody )
        let citywiseEmailBody = await mysqlObjEmail.query(getEmailBody);
        // console.log("Got the data as", citywiseEmailBody)
        res.status(200).json({
            message: "getEmailBody Api is working !!!",
            data: citywiseEmailBody
        })
    }catch(err){
        res.status(500).json({
            errorCode: 1,
            errorStatus: err.message
        })
    }
    
}

// TODO response chek for SQL Resultset
module.exports.setEmailReadFlag = async (req, res)=>{
    // console.log("controller")
    console.log('---setEmailReadFlag----------', req.body)
    let retArr = {}
    if (!req.body.senders_email) {
    
        retArr = {
            errorCode: 1,
            errorStatus: 'senders_email is missing'
        }
        return res.status(400).send(retArr);
    }
    if (!req.body.receiver_email) {
        retArr = {
            errorCode: 1,
            errorStatus: 'receiver_email is missing'
        }
        return res.status(400).send(retArr);
    }
    if (!req.body.email_date) {
        retArr = {
            errorCode: 1,
            errorStatus: 'email_date is missing'
        }
        return res.status(400).send(retArr);
    }
    try{
        const dbParamEmail = dbconfig['local']['email'];
        var mysqlObjEmail = new SqlObj(dbParamEmail);
        let setEmailStatus = "UPDATE tbl_email_analysis SET  read_flag = 1 WHERE senders_email= '"+req.body.senders_email+"' AND receiver_email= '"+req.body.receiver_email+"' AND email_date='"+req.body.email_date+"'";
        console.log("-----------------------Query-----setEmailReadFlag----------",setEmailStatus )
        let emailStatus = await mysqlObjEmail.query(setEmailStatus);
        // console.log("Got the data as", emailStatus)
        res.status(200).json({
            errorCode: 0,
            message: "Success",
            data: emailStatus
        })
    }catch(err){
        res.status(500).json({
            errorCode: 1,
            errorStatus: err.message
        })
    }
    
}

// TODO response chek for SQL Resultset
module.exports.updateEmailReply = async (req, res)=>{
    // console.log("controller")
    // console.log('---updateEmailReply----------', req.body)
    let retArr = {}
    if (!req.body.senders_email) {
    
        retArr = {
            errorCode: 1,
            errorStatus: 'senders_email is missing'
        }
        return res.status(400).send(retArr);
    }
    if (!req.body.receiver_email) {
        retArr = {
            errorCode: 1,
            errorStatus: 'receiver_email is missing'
        }
        return res.status(400).send(retArr);
    }
    if (!req.body.email_date) {
        retArr = {
            errorCode: 1,
            errorStatus: 'email_date is missing'
        }
        return res.status(400).send(retArr);
    }
    try{
        const dbParamEmail = dbconfig['local']['email'];
        let mysqlObjEmail = new SqlObj(dbParamEmail);
        let getEmailBeforeReply = "SELECT  email_subject, email_text FROM tbl_email_analysis WHERE id= '"+req.body.ticketId+"' AND senders_email = '"+req.body.senders_email+"';"
        let emailBeforeReply = await mysqlObjEmail.query(getEmailBeforeReply);
        if(!helperFunc.isEmpty(emailBeforeReply)){
            // console.log("Got the data as", emailBeforeReply)
            let today = new Date();
            let formatedTime = formatHours(today)

        //     form: { 
        //         source: '',
        //     city_name: 'Bangalore',
        //     mod: 'common_panindia',
        //         email_id: 'chandan.kumar6@justdial.com',
        //         email_subject: 'Testing Email API',
        //         email_text: 'Test Content',
        //         sender_email: 'cspandia@justdial.com',
        //         sender_name: 'noreply@justdial.com' 
        // }

            // let emailPayload = {
            //     'from': 'cspandia@justdial.com',
            //     'to': req.body.senders_email,
            //     'subject': `Re:${emailBeforeReply[0].email_subject}`,
            //     'Date': `${today.getDate()}/${(today.getMonth()+1)}/${today.getFullYear()} ${formatedTime}`,
            //     'body': `${emailBeforeReply[0].email_text}`
            // }

            let emailPayload ={
                source: 'EMAIL_TICKETING_SYSTEM',
                email_id: 'chandan.kumar6@justdial.com',
                email_subject: `Re:${emailBeforeReply[0].email_subject}`,
                email_text: `${emailBeforeReply[0].email_text}`,
                sender_email: 'cspandia@justdial.com',
                sender_name: 'cspandia@justdial.com', 
                city_name: req.body.receiver_email.split('@')[0]
            }
            if(!helperFunc.isEmpty(emailPayload['email_text'])){
                // emailPayload['body'] = `On ${emailPayload['Date']}, <${emailPayload['from']}> wrote: \n ${req.body.emailReplyBody}\n ${emailPayload['body']}`
                emailPayload['email_text'] = `${req.body.emailReplyBody}\n\nOn ${req.body.email_date}, <${req.body.receiver_email}> wrote: \n> ${emailPayload['email_text']}`
            }
            if (helperFunc.mainCityArr.indexOf(emailPayload['city_name']) > -1) {
                //In the array!
                emailPayload['mod'] = 'common_panindia'
            } else {
                //Not in the array
                emailPayload['mod'] = 'common_idc'
            }
            const addLineBreaks = string => string.split('\n').map(text => {
                return text                
            }).join("<br/>");
            // console.log("eMAIL-TEXT", addLineBreaks(emailPayload['email_text']))
            emailPayload['email_text']= addLineBreaks(emailPayload['email_text'])
            console.log("---emailPayload---", emailPayload['email_text'])
            // return false;
            // testing curl call 
            let apiUrl = 'http://192.168.20.116/insert.php';
            let headers = { 
                'content-type': 'application/x-www-form-urlencoded' 
            }
            curlObj.curlCall('POST', apiUrl, headers, emailPayload).then((apiResponse)=>{
                console.log("Api response", apiResponse);
                    res.status(200).json({
                    errorCode: 0,
                    message: "Success",
                    data: apiResponse
                })
            }).catch((error)=>{
                res.status(200).json({
                    errorCode: 1,
                    errorMsg: "Data not found",
                    errorStatus: error.status
                })
            })
        }else{
            res.status(200).json({
                errorCode: 1,
                errorMsg: "Data not found"
            })
        }
    }catch(err){
        res.status(500).json({
            errorCode: 1,
            errorStatus: err.message
        })
    }
    
}


function formatHours(date) {

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let am_or_pm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;

    let formatedTime = hours + ':' + minutes + ' ' + am_or_pm;
    return formatedTime;
}

// module.exports.testUTF = async (req, res)=>{
//     // console.log("controller")
//     try{
//         const dbParamEmail = dbconfig['local']['email'];
//         var mysqlObjEmail = new SqlObj(dbParamEmail);
//         let citywiseEmail = await mysqlObjEmail.query("SELECT email_text FROM tbl_email_analysis WHERE id=11128");
//         res.status(200).json({
//             message: "testUTF Api is working !!!",
//             data: citywiseEmail
//         })
//     }catch(err){
//         res.status(500).json({
//             errorCode: 1,
//             errorStatus: err.message
//         })
//     }
    
// }


