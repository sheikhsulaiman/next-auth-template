import * as bcrypt from "bcrypt";

async function saltAndHashPassword(password: string): Promise<string> {
  // Generate a salt
  const saltRounds = 10; // You can adjust the number of salt rounds as needed
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password with the salt
  const hashedPassword = await bcrypt.hash(password, salt);

  // Return the hashed password
  return hashedPassword;
}
