import { InputErrorType } from "../dtos/types";

export function InputError({ error, name }: InputErrorType) {
    if (!error) return;
  return (
      <span className="font-medium">{name}</span>
  )
 }



