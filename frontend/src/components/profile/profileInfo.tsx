import employee from '../../interfaces/employee';
import host from '../../utils/host';

function ProfileInfo({ userInfo }: { userInfo: employee }) {

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-8 bg-gray-200 p-8 rounded-lg">
      <div className="py-6 px-8 border border-solid border-gray-400 bg-white rounded-lg">
        <img
          src={userInfo.image_url ? `${host}/images/${userInfo.image_url}` : ''}
          alt="avatar"
          className="bg-gray-600 rounded-full w-[100px] h-[100px] mb-2 mx-auto
      flex justify-center items-center text-white capitalize"
        />
        <div className="capitalize md:text-xl font-semibold mb-4 text-center">
          {userInfo.firstname} {userInfo.lastname}
        </div>
        <div className="flex flex-col">
          <span className="capitalize">email address :</span>
          <span className="text-blue-800 cursor-pointer">{userInfo.email}</span>
        </div>
      </div>
      <div className="py-6 px-8 border border-solid border-gray-400 bg-white rounded-lg flex flex-col gap-3">
        <div className="text-[20px] capitalize mb-2 font-[300]">
          personal information
        </div>
        <div>
          <span className="text-[18xp] capitalize font-semibold mr-2">
            firstname :
          </span>
          <span className="text-blue-800 capitalize">{userInfo.firstname}</span>
        </div>
        <div>
          <span className="text-[18xp] capitalize font-semibold mr-2">
            lastname :
          </span>
          <span className="text-blue-800 capitalize">{userInfo.lastname}</span>
        </div>
        <div>
          <span className="text-[18xp] capitalize font-semibold mr-2">
            sex :
          </span>
          <span className="text-blue-800 capitalize">{userInfo.sex}</span>
        </div>
        <div>
          <span className="text-[18xp] capitalize font-semibold mr-2">
            birthdate :
          </span>
          <span className="text-blue-800 capitalize">{userInfo.birthday}</span>
        </div>
      </div>
      <div className="py-6 px-8 border border-solid border-gray-400 bg-white rounded-lg flex flex-col gap-3">
        <div className="text-[20px] capitalize mb-2 font-[300]">
          work information
        </div>
        <div>
          <span className="text-[18xp] capitalize font-semibold mr-2">
            ID :
          </span>
          <span className="text-blue-800 capitalize">{userInfo.id}</span>
        </div>
        <div>
          <span className="text-[18xp] capitalize font-semibold mr-2">
            branch ID :
          </span>
          <span className="text-blue-800 capitalize">{userInfo.branch_id}</span>
        </div>
        <div>
          <span className="text-[18xp] capitalize font-semibold mr-2">
            manager ID :
          </span>
          <span className="text-blue-800">
            {userInfo.super_id ? userInfo.super_id : `don 't have a manager`}
          </span>
        </div>
        <div>
          <span className="text-[18xp] capitalize font-semibold mr-2">
            role ID :
          </span>
          <span className="text-blue-800 capitalize">{userInfo.role_id}</span>
        </div>
        <div>
          <span className="text-[18xp] capitalize font-semibold mr-2">
            start at :
          </span>
          <span className="text-blue-800 capitalize">{userInfo.start_day}</span>
        </div>
        <div>
          <span className="text-[18xp] capitalize font-semibold mr-2">
            salary :
          </span>
          <span className="text-blue-800 capitalize">{userInfo.salary} DA</span>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;
