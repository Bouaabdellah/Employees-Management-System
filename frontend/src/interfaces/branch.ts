interface branch{
   branch_id : number;
   branch_name : string;
   mgr_id : number;
   start_day : string;
};
export const branchInit : branch = {
   branch_id : 0,
   branch_name : '',
   mgr_id : 0,
   start_day : ''
}
export interface branchInfo{
   name : string;
   id : number;
}
export const branchInfoInit : branchInfo = {
   name : '',
   id : 0
}

export default branch;