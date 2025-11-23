import bcrypt from 'bcrypt';

export const encryptPassword = async (password: string) => {
  const saltOrRounds = 10;
  const encryptedPassword = await bcrypt.hash(password, saltOrRounds);
  return encryptedPassword;
};

/**
 * Verifies if the provided plaintext password matches the hashed password.
 *
 * @param password - The password to verify.
 * @param userPassword - The hashed password to compare against (as stored in the database).
 */
export const isPasswordMatch = async (
  password: string,
  userPassword: string,
) => {
  return bcrypt.compare(password, userPassword);
};
