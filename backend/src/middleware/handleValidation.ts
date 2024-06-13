import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const handleValidation = (req: Request, res: Response, next: NextFunction) => {
  const result = validationResult(req);
  if (result.isEmpty()) next();
  else res.status(400).json({ errors: result.array() });
}

export default handleValidation;