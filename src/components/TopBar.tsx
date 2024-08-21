import {useState} from "react";

export default function TopBar() {
    const [openWalletConnect, setOpenWalletConnect] = useState(false)

    return (
        <nav className="bg-white w-full">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="https://www.beincom.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://www.beincom.com/wp-content/uploads/2024/06/BIC-logo-300x70.webp" className="h-8"
                         alt="Flowbite Logo"/>
                </a>
                <div className="w-full md:block md:w-auto" id="navbar-default">
                    <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>


                            <button id="dropdownDividerButton" data-dropdown-toggle="dropdownDivider"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    onClick={() => setOpenWalletConnect(!openWalletConnect)}
                                    type="button">Wallet connect <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true"
                                                                        xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                        viewBox="0 0 10 6">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="m1 1 4 4 4-4"/>
                            </svg>
                            </button>

                            <div id="dropdownDivider"
                                 className={"z-10 " + (openWalletConnect || 'hidden') + " font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                                    aria-labelledby="dropdownDividerButton">
                                    <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Metamask</a>
                                    </li>
                                </ul>
                                <div className="py-2">
                                    <a href="#"
                                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Wallet connect</a>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )

    // return (
    //     <nav className="bg-white border-gray-200 dark:bg-gray-900">
    //         <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    //             <a href="https://flowbite.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
    //                 <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo"/>
    //                 <span
    //                     className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Flowbite</span>
    //             </a>
    //             <div className="w-full md:block md:w-auto" id="navbar-default">
    //                 <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    //                     <li>
    //                         <a href="#"
    //                            className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
    //                            aria-current="page">Home</a>
    //                     </li>
    //                     <li>
    //                         <a href="#"
    //                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</a>
    //                     </li>
    //                     <li>
    //                         <a href="#"
    //                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Services</a>
    //                     </li>
    //                     <li>
    //                         <a href="#"
    //                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Pricing</a>
    //                     </li>
    //                     <li>
    //                         <a href="#"
    //                            className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact</a>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </div>
    //     </nav>
    // )
}
