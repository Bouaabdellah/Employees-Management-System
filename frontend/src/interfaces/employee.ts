import { Url } from "url";

type gender = 'M' | 'F';
interface employee{
  id : number;
  firstname : string;
  lastname : string;
  sex : gender;
  birthday : string;
  start_day : string;
  email : string;
  salary : number;
  super_id : number;
  branch_id : number;
  role_id : number;
  image_url : Url;
}

export default employee;