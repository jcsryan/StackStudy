import React from "react";

function Navbar(props) {
    const tabs = ['Sub1','Sub2', 'Sub3', 'Sub4', "Sub5"]
    return(
        <ul className='nav' >
            
            {tabs.map(tab => (
                <li className="nav-list" key={tab}>
                    <a id="nav-list-a" href={'#' + tab}
                    onClick={()=> props.handlePageChange(tab)}
                
                    className={
                        props.currentPage === tab  ?  'nav-link active' : 'nav-link'
                       
                    }
                    >
                        {tab}
                    </a>
                </li>
            ))}
        </ul>

    )
}

export default Navbar;