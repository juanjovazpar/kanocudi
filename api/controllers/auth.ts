import { Request, Response } from 'express';
import { IUser, User } from '../db/schemas/user';
import { sendVerificationMail } from '../mailer/verificationLink';
import { getHashedToken, getJWToken } from '../utils/tokenGenerator';
import { isValidEmail } from '../utils/isValidEmail';
import {
  PASSWORD_RULES,
  comparePasswords,
  hashPassword,
  isValidPassword,
} from '../utils/passwords';

export const signup = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const existingUser: IUser | null = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({ message: 'Email already exists' });
      return;
    }

    if (!isValidEmail(email)) {
      res.status(400).json({ message: 'Invalid email format' });
      return;
    }

    if (!isValidPassword(password)) {
      res
        .status(400)
        .json({ message: `Invalid password format. ${PASSWORD_RULES}` });
      return;
    }

    const hashedPassword = await hashPassword(password);
    const hashedVerificationToken = await getHashedToken();
    const newUser: IUser = new User({
      email,
      password: hashedPassword,
      verificationToken: hashedVerificationToken,
    });

    await newUser.save();
    // await sendVerificationMail(email, hashedVerificationToken);

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user', error });
  }
};

export const signin = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user) {
      res
        .status(401)
        .json({ message: 'Authentication failed. User not found.' });
      return;
    }

    const passwordMatch: boolean = await comparePasswords(
      password,
      user.password
    );

    if (!passwordMatch) {
      res
        .status(401)
        .json({ message: 'Authentication failed. Incorrect password.' });
      return;
    }
    const token: string = getJWToken(user._id, user.email);

    user.last_login = new Date();
    await user.save();

    res.status(200).json({ token, userId: user._id, email: user.email });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login', error });
  }
};
