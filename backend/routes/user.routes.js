const express= require('express');
const multer= require('multer');
const path= require('path');
const bodyParser= require('body-parser');

const user= express();
user.use(bodyParser.urlencoded({extended: true}));
user.use(express.static(path.resolve(__dirname, 'public')));

const storage= multer.diskStorage({
  destination:(req,file,cb)=>{
      cb(null, './public/uploads')
  },
  filename:(req, file, cb)=>{
      cb(null, file.originalname)
  }
});

const upload= multer({storage: storage});


const userController= require('../controllers/user.controller.js')
user.post('/importUser', upload.single('file'),userController.importUser);

module.exports= user;
