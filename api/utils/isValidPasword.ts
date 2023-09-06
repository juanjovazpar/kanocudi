const MIN_LENGTH = 12;
const MAX_LENGTH = 50;

export const PASSWORD_RULES = `Password must have a length between ${MIN_LENGTH} and ${MAX_LENGTH}, it must include some uppercase and special character.`;

export const isValidPassword = (password: string): boolean => {
  const uppercasePattern = /[A-Z]/;
  const specialCharOrNumberPattern = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?0-9]/;

  return (
    password.length >= MIN_LENGTH &&
    password.length <= MAX_LENGTH &&
    uppercasePattern.test(password) &&
    specialCharOrNumberPattern.test(password)
  );
};
