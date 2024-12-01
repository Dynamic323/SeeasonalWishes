import React from "react";

function UserLayout() {
  let user = { name: "long code" };
  user.profile = "/profile/user-1.jpg";
  return (
    <h1> User dahboard</h1>
    // <>
    //   <main
    //     className="app-layout min-w-[100vw] tujo overflow-hidden min-h-[100vh] 
    //             block  md:flex"
    //   >
    //     <AsideBar className={`rounded-0  max-w-[290px] min-w-[290px] `} />
    //     <section
    //       className={`oveflow-x-scroll md:w-[calc(100vw-290px)]  p-0 md:ml-[290px]  tujo-main-view overflow-auto h-[100vh] `}
    //     >
    //       <header className="dbh bg-base-100 rounded-xl  md:top-[10px] z-[102]  top-0 ">
    //         <div className="contentstart flex items-center">
    //           <div className="flex items-center ms-12">
    //             <img
    //               src={user?.profile}
    //               alt=""
    //               className="w-12 h-12 rounded-md"
    //             />
    //             <div className="grid ms-2">
    //               <h6 className="font-bold mb-0">{user.name}</h6>
    //               <div className="badge badge-primary">manager</div>
    //             </div>
    //           </div>
    //         </div>
    //         <div className="contentend flex items-center">
    //           <div className="dropdown dropdown-end dropdown-bottom">
    //             <label
    //               tabIndex={0}
    //               className="m-1 btn online  border-none btn-circle bg-base-100"
    //             >
    //               <Bell />
    //             </label>
    //             <div
    //               tabIndex={0}
    //               className="dropdown-content z-[1]  w-[280px] bg-base-100 shadow-lg  rounded   pb-4 p-0"
    //             >
    //               <div className="notification  bg-primary text-center text-white rounded-t-[inherit] p-3">
    //                 <h6>
    //                   {" "}
    //                   <i className="fad fa-bell" aria-hidden="true"></i>{" "}
    //                   Notfication
    //                 </h6>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </header>
    //       <div className="block mt-24  p-2">
    //         {/* <Outlet /> */}
    //         <RouterProvider router={routes} />
    //       </div>
    //     </section>
    //   </main>
    // </>
  );
}

export default UserLayout;
