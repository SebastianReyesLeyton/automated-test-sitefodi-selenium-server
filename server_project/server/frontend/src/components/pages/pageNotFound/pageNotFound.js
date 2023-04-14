import Image from "../../../img/pageNotFound/Error.png";

import "./pageNotFound.css";

const PageNotFound = () => {
    return (
        <div className="container">
            <section>
                <h1 className="error-code">404</h1>
                <h2 className="description">La página que estas consultado no se encuentra registrada</h2>
            </section>
            <img src={Image} alt="Error" className="error-image"/>
        </div>
    )
}

export default PageNotFound