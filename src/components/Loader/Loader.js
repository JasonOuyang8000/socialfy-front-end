import { Fragment } from "react";

const Loader = () => (
    <Fragment>
        <div className="spinner-grow loader-color mr-4" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow loader-color mr-4" role="status">
            <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow loader-color mr-4" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </Fragment>
)

export default Loader;