/* eslint-disable react/prop-types */
export default function Stats({ icon, text, title }) {
  return (
    <>
      <div className="w-full md:w-1/4 p-2 my-2">
        <div className="stat card bg-base-100">
          <div className="stat-figure text-primary">
            {icon}
          </div>
          <div className="stat-title">{title}</div>
          <div className="stat-value text-primary">{text}</div>
        </div>
      </div>
    </>
  );
}
