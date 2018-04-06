const User = require('../../models/User')
const UserSession = require('../../models/UserSession')
module.exports = (app) => {

    // Sign Up Process
    app.post('/api/account/signup', (req, res, next) => {
        const {body} = req;
        const {
            fName,
            lName,
            password
        } = body;
        let {email} = body;

        if (!fName) {
            return res.send({
                success: false,
                message: 'Error: Missing first name'
            });
        }
        if (!lName) {
            return res.send({
                success: false,
                message: 'Error: Missing last name'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Missing email'
            });
        }

        email = email.toLowerCase();
        console.log(email);
        User.find({
            email: email
        }, (err, previousUsers) => {
            console.log(previousUsers.length);
            if (err) {
                return res.send('Error: Server error');
            }
            else if (previousUsers.length > 0) {
                return res.send('Error: email already exists')
            }
            //Save
            const newUser = new User();
            newUser.email = email;
            newUser.fName = fName;
            newUser.lName = lName;
            newUser.password = newUser.generateHash(password);
            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Signed Up'
                });
            });
        });
    });

    app.post('/api/account/signin', (req,res,next) =>{
        const {body} = req;
        const {
            password
        } = body;
        let {email} = body;

        if (!password) {
            return res.send({
                success: false,
                message: 'Error: Missing password'
            });
        }
        if (!email) {
            return res.send({
                success: false,
                message: 'Error: Missing email'
            });
        }

        email = email.toLowerCase();
        console.log(email);
        User.find({
            email:email
        },(err,users) =>{
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            if(users.length <1){
                return res.send({
                    success:false,
                    message:'User not registered'
                });
            }
            const user = users[0];
            if(!user.validPassword(password)){
                return res.send({
                   success:false,
                   message:'Error: wrong password'
                });
            }

            //Correct User
            const userSession = new UserSession();
            userSession.userId = user._id;
            userSession.save((err,doc) =>{
                if(err){
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success:true,
                    message:'Valid Sign In!!!',
                    token: doc._id
                });
            });
        });
    });

    //Verify unique token & not deleted
    app.get('/api/account/verify',(req,res,next) => {
        const{query} = req;
        const{token} = query;
        UserSession.find({
            _id: token,
            isDeleted: false
        },(err,sessions)=>{
            if(err){
                if(!sessions){
                    return res.send({
                        success: false,
                        message: 'invalid session'
                    });
                }
                else {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
            }
            if(sessions.length != 1){
                return res.send({
                    success: false,
                    message: 'Invalid Session'
                });
            }
            else{
                return res.send({
                    success:true,
                    message:'Valid Session'
                });
            }
        });
    });

    app.get('/api/account/logout',(req,res,next) =>{
        const{query} = req;
        const{token} = query;
        UserSession.findOneAndUpdate({
            _id: token,
            isDeleted: false
        },{
            $set:{
                isDeleted:true
            }
            },null,(err,sessions) =>{
            if(err){
                return res.send({
                    success: false,
                    message: 'Error: Server error'
                });
            }
            return res.send({
                success:true,
                message:"Logged Out"
            });
        });
    });

}