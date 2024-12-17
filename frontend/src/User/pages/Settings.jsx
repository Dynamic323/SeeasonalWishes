import React from "react";

function Settings() {
  const greetingsHistory = [
    {
      recipient: "Alice Smith",
      event: "Birthday",
      date: "2023-05-23",
      status: "Sent",
    },
    {
      recipient: "Bob Johnson",
      event: "Anniversary",
      date: "2023-07-15",
      status: "Scheduled",
    },
    {
      recipient: "Carol White",
      event: "Graduation",
      date: "2023-09-10",
      status: "Draft",
    },
  ];

  return (
    <div className="w-full h-full bg-skin-background p-4 sm:p-6 md:p-8 m-auto">
      {/* Profile */}
      <div className="w-full h-auto mb-6">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          Your Profile
        </h1>
        <div className="h-auto p-5 rounded-xl bg-[#8098ff1b] flex flex-col sm:flex-row items-center sm:items-start">
          <img
            src="boy.jpg"
            alt="Profile"
            className="h-20 w-20 rounded-full mb-4 sm:mb-0 sm:mr-6"
          />
          <div className="relative text-center sm:text-left">
            <span className="text-base sm:text-lg md:text-xl font-semibold block">
              furqoon
            </span>
            <a href="#" className="text-sm sm:text-base text-blue-600">
              erinolahamzat001.com
            </a>
          </div>
          <div className="relative w-full sm:w-auto mt-6 sm:mt-0 sm:left-48 sm:bottom-30 bg-[#8098ff] p-3 rounded-xl text-center sm:text-left">
            <a
              href="#"
              className="text-xs sm:text-sm font-semibold cursor-pointer text-black"
            >
              <i className="fa fa-pencil mr-2" aria-hidden="true"></i>
              Edit Profile
            </a>
          </div>
        </div>
      </div>

      {/* Greetings History */}
      <div className="w-full h-auto p-4 mb-6 bg-[#8098ff1b] rounded-xl border-b-4 border-white">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Greetings History
        </h3>
        <table className="w-full text-xs sm:text-sm md:text-base">
          <thead>
            <tr>
              <th className="p-2 text-center font-bold">Recipient</th>
              <th className="p-2 text-center font-bold">Event</th>
              <th className="p-2 text-center font-bold">Date</th>
              <th className="p-2 text-center font-bold">Status</th>
            </tr>
          </thead>
          <tbody>
            {greetingsHistory.map((item, index) => (
              <tr key={index}>
                <td className="text-center p-3">{item.recipient}</td>
                <td className="text-center p-3">{item.event}</td>
                <td className="text-center p-3">{item.date}</td>
                <td className="text-center p-3">
                  <button className="text-xs sm:text-sm md:text-base font-medium">
                    {item.status}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Customization */}
      <div className="bg-[#8098ff1b] p-5 mb-6 rounded-xl">
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
          Customization Option
        </h3>
        <div className="grid gap-4">
          <div>
            <span className="text-sm sm:text-base font-medium">
              Default Template
            </span>
            <select className="p-3 text-sm sm:text-base md:text-lg font-medium border-none border-b-2 border-white">
              <option value="template1">Template 1</option>
              <option value="template2">Template 2</option>
              <option value="template3">Template 3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
