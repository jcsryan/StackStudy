import React from "react";

function Navbar(props) {
    const tabs = ['Your Cards', "login", "signup"]
    return(
        <ul className='nav' >
            <div  className="nav-list">
            {tabs.map(tab => (
                <li className="nav-list" key={tab}>
                    <button className="btn btn2 col-12 col-md-3" href={'#' + tab}
                    onClick={()=> props.handlePageChange(tab)}
                
                    className={
                        props.currentPage === tab  ?  'nav-link active' : 'nav-link'
                       
                    }
                    >
                        {tab}
                    </button>
                </li>
            ))}
            </div>
        </ul>

    )
}

export default Navbar;