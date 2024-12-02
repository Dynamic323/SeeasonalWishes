/* eslint-disable react/prop-types */
import { RxEyeOpen } from "react-icons/rx";
export default function Gtemplate({ title = "", body ="", image="/vite.svg" }) {
    return (
        <>
            <div className="w-full mg:w-1/2 lg:w-1/3 p-2">
                <div className="card w-full bg-base-100 shadow-xl  image-full">
                    <figure><img src={image} alt="Shoes" /></figure>
                    <div className="card-body py-3">
                        <h2 className="card-title">{title} </h2>
                        <p>{body}</p>
                        <div className="card-actions justify-between">
                            <button className="btn btn-primary flex items-center"> <RxEyeOpen /> Preview </button> <button className="btn btn-secondary">Use Template</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}