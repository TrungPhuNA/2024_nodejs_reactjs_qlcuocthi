import React, {Fragment, useEffect, useRef, useState} from "react";
import {Dialog, Transition} from '@headlessui/react';
import {COMPETITION_SERVICE, USER_SERVICE} from "../../services/api.service.ts";


// @ts-ignore
const FormCreateOrUpdateCompetition: React.FC = ({open, setOpen, competition}) => {

    const cancelButtonRef = useRef(null)
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [isOptionSelected, setIsOptionSelected] = useState<boolean>(false);

    const [name, setName] = useState("");
    const [contents, setContents] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");

    const changeTextColor = () => {
        setIsOptionSelected(true);
    };

    const handleNameChange = (e: any) => {
        setName(e.target.value);
    };
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    };
    const handleContentsChange = (e: any) => {
        setContents(e.target.value);
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        event.stopPropagation();
        let data = {
            name: name,
            status: 1,
            contents: contents,
        }

        console.log('--------------- data', data);

        let response = null;
        if(competition || competition != null) {
            response = await COMPETITION_SERVICE.update(competition.id, data);
        }else {
            response = await COMPETITION_SERVICE.store(data);
        }

        console.log('============ response: ', response);
        if (response.status === 'fail') {
            alert("Có lỗi xẩy ra, xin vui lòng thử lại");
        } else {
            setOpen(false);
        }
    };

    useEffect(() => {
        if(competition) {
            setName(competition.name);
        }
    }, [open]);

    // @ts-ignore
    // @ts-ignore
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
                                                Thêm mới cuộc thi
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-4.5">
                                                        <label
                                                            className="mb-2.5 block text-black dark:text-white">
                                                            Tên cuôc thi
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
                                                            Nội dung cuộc thi
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={contents}
                                                            onChange={handleContentsChange}
                                                            placeholder="Username"
                                                            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                                        />
                                                    </div>
                                                    <div className="mb-4.5">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            {' '}
                                                            Tiêu chí {' '}
                                                        </label>
                                                    </div>
                                                    <div className="mb-4.5">
                                                        <label className="mb-2.5 block text-black dark:text-white">
                                                            {' '}
                                                            Ban dám khảo {' '}
                                                        </label>
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

export default FormCreateOrUpdateCompetition;
