
type gender = 'M' | 'F';
interface employee{
  id : number;
  firstname : string;
  lastname : string;
  sex : gender;
  birthday : string;
  start_day : string;
  email : string;
  password : string;
  salary : number;
  super_id : number;
  branch_id : number;
  role_id : number;
  image_url : string | null;
}
export const userInfoInitialze : employee = {
  id : 0,
  firstname : '',
  lastname : '',
  sex : 'M',
  email : '',
  password : '',
  birthday : '',
  start_day : '',
  salary : 0,
  super_id : 0,
  role_id : 0,
  branch_id : 0,
  image_url : null
};

export default employee;