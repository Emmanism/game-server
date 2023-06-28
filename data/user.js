import bcrypt from "bcryptjs";

const users = [
    {
        name:"User",
        email:"admin@example.com",
        password:bcrypt.hashSync("123456", 10),
    }, 
    {
        name:"User",
        email:"user@example.com",
        password:bcrypt.hashSync("123456", 10),
    }
]

export default users