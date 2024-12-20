import { useEffect, useState, useRef } from 'react';
import employee from '../../interfaces/employee';
import { inputFormat } from '../../utils/date';
import axios from 'axios';
import validatePersonalInfo from '../../config/validateEmployeeInfo';
import checkAllTrue from '../../config/checkAllTrue';
import personalInfo, { validationInitialze } from '../../interfaces/validation';
import host from '../../utils/host';

function EditeProfile({ employee }: { employee: employee }) {
  const [edit, setEdit] = useState(false);
  const birthdate = inputFormat(employee.birthday);
  const [userInfo, setUserInfo] = useState<employee>(employee);
  useEffect(() => {
    setUserInfo(employee);
  }, [employee]);
  const referance = useRef<HTMLInputElement>(null); // we will use it to get the value of password
  // that is filled by default from the browser
  useEffect(() => {
    if (referance.current && !employee.password)
      employee.password = referance.current.value;
  }, [userInfo.password]);
  const [file, setFile] = useState<File | null>(null);
  const [validation, setValidation] =
    useState<personalInfo>(validationInitialze);
  const validateInfo = () => {
    const {
      firstnameValidation,
      lastnameValidation,
      birthdateValidation,
      emailValidation,
      pwdValidation,
      imageValidation,
    } = validatePersonalInfo(userInfo);
    setValidation({
      ...validation,
      firstname: firstnameValidation,
      lastname: lastnameValidation,
      birthday: birthdateValidation,
      email: emailValidation,
      password: pwdValidation,
      image: imageValidation,
    });
    return {
      firstnameValidation,
      lastnameValidation,
      birthdateValidation,
      emailValidation,
      pwdValidation,
      imageValidation,
    };
  };
  const checkChanging = (validations: {}): boolean => {
    const validInfo = checkAllTrue(validations);
    return (
      validInfo &&
      (userInfo.firstname !== employee.firstname ||
        userInfo.lastname !== employee.lastname ||
        userInfo.sex !== employee.sex ||
        userInfo.birthday !== employee.birthday ||
        userInfo.email !== employee.email ||
        userInfo.image_url !== employee.image_url ||
        employee.password !== userInfo.password)
    );
  };
  const sendData = async () => {
    try {
      if (userInfo.birthday === employee.birthday)
        userInfo.birthday = inputFormat(userInfo.birthday);
      const formData = new FormData();
      formData.append('firstname', userInfo.firstname);
      formData.append('lastname', userInfo.lastname);
      formData.append('sex', userInfo.sex);
      formData.append('birthdate', userInfo.birthday);
      formData.append('email', userInfo.email);
      formData.append('password', userInfo.password);
      formData.append('id', userInfo.id.toString());
      if (file) formData.append('file', file);
      await axios.put(`${host}/employees/modify`, formData);
    } catch (error) {
      console.log(error);
    }
  };
  const putData = async () => {
    const validations = validateInfo();
    if (checkChanging(validations)) {
      setEdit(false);
      await sendData();
    }
  };

  return (
    <div className="w-fit mx-auto mt-8">
      <div className="w-fit mx-auto mt-6 mb-2">
        <button
          className="capitalize py-2 px-4 bg-gray-300 rounded-md duration-300 hover:bg-gray-400"
          onClick={() => setEdit(!edit)}
        >
          edit profile
        </button>
      </div>
      {edit && (
        <form
          onSubmit={(e) => e.preventDefault()}
          method="PUT"
          encType="multipart/form-data"
          action="/employees/modify"
        >
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
                    defaultValue={employee?.firstname}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, firstname: e.target.value })
                    }
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
                    defaultValue={employee?.lastname}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, lastname: e.target.value })
                    }
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
                    defaultValue={employee?.sex}
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
                    defaultValue={birthdate ? birthdate : '2005-09-29'}
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
                    defaultValue={employee?.email}
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, email: e.target.value })
                    }
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
                    ref={referance}
                  />
                </td>
              </tr>
              <tr>
                <td className="py-2">
                  <label
                    htmlFor="image"
                    className={`text-[18px] mr-4 ${
                      !validation.image && 'text-red-600'
                    }`}
                  >
                    image
                  </label>
                </td>
                <td className="py-2">
                  <input
                    type="file"
                    id="image"
                    className="bg-gray-200 py-2 px-4 rounded-md"
                    onChange={(e) => {
                      setFile(e.target.files ? e.target.files[0] : null);
                      setUserInfo({ ...userInfo, image_url: e.target.value });
                    }}
                    autoComplete="off"
                    placeholder="image..."
                    name="file"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex gap-8 justify-center mt-6">
            <button
              className="py-2 px-4 capitalize bg-green-700 mr-6 rounded-md text-white
        duration-300 hover:bg-green-800"
              type="submit"
              onClick={() => putData()}
            >
              save
            </button>
            <button
              className="py-2 px-4 capitalize bg-gray-300 rounded-md
        duration-300 hover:bg-gray-400"
              onClick={() => setEdit(!edit)}
            >
              cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default EditeProfile;
