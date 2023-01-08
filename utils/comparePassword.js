import bcrypt from 'bcrypt'
export const comparePassword= async (password,hashedPassword)=>{
   const match = await bcrypt.compare(password,hashedPassword)
   return match
}