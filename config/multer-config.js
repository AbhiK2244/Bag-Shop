import multer from "multer";


//using memory to store data
const storage = multer.memoryStorage();
//upload data in storage by default
const upload = multer({storage: storage});

export default upload;