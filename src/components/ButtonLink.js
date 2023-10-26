import React from "react";
import {Link} from "react-router-dom";

export default function ButtonLink({to, children, className}){
    return (
        <Link to={to}>
            <button className={className}>{children}</button>
        </Link>
    )
}