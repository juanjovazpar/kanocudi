import bcrypt from "bcryptjs";
import crypto from "crypto";

export const getHashedToken = async (
  expiration: number = 24 * 60 * 60 * 1000
): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  const expirationTime = Date.now() + expiration;
  const verificationToken = `${crypto
    .randomBytes(32)
    .toString("hex")}.${expirationTime}`;

  return await bcrypt.hash(verificationToken, salt);
};
