import React, {Fragment, useRef, useState} from "react";
import {Dialog, Transition} from '@headlessui/react';
import {USER_SERVICE} from "../../services/api.service.ts";


// @ts-ignore
const FormCreateOrUpdateUser: React.FC = ({open, setOpen}) => {

    const cancelButtonRef = useRef(null)
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };
    const handleUsernameChange = (e: any) => {
        setUsername(e.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let data = {
            name: name,
            email: email,
            status: 1,
            password: password,
            username: username,
            type: selectedOption
        }
        console.log('--------------- data', data);

        const response = await USER_SERVICE.store(data);
        console.log('============ response: ', response);
        if (response.status === 'fail') {
            alert("Có lỗi xẩy ra, xin vui lòng thử lại");
        } else {
            setOpen(false);
        }
    };

    return (
        <Transition.Root show={open} as={Fragment} appear>
            <Dialog as="div" className="relative z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef}
                    onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div
                        className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel
                                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-lg">
                                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div className="">
                                        <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <Dialog.Title as="h3"
                                                          className="text-base font-semibold leading-6 text-gray-900">
                                                Thêm mới thành viên
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-4.5">
                                                        <label
                                                            className="mb-2.5 block text-black dark:text-white">
                                                            Họ tên
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={name}
                                                            onChange={handleNameChange}
                                                            placeholder="Họ tên"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="mb-4.5">
                                                        <label
                                                            className="mb-2.5 block text-black dark:text-white">
                                                            Username
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={username}
                                                            onChange={handleUsernameChange}
                                                            placeholder="Username"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="mb-4.5">
                                                        <label
                                                            className="mb-2.5 block text-black dark:text-white">
                                                            Email
                                                        </label>
                                                        <input
                                                            type="email"
                                                            value={email}
                                                            onChange={handleEmailChange}
                                                            placeholder="Địa chỉ email"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="mb-4.5">
                                                        <label
                                                            className="mb-2.5 block text-black dark:text-white">
                                                            Mật khẩu
                                                        </label>
                                                        <input
                                                            type="password"
                                                            value={password}
                                                            secureTextEntry={true}
                                                            onChange={handlePasswordChange}
                                                            placeholder="******"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="mb-4.5">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            {' '}
                                                            Cấp bật{' '}
                                                        </label>

                                                        <div
                                                            className="relative z-20 bg-transparent dark:bg-form-input">
                                                            <select
                                                                value={selectedOption}
                                                                onChange={(e) => {
                                                                    setSelectedOption(e.target.value);
                                                                    changeTextColor();
                                                                }}
                                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                                                                    isOptionSelected ? 'text-black dark:text-white' : ''
                                                                }`}
                                                            >
                                                                <option value="student" disabled
                                                                        className="text-body dark:text-bodydark">
                                                                    Chọn cấp bậc
                                                                </option>
                                                                <option value="student"
                                                                        className="text-body dark:text-bodydark">
                                                                    Học sinh
                                                                </option>
                                                                <option value="teacher"
                                                                        className="text-body dark:text-bodydark">
                                                                    Giáo viên
                                                                </option>
                                                                <option value="rector"
                                                                        className="text-body dark:text-bodydark">
                                                                    Hiệu trưởng
                                                                </option>
                                                            </select>

                                                            <span
                                                                className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                                                                  <svg
                                                                      className="fill-current"
                                                                      width="24"
                                                                      height="24"
                                                                      viewBox="0 0 24 24"
                                                                      fill="none"
                                                                      xmlns="http://www.w3.org/2000/svg"
                                                                  >
                                                                    <g opacity="0.8">
                                                                      <path
                                                                          fillRule="evenodd"
                                                                          clipRule="evenodd"
                                                                          d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                                                                          fill=""
                                                                      ></path>
                                                                    </g>
                                                                  </svg>
                                                                </span>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                        <button
                                                            type="submit"
                                                            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                                                        >
                                                            Thêm mới
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                                            onClick={() => setOpen(false)}
                                                            ref={cancelButtonRef}
                                                        >
                                                            Huỷ bỏ
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default FormCreateOrUpdateUser;
