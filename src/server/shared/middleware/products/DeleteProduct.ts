import { Response } from "express";
import { validation } from "../Validation";
import { z } from "zod";

const testi = z
  .string()
  .length(24, { message: "Must be exactly 14 characters long" });

export async function TestingId(id: string, res: Response) {
  const tsta = validation("params", testi.parse(id));
  tsta;
  if (id === "") {
    return res.json({ message: "value is undefined" }).status(401);
  } else {
    return true;
  }
}
