import { EnumType } from "typescript";
import { Url } from "url";

type gender = 'M' | 'F';
interface employee{
  id : number;
  firstname : string;
  lastname : string;
  sex : gender;
  birthday : Date;
  start_day : Date;
  email : string;
  salary : number;
  super_id : number;
  branch_id : number;
  role_id : number;
  image_url : Url;
}

export default employee;