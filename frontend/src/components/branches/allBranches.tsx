import { useEffect, useState } from "react";
import branch from "../../interfaces/branch";
import DisplayBranches from "./displayBranches";
import port from "../../utils/port";
import axios from "axios";

function AllBranches() {
  const [display,setDisplay] = useState<boolean>(false);
  const [branches,setBranches] = useState<branch[]>([]);
  // fetch branches
  const getBranches = async () => {
  try {
  const response = await axios.get(`http://localhost:${port}/branch/get_all`);
  setBranches(response.data.branches);  
  } catch (error) {
  console.log(error);
  setBranches([]);
  }
  }
  useEffect(() => {
    getBranches();
  },[]);

  return (
    <div>
    <div className="mb-8">
    <button className="py-2 px-4 capitalize bg-green-700 mr-6 
    rounded-md text-white duration-300 hover:bg-green-800" onClick={(e) => setDisplay(true)}>
    get all branches
    </button>
    </div>
    {display &&
    <div>
    {!branches.length ? 
    <div className="text-xl py-2 px-3 bg-red-200 rounded-md text-red-600">
    There is no branch
    </div> : 
    <DisplayBranches branches={branches}/>}
    <div className="flex justify-center mt-6">
    <button onClick={(e) => setDisplay(false)} className="py-2 px-4 capitalize bg-gray-300 rounded-md
    duration-300 hover:bg-gray-400">
    cancel
    </button>
    </div>
    </div>
    }
    </div>
  )
}

export default AllBranches