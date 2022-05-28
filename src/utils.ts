import * as bcrypt from "bcrypt";

//bcrypt.compareSync(myPlaintextPassword, hash); // true

export function verifyPassword (userPassword: string, hash : string){
    return bcrypt.compareSync(userPassword, hash); // true
};
