import bcrypt from "bcrypt";


const hash = bcrypt.hashSync("1111",10);
console.log(hash);
// Store hash in your password DB.