import { useEffect, useState } from 'react';
import branch, { branchInfo, branchInfoInit } from '../../interfaces/branch';
import axios from 'axios';
import DisplayBranches from './displayBranches';
import host from '../../utils/host';

function SearchBranch() {
  const [branchInfo, setBranchInfo] = useState<branchInfo>(branchInfoInit);
  const [branches, setBranches] = useState<branch[]>([]);
  const [search, setSearch] = useState<boolean>(false);
  // fetch branches
  const getBranches = async () => {
    try {
      const response = await axios.get(`${host}/branch/get_branch`, {
        params: {
          name: branchInfo.name,
          id: branchInfo.id === 0 ? null : branchInfo.id,
        },
      });
      if (response.data.branches) setBranches(response.data.branches);
      else setBranches([]);
    } catch (error) {
      console.log(error);
      setBranches([]);
    }
  };
  useEffect(() => {
    if (branchInfo.name !== '' || branchInfo.id !== 0) getBranches();
    else setBranches([]);
  }, [branchInfo]);

  return (
    <div>
      <div className="mb-8">
        <button
          className="py-2 px-4 capitalize bg-green-700 mr-6 
    rounded-md text-white duration-300 hover:bg-green-800"
          onClick={(e) => setSearch(true)}
        >
          search branch
        </button>
      </div>
      {search && (
        <div>
          <div className="flex flex-wrap gap-6 mb-6">
            <input
              type="text"
              placeholder="name..."
              className="bg-gray-200 py-2 px-4 rounded-md"
              onChange={(e) =>
                setBranchInfo({ ...branchInfo, name: e.target.value })
              }
            />
            <input
              type="number"
              placeholder="id..."
              className="bg-gray-200 py-2 px-4 rounded-md"
              onChange={(e) =>
                setBranchInfo({ ...branchInfo, id: +e.target.value })
              }
            />
          </div>
          {!branches.length ? (
            <div className="text-xl py-2 px-3 bg-red-200 rounded-md text-red-600">
              There is no branches
            </div>
          ) : (
            <div>
              <DisplayBranches branches={branches} />
            </div>
          )}
          <div className="flex justify-center mt-6">
            <button
              onClick={(e) => {
                setSearch(false);
                setBranches([]);
              }}
              className="py-2 px-4 capitalize bg-gray-300 rounded-md
    duration-300 hover:bg-gray-400"
            >
              cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchBranch;
