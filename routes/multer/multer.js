const multer = require("multer")
const path = require("path");

let timer = 0
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        
        cb(null,"./upload")
    },
    filename:function(req, file,cb){
        cb(null,`/photo(${++timer})`+path.extname(file.originalname))
        
    }
})
const upload = multer({storage: storage})


module.exports = upload