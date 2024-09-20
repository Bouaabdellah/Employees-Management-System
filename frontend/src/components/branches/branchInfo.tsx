import branch from "../../interfaces/branch";

function BranchInfo({branchInfo} : {branchInfo : branch}) {

  return (
    <div className="bg-gray-200 p-8 rounded-lg">
    <div className="py-6 px-8 border border-solid border-gray-400 bg-white rounded-lg 
    flex flex-col gap-2">
    <div>
    <span className="text-[18xp] capitalize font-semibold mr-2">ID :</span>
    <span className="text-blue-800 capitalize">{branchInfo.branch_id}</span>
    </div>
    <div>
    <span className="text-[18xp] capitalize font-semibold mr-2">name :</span>
    <span className="text-blue-800 capitalize">{branchInfo.branch_name}</span>
    </div>
    <div>
    <span className="text-[18xp] capitalize font-semibold mr-2">manager :</span>
    <span className="text-blue-800">
    {branchInfo.mgr_id ? branchInfo.mgr_id : `don 't have a manager`}
    </span>
    </div>
    <div>
    <span className="text-[18xp] capitalize font-semibold mr-2">launch date :</span>
    <span className="text-blue-800 capitalize">{branchInfo.start_day}</span>
    </div>
    </div>
    </div>
  )
}

export default BranchInfo;