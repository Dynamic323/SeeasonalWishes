/* eslint-disable react/prop-types */
function DBNavLink({ link, icon, title, licon = "" }) {
  return (
    <li className="nav-link my-2">
      <a 
        href={link}
        className={'navlink rounded-xl '}
      >
        {icon}
        <span className="db-navtext ms-2 ">{title}</span>
        <span className="ms-auto">{licon}</span>
      </a>
    </li>
  );
}
function NavLinkCollapse({ text, icon = "", children }) {
  return (
    <>
      <li className="ccc">
        <div tabIndex={0} className="collapse collapse-arrow m-0 p-0">
          <div className="collapse-title navlink rounded-xl">
            {icon}
            <span className="db-navtext ms-2 ">{text}</span>
          </div>
          <div className="collapse-content">{children}</div>
        </div>
      </li>
    </>
  );
}
let Navlink = {};
Navlink.Link = DBNavLink;
Navlink.Link2 = NavLinkCollapse;
export default Navlink;
