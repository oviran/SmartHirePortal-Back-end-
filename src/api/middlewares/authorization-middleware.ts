import ForbiddenError from "../../domain/errors/forbidden-error";
import { NextFunction, Response, Request } from "express";


const AuthorizationMiddleware = (  error: Error,
    req: Request,
    res: Response,
    next: NextFunction) => {
//@ts-ignore
  if (req.auth.claims.metadata.role !== "admin") {
    throw new ForbiddenError("Admin only route");
  }
  next();
};

export default AuthorizationMiddleware;