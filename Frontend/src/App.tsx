import React from "react";
import FormFetchGet from "./FormFetchGet"
import FormFetchPost from "./FormFetchPost"
 const App=()=>{
    return (
    <div className="add-two-numbers">
    <h1>Adding Two Numbers</h1>
    <div>
        <h2>&lt;FormFetchGet /&gt; Form &#40; This Sends a GET Request and attaches the data to the url as Search Params &#41;</h2>
        <FormFetchGet/>
    </div>
    <div>
        <h2>&lt;FormFetchPost /&gt; Form &#40; This Sends a POST Request and sends formData in the body of the POST &#41;</h2>
        <FormFetchPost/>
    </div>
    </div>
    )
}


export default App;