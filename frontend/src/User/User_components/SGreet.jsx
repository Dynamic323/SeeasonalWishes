/* eslint-disable react/prop-types */
import { BsEnvelopePlusFill } from "react-icons/bs";
export default function  SGreet({ status=false, title }){
    return (
        <>
            <div className="sec p-2 ">
                <div className="card bg-base-300  rounded-lg p-3 flex-row flex items-center content-start">
                    <BsEnvelopePlusFill className="w-5 h-5 text-primary " />
                    <h6 className="title ms-2">
                        {title}
                    </h6>
                    {status == true ? <>
                        <div className="badge badge-success gap-0 ms-auto text-white">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                          Delivered
                        </div>
                    </> : <>
                    
                        <div className="badge badge-info gap-0 ms-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        pending
                    </div>
                    </>}
                </div>
            </div>
        </>
    );
}