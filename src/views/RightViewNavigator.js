import React from 'react';
import ReactDOM from 'react-dom';
import RightView from "./RightView";

const RightViewNavigator = (view) => {
    const id = "right-view-"+new Date().getTime();
    let body = document.getElementsByTagName('body')[0];
    let node = document.createElement("div");                 // Create a <li> node
    node.id = id;
    node.style.cssText = 'position: absolute; top: 0; left: 0; width: 100%; height: 100%';
    body.appendChild(node);
    ReactDOM.render(
        <RightView view={view} id={id}/>,
        document.getElementById(id)
    );
};

export default RightViewNavigator;
export {RightViewNavigator};
