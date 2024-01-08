const fs = require("fs")
const data = fs.readFileSync("output.json",{encoding:"utf-8"})
console.log(data)