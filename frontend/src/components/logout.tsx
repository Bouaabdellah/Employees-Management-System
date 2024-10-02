

const Logout = ({setLogout} : {setLogout : Function}) => {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full">
    <div className="absolute top-0 left-0 w-full h-full bg-gray-800 opacity-30">
    </div>
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 py-6 px-10 rounded-lg
    bg-white">
    <div className="font-semibold text-[18px]">
    you are sure to logout ?
    </div>
    <div className="flex gap-10 mt-4">
    <button className="px-3 py-2 font-semibold bg-red-600 rounded-md hover:bg-red-700 duration-300
    cursor-pointer text-white">
    confirm
    </button>
    <button className="px-3 py-2 font-semibold bg-gray-300 rounded-md hover:bg-gray-400 duration-300
    cursor-pointer"
    onClick={() => setLogout(false)}>
    cancel
    </button>
    </div>
    </div>
    </div>
  )
}

export default Logout;