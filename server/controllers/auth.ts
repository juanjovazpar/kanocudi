import { Request, Response } from "express";

const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    // ... (signup controller logic)
  } catch (error) {
    res.status(500).json({
      message: "Error creating user",
      error: (error as Error).message,
    });
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    // ... (login controller logic)
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error during login ",
        error: (error as Error).message,
      });
  }
};

export { signup, login };
