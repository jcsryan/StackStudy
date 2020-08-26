import React from "react";

function Navbar(props) {
    const tabs = ['Your Cards', "login", "signup"]
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