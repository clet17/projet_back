// import multer from 'multer'

// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//     cb(null, 'public/images/')
//     },
//     filename: function(req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + '.' +
//     file.originalname.split('.').pop())
//     }
//     })

// export const upload = multer({ storage: storage })
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path from 'path'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname).toLowerCase()
    const uniqueName = `${file.fieldname}-${uuidv4()}${ext}`
    cb(null, uniqueName)
  }
})

export const upload = multer({ storage: storage })
