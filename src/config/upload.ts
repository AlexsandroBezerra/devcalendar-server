import crypto from 'crypto'
import multer from 'multer'
import path from 'path'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')

interface IUploadConfig {
  tmpFolder: string
  uploadFolder: string

  multer: multer.Options
}

const uploadConfig: IUploadConfig = {
  tmpFolder,
  uploadFolder: path.resolve(tmpFolder, 'uploads'),

  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename(_, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex')
        const fileName = `${fileHash}-${file.originalname}`

        return callback(null, fileName)
      }
    })
  }
}

export default uploadConfig
