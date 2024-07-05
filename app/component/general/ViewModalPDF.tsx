import React, { Fragment, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

const ViewModalPDF: React.FC<ModalProps> = ({ isOpen, onClose, children, title }) => {
  return (
    <Fragment>
      {isOpen ? (
        
          <div className="fixed z-10 inset-0 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div className="flex items-center justify-center min-h-screen">
              <div className="relative p-4 h-full" >
              <div className="relative rounded-lg shadow bg-gray-50 flex flex-col h-full" style={{ width: 'calc(100vh / 1.414)', maxWidth: '100%' }}>
              
                <div className="flex items-center justify-between p-4 border-b rounded-t">
                    <div className="flex ">
                        <div className="ps-3">
                            <div className="text-base font-semibold">Aslam Thariq</div>
                            <div className="font-normal text-gray-500">aslamthariq01@gmail.com</div>
                        </div> 
                    </div>
                    <div className="text-gray-400 bg-transparent  text-sm  ms-auto inline-flex justify-center items-center">
                        <a href="/absensi/aslam.pdf" download className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 bg-gray-50 rounded-lg " type="button">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z"/>
                              <path d="M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
                            </svg>
                            <span className="sr-only">Download</span>
                        </a>
                        <a href="/absensi/aslam.pdf" className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 bg-gray-50 rounded-lg " type="button">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 4H4m0 0v4m0-4 5 5m7-5h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5m7 5h4m0 0v-4m0 4-5-5"/>
                            </svg>
                            <span className="sr-only">Expand</span>
                            </a>
                        <button 
                        type="button" 
                        onClick={onClose}
                        className="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 bg-gray-50 rounded-lg" data-modal-toggle="pemberkasan-modal">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                </div>


              <div>{children}</div>

            <div className="row-span-2 col-span-2 grid-cols-2 flex justify-between items-center p-2 gap-2" >
                <span className="flex text-xs font-normal text-gray-500 dark:text-gray-400 gap-2">
                    12 Pages 
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                       <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                    </svg>
                    18 MB 
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="self-center" width="3" height="4" viewBox="0 0 3 4" fill="none">
                       <circle cx="1.5" cy="2" r="1.5" fill="#6B7280"/>
                    </svg>
                    PDF
                 </span>         
            </div>
              
            </div>
            </div>
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default ViewModalPDF;
