const multer = require("multer")
const path = require("node:path")

const acceptedResumeTypes = {
    ".pdf": "application/pdf",
    ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
}
const maxResumeSize = 5 * 1024 * 1024

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: maxResumeSize + 1
    },
    fileFilter(req, file, callback) {
        const extension = path.extname(file.originalname).toLowerCase()
        if (acceptedResumeTypes[extension] !== file.mimetype) {
            return callback(new Error("Upload a PDF or DOCX resume."))
        }

        return callback(null, true)
    }
})

function uploadResume(req, res, next) {
    upload.single("resume")(req, res, (error) => {
        if (!error) {
            if (req.file?.size > maxResumeSize) {
                return res.status(413).json({ message: "Resume must be 5 MB or smaller." })
            }

            return next()
        }

        const isFileTooLarge = error.code === "LIMIT_FILE_SIZE"
        return res.status(isFileTooLarge ? 413 : 400).json({
            message: isFileTooLarge ? "Resume must be 5 MB or smaller." : error.message
        })
    })
}

module.exports = uploadResume