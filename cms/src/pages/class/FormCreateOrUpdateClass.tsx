import React, {Fragment, useEffect, useRef, useState} from "react";
import {Dialog, Transition} from '@headlessui/react';
import {CLASS_SERVICE, SCHOOL_SERVICE, USER_SERVICE} from "../../services/api.service.ts";
import {INIT_PAGING} from "../../services/constant.ts";


const units = [
    {
        name: "Khối A",
        id: "a"
    },
    {
        name: "Khối B",
        id: "b"
    },
    {
        name: "Khối C",
        id: "c"
    },
]
// @ts-ignore
const FormCreateOrUpdateClass: React.FC = ({open, setOpen, classUpdate}) => {

    const cancelButtonRef = useRef(null)
    const [dataList, setDataList] = useState([]);
    const [selectedOption, setSelectedOption] = useState<string>('0');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const [selectedOptionUni, setSelectedOptionUni] = useState<string>('a');
    const [isOptionSelectedUni, setIsOptionSelectedUni] = useState<boolean>(false);

    const [paging, setPaging] = useState(INIT_PAGING);
    // const [validated, setValidated] = useState(false);

    const [name, setName] = useState("");


    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    const changeUni = () => {
        setIsOptionSelectedUni(true);
    };

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let data = {
            name : name,
            school_id: selectedOption,
            status: 1,
            unit: selectedOptionUni
        }
        let response = null;
        console.log('=============== classUpdate: ', classUpdate);
        if (classUpdate || classUpdate != null) {
            response = await CLASS_SERVICE.update(classUpdate.id, data);
        }else {
            response = await CLASS_SERVICE.store(data);
        }

        console.log('============ response: ', response);
        if (response.status === 'fail') {
            alert("Có lỗi xẩy ra, xin vui lòng thử lại");
        } else {
            document.getElementById("formData").reset();
            setOpen(false);
        }
    };

    useEffect(() => {
        getSchoolLists({...paging}).then(r =>{});

        console.log("=============== school : ", classUpdate)
        if(classUpdate) {
            setName(classUpdate.name);
            setSelectedOption(classUpdate.school_id);
            setSelectedOptionUni(classUpdate.unit);
        }
    }, [open]);

    const getSchoolLists = async (filters: any) => {
        const response: any = await SCHOOL_SERVICE.getList(filters);
        if (response?.status == 'success') {
            setDataList(response.data.result || []);
        }
    }

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
                                                Thêm mới lớp học
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <form onSubmit={handleSubmit} id="formData">
                                                    <div className="mb-4.5">
                                                        <label
                                                            className="mb-2.5 block text-black dark:text-white">
                                                            Tên lớp
                                                        </label>
                                                        <input
                                                            type="name"
                                                            value={name}
                                                            onChange={handleNameChange}
                                                            placeholder="Tên lớp"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="mb-4.5">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            {' '}
                                                            Chọn trường{' '}
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
                                                                {dataList.map((item, key) => (
                                                                    <option value={item.id} key={key}
                                                                            className="text-body dark:text-bodydark">
                                                                        {item.name}
                                                                    </option>
                                                                ))}
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
                                                    <div className="mb-4.5">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            {' '}
                                                            Chọn khối{' '}
                                                        </label>

                                                        <div
                                                            className="relative z-20 bg-transparent dark:bg-form-input">
                                                            <select
                                                                value={selectedOptionUni}
                                                                onChange={(e) => {
                                                                    setSelectedOptionUni(e.target.value);
                                                                    changeUni();
                                                                }}
                                                                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary ${
                                                                    isOptionSelectedUni ? 'text-black dark:text-white' : ''
                                                                }`}
                                                            >
                                                                {units.map((item, key) => (
                                                                    <option value={item.id} key={key}
                                                                            className="text-body dark:text-bodydark">
                                                                        {item.name}
                                                                    </option>
                                                                ))}
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
                                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
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

export default FormCreateOrUpdateClass;
