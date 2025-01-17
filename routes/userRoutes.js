import Express from 'express';
import userModel from '../model/userModel.js';
// import bcrypt from 'bcryptjs';

const router = Express.Router();
console.log('\n\n');


async function hashPassword(passkey) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(passkey, salt);
    console.log(hashedPassword);
    return hashedPassword;
    
}

async function checkPassword(newPass, hashedPassword){
    return (await bcrypt.compare(newPass, hashedPassword));  
}

router.post('/loginuser', async (req, res) => {

    const { email, password } = req.body;
    // console.log(`${email}\t${password}`);
    try {
        const user = await userModel.findOne({ email : email, password: password});
        console.log(user['password']);
        // const isMatch = await checkPassword(password, user['password']);
        // console.log(isMatch);
        if (user) {
            if(user){
                const currentUser = {
                    name: user.name,
                    email: user?.email,
                    college: user?.college,
                    course: user?.course,
                    year: user?.year
                }
                res.status(200).send(currentUser)
            }
            else{
                res.status(401).json({message:"Invalid Credentials..."});
            }
        }
        else {
            res.status(401).json({
                message: "User Not Found."
            })
        }
    }
    catch (error) {
        res.status(401).json({
            message: 'User Not Found...'
        })
    }
})

router.post('/registeruser', async (req, res) => {
    // console.log(req.body);
    const { name, email } = req.body;
    var password = req.body.password;
    const hashedPasswordToRegister = await hashPassword(password);
    password = hashedPasswordToRegister;
    console.log(`Hashed Password : ${hashedPasswordToRegister} \nPassword in Database : ${password}`);
    const newUser = new userModel({ name, email, password });
    // console.log(newUser);
    try {
        const user = await userModel.find({ email: email });
        const len = user.length;
        // console.log(len);
        if (len >= 1) {
            // console.log("IN TRUE")
            res.status(200).json({
                success: false,
                message: 'Email Already in Use.'
            })
        }
        else {
            // console.log("IN FALSE")
            await newUser.save()
            res.status(200).json({
                success: true,
                message: 'Registration Successful'
            })
        }
    }
    catch (error) {
        console.log("IN ERROR")
        res.status(500).json({
            message: 'Error occured while registering...'
        });
    }
})

router.get('/getallusers', async (req, res) => {
    try {
        const users = await userModel.find({});
        res.status(200).send(users);
        // console.log(users);
    } catch (err) {
        res.status(404).json({ message: err })
    }
})

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // If the user exists, you could return a message saying the user exists,
        // or you can redirect to a reset password route immediately.
        res.status(200).json({ message: 'User exists. Proceed to reset password.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

router.post('/resetpassword', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        const user = await userModel.findOne({ email });
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(password);
        // Update the password
        user.password = password;
        console.log(user);
        user.save();
        res.status(200).json({ message: 'Password Reset Successful' });

    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
})

router.get('/search', async (req, res) => {
    const collegeName = req.query.college; // Getting the college name from the query parameters
  
    try {
      if (!collegeName) {
        return res.status(400).json({ message: 'College name is required' });
      }
  
      const articles = await Article.find({
        college: { $regex: collegeName, $options: 'i' }
      });
  
      if (articles.length === 0) {
        return res.status(404).json({ message: 'No articles found for this college' });
      }
  
      res.json(articles); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

export default router;