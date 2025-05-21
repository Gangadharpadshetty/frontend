import { NavLink } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar" >
            <div><NavLink className="nav" to="/machinelearning">Machine Learning</NavLink></div>
            <div><NavLink className="nav" to="/DataStructuresAndAlgorithms">Data Structures and Algorithms</NavLink></div>
            <div><NavLink className="nav" to="/WebDevelopment">Web Development</NavLink></div>
            <div><NavLink className="nav" to="/AppDevelopment">App Development</NavLink></div>
        </div>
    );
}

export default Sidebar;
