import multer from 'multer'

const dateFormatter = (date: Date): string => {
  return `${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDate()}${date.getUTCHours()}${date.getUTCMinutes()}${date.getUTCSeconds()}${date.getUTCMilliseconds()}`
}

export const storage = multer.diskStorage({
  destination: 'static',
  filename: (_, file, callback) => {
    callback(
      null,
      `${dateFormatter(new Date())}-${file.fieldname}-${file.originalname}`
    )
  },
})
