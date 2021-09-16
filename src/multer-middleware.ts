import * as Multer from 'multer'

const validMimes = [
    "audio/aif",
    "audio/aiff",
    "audio/au",
    "audio/jam",
    "audio/m3u",
    "audio/mid",
    "audio/midi",
    "audio/mod",
    "audio/mp2",
    "audio/mp3",
    "audio/mpa",
    "audio/mpg",
    "audio/mpga",
    "audio/mpeg",
    "audio/wav",
]

const storageConfig = Multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname + "-" + Date.now());
    }
});

const fileFilter = (req, file, cb) => {
    console.log(file.mimetype)
    if(validMimes.includes(file.mimetype)){
        cb(null, true);
        return
    }
    cb(null, false);
}

const upload = Multer({storage:storageConfig, fileFilter: fileFilter})

export {upload}