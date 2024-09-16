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

export default branch;