import { useState } from 'react';
import employee, { userInfoInitialze } from '../../interfaces/employee';
import axios from 'axios';
import branch from '../../interfaces/branch';
import role from '../../interfaces/role';
import validatePersonalInfo from '../../config/validateEmployeeInfo';
import personalInfo, { validationInitialze } from '../../interfaces/validation';
import checkAllTrue from '../../config/checkAllTrue';
import { validateStartDate } from '../../config/validation';
import host from '../../utils/host';
import { useSelector } from 'react-redux';
import rootState from '../../interfaces/rootState';

function AddEmployee() {
  // stats
  const { managers, branches, roles } = useSelector(
    (state: rootState) => state.choises,
  );
  const [userInfo, setUserInfo] = useState<employee>({
    ...userInfoInitialze,
    super_id: managers[0].super_id,
    branch_id: branches[0].branch_id,
    role_id: roles[0].role_id,
  });
  const [validation, setValidation] =
    useState<personalInfo>(validationInitialze);
  const [workInfo, setWorkInfo] = useState({
    startDate: true,
    salary: true,
  });
  const [addEmp, setAddEmp] = useState<boolean>(false);
  // add new employee
  const addEmployee = async () => {
    try {
      axios.post(`${host}/employees/add_employee`, {
        firstname: userInfo.firstname,
        lastname: userInfo.lastname,
        sex: userInfo.sex,
        birthDay: userInfo.birthday,
        email: userInfo.email,
        password: userInfo.password,
        mgrID: userInfo.super_id ? userInfo.super_id : null,
        branchID: userInfo.branch_id,
        roleID: userInfo.role_id,
        startDay: userInfo.start_day,
        salary: userInfo.salary,
        is_manager: userInfo.is_manager,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const validateData = () => {
    const {
      firstnameValidation,
      lastnameValidation,
      birthdateValidation,
      emailValidation,
      pwdValidation,
    } = validatePersonalInfo(userInfo);
    setValidation({
      ...validation,
      firstname: firstnameValidation,
      lastname: lastnameValidation,
      birthday: birthdateValidation,
      email: emailValidation,
      password: pwdValidation,
    });
    return {
      firstnameValidation,
      lastnameValidation,
      birthdateValidation,
      emailValidation,
      pwdValidation,
    };
  };
  const confirmValidation = (validations: {}): boolean => {
    const allValid: boolean = checkAllTrue(validations);
    const validateStartDay: boolean = validateStartDate(userInfo.start_day);
    const validateSalary: boolean = userInfo.salary > 0;
    setWorkInfo({
      ...workInfo,
      startDate: validateStartDay,
      salary: validateSalary,
    });
    return allValid && validateStartDay && validateSalary;
  };
  const checkData = async () => {
    const validations = validateData();
    if (confirmValidation(validations)) {
      await addEmployee();
      setAddEmp(false);
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={(e) => setAddEmp(true)}
          className="py-2 px-4 capitalize bg-green-700 mr-6 
        rounded-md text-white duration-300 hover:bg-green-800"
        >
          new employee
        </button>
      </div>
      {addEmp && (
        <div className="w-fit mx-auto mt-10">
          <div className="flex flex-wrap gap-6 md:gap-24">
            <div>
              <div className="capitalize text-xl font-semibold mb-4">
                personal information
              </div>
              <table>
                <colgroup>
                  <col span={1} className="w-[50px]" />
                  <col span={1} className="w-[120px]" />
                </colgroup>
                <tbody>
                  <tr>
                    <td className="py-2">
                      <label
                        htmlFor="firstname"
                        className={`text-[18px] mr-4 ${
                          !validation.firstname && 'text-red-600'
                        }`}
                      >
                        firstname
                      </label>
                    </td>
                    <td className="py-2">
                      <input
                        type="text"
                        id="firstname"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            firstname: e.target.value,
                          })
                        }
                        placeholder="firstname..."
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <label
                        htmlFor="lastname"
                        className={`text-[18px] mr-4 ${
                          !validation.lastname && 'text-red-600'
                        }`}
                      >
                        lastname
                      </label>
                    </td>
                    <td className="py-2">
                      <input
                        type="text"
                        id="lastname"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, lastname: e.target.value })
                        }
                        placeholder="lastname..."
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <label htmlFor="sex" className="text-[18px] mr-4">
                        sex
                      </label>
                    </td>
                    <td className="py-2">
                      <select
                        name="sex"
                        id="sex"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            sex: e.target.value === 'M' ? 'M' : 'F',
                          })
                        }
                      >
                        <option value="M">M</option>
                        <option value="F">F</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <label
                        htmlFor="birthdate"
                        className={`text-[18px] mr-4 ${
                          !validation.birthday && 'text-red-600'
                        }`}
                      >
                        birthdate
                      </label>
                    </td>
                    <td className="py-2">
                      <input
                        type="date"
                        id="birthdate"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, birthday: e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <label
                        htmlFor="email"
                        className={`text-[18px] mr-4 ${
                          !validation.email && 'text-red-600'
                        }`}
                      >
                        email
                      </label>
                    </td>
                    <td className="py-2">
                      <input
                        type="email"
                        id="email"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, email: e.target.value })
                        }
                        autoComplete="off"
                        placeholder="email..."
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <label
                        htmlFor="pwd"
                        className={`text-[18px] mr-4 ${
                          !validation.password && 'text-red-600'
                        }`}
                      >
                        password
                      </label>
                    </td>
                    <td className="py-2">
                      <input
                        type="password"
                        id="pwd"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, password: e.target.value })
                        }
                        autoComplete="off"
                        placeholder="password..."
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div>
              <div className="capitalize text-xl font-semibold mb-4">
                work information
              </div>
              <table>
                <colgroup>
                  <col span={1} className="w-[100px]" />
                  <col span={1} className="w-[120px]" />
                </colgroup>
                <tbody>
                  <tr>
                    <td className="py-2">
                      <label htmlFor="branch" className={`text-[18px] mr-4`}>
                        branch
                      </label>
                    </td>
                    <td className="py-2">
                      <select
                        id="branch"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            branch_id: +e.target.value,
                          })
                        }
                      >
                        {branches.map((ele: branch) => {
                          return (
                            <option value={ele.branch_id} key={ele.branch_id}>
                              {ele.branch_name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <label htmlFor="role" className={`text-[18px] mr-4`}>
                        role
                      </label>
                    </td>
                    <td className="py-2">
                      <select
                        id="role"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, role_id: +e.target.value })
                        }
                      >
                        {roles.map((ele: role) => {
                          return (
                            <option value={ele.role_id} key={ele.role_id}>
                              {ele.role_name}
                            </option>
                          );
                        })}
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <label htmlFor="mgrID" className={`text-[18px] mr-4`}>
                        manager id
                      </label>
                    </td>
                    <td className="py-2">
                      <select
                        id="mgrID"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            super_id: +e.target.value,
                          })
                        }
                      >
                        {managers.map((ele: { super_id: number }) => {
                          return (
                            <option value={ele.super_id} key={ele.super_id}>
                              {ele.super_id}
                            </option>
                          );
                        })}
                        <option value="0">none</option>
                      </select>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <label
                        htmlFor="startDate"
                        className={`text-[18px] mr-4 ${
                          !workInfo.startDate && 'text-red-600'
                        }`}
                      >
                        start date
                      </label>
                    </td>
                    <td className="py-2">
                      <input
                        type="date"
                        id="startDate"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        onChange={(e) =>
                          setUserInfo({
                            ...userInfo,
                            start_day: e.target.value,
                          })
                        }
                      />
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <label
                        htmlFor="salary"
                        className={`text-[18px] mr-4 ${
                          !workInfo.salary && 'text-red-600'
                        }`}
                      >
                        salary
                      </label>
                    </td>
                    <td className="py-2">
                      <input
                        type="number"
                        id="salary"
                        className="bg-gray-200 py-2 px-4 rounded-md"
                        placeholder="algerian dinar AD"
                        onChange={(e) =>
                          setUserInfo({ ...userInfo, salary: +e.target.value })
                        }
                      />
                    </td>
                  </tr>
                  <tr className="py-2">
                    <td>
                      <label
                        htmlFor="is_manager"
                        className={`text-[18px] mr-4`}
                      >
                        is manager
                      </label>
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        id="is_manager"
                        onChange={() =>
                          setUserInfo({
                            ...userInfo,
                            is_manager: !userInfo.is_manager,
                          })
                        }
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex gap-8 justify-center mt-6">
            <button
              className="py-2 px-4 capitalize bg-green-700 mr-6 rounded-md text-white 
        duration-300 hover:bg-green-800"
              onClick={(e) => checkData()}
            >
              add employee
            </button>
            <button
              onClick={(e) => setAddEmp(false)}
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

export default AddEmployee;
