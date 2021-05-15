const low = require("lowdb")
const path = require("path")
const FileSync = require("lowdb/adapters/FileSync")

const USER_HOME = process.env.HOME || process.env.USERPROFILE

const adapter = new FileSync(path.resolve(USER_HOME, "logm.json"))

const db = low(adapter)

// 默认内容, 如果为空
// db.defaults({
//     auth: [
//         {
//             name: "admin",
//             password: "123123123",
//         },
//     ],
//     token: [
//         {
//             name: "admin",
//             token: "123123123",
//         },
//     ],
// }).write()
