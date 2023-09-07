import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

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

export const getJWToken = (userId: string, email: string): string => {
  const jwtSecret = process.env.JWT_SECRET || "default-secret";
  const token: string = jwt.sign({ userId, email }, jwtSecret, {
    expiresIn: "1h",
  });

  return token;
};
