import { useState } from "react";
import employee from "../interfaces/employee";

function EditeProfile({employee} : {employee : employee}) {
  const birthday : string[] = employee.birthday.split('/').map((ele) => ele = ele.padStart(2, '0'));
  const birthdate:string = `${birthday[2]}-${birthday[0]}-${birthday[1]}`;
  const [userInfo,setUserInfo] = useState<employee>(employee);

  return (
    <div className="w-fit mx-auto mt-8">
       <table>
        <colgroup>
        <col span={1} className="w-[50px]"/>
        <col span={1} className="w-[120px]"/>
        </colgroup>
        <tbody>
        <tr>
        <td className="py-2">
        <label htmlFor="firstname" className="text-[18px] mr-4">firstname</label>
        </td>
        <td className="py-2">
        <input type="text" id="firstname" className="bg-gray-200 py-2 px-4 rounded-md" 
        defaultValue={employee?.firstname} onChange={(e) => setUserInfo({...userInfo,firstname : e.target.value})}/>
        </td>
        </tr>
        <tr>
        <td className="py-2">
        <label htmlFor="lastname" className="text-[18px] mr-4">lastname</label>
        </td>
        <td className="py-2">
        <input type="text" id="lastname" className="bg-gray-200 py-2 px-4 rounded-md" 
        defaultValue={employee?.lastname} onChange={(e) => setUserInfo({...userInfo,lastname : e.target.value})}/>
        </td>
        </tr>
        <tr>
        <td className="py-2">
        <label htmlFor="sex" className="text-[18px] mr-4">sex</label>
        </td>
        <td className="py-2">
        <select name="sex" id="sex" className="bg-gray-200 py-2 px-4 rounded-md" 
        defaultValue={employee?.sex} onChange={(e) => setUserInfo({...userInfo,sex : e.target.value === "M" ? 'M' : 'F'})}>
        <option value="M">M</option>
        <option value="F">F</option>
        </select>
        </td>
        </tr>
        <tr>
        <td className="py-2">
        <label htmlFor="birthdate" className="text-[18px] mr-4">birthdate</label>
        </td>
        <td className="py-2">
        <input type="date" id="birthdate" className="bg-gray-200 py-2 px-4 rounded-md" 
        defaultValue={birthdate ? birthdate : '2005-09-29'} onChange={(e) => setUserInfo({...userInfo,birthday : e.target.value})}/>
        </td>
        </tr>
        <tr>
        <td className="py-2">
        <label htmlFor="email" className="text-[18px] mr-4">email</label>
        </td>
        <td className="py-2">
        <input type="email" id="email" className="bg-gray-200 py-2 px-4 rounded-md" 
        defaultValue={employee?.email} onChange={(e) => setUserInfo({...userInfo,email : e.target.value})}/>
        </td>
        </tr>
        <tr>
        <td className="py-2">
        <label htmlFor="pwd" className="text-[18px] mr-4">password</label>
        </td>
        <td className="py-2">
        <input type="password" id="pwd" className="bg-gray-200 py-2 px-4 rounded-md"
        onChange={(e) => setUserInfo({...userInfo,password : e.target.value})}/>
        </td>
        </tr>    
        </tbody>
       </table>
        <div className="flex gap-8 justify-center mt-6">
        <button className="py-2 px-4 capitalize bg-green-700 mr-6 rounded-md text-white
        duration-300 hover:bg-green-800">
        save
        </button>
        <button className="py-2 px-4 capitalize bg-gray-300 rounded-md
        duration-300 hover:bg-gray-400">
        cancel
        </button>    
        </div>
    </div>
  )
}

export default EditeProfile;