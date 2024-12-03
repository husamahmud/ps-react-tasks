import { NavLink, Outlet } from 'react-router-dom';

function LayOut() {
  return (
    <div className="layout">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/html">HTML</NavLink>
        <NavLink to="/css">CSS</NavLink>
        <NavLink to="/js">JavaScript</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

export default LayOut;
