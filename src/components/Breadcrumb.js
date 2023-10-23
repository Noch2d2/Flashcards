import {Link} from "react-router-dom";

export default function Breadcrumb({data}){
    return (
        
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
            <li className="breadcrumb-item">
                <Link to="/">Home</Link>
                
            </li>
    
            { data.name !== "" ?
                   data.link ?
                        (<li className="breadcrumb-item">
                            <Link to={data.link}>{data.name}</Link>
                        </li>)
                   : <li className="breadcrumb-item active" aria-current="page">{data.name}</li>
            : "" }
            
            { data.action ?
                <li className="breadcrumb-item active" aria-current="page">{data.action}</li>
            : "" }
        </ol>
        </nav>
    );
}