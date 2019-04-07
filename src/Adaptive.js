import React  from 'react';
import { withAdaptive } from 'react-adaptive';
import Desktop from "./containers/Desktop";
import Mobile from "./containers/Mobile";



const mapSizeToComponent = size => props => {
    if (size.width < 420) {
        return <Mobile {...props}/>;
    }

    // if (size.width < 960) {
    //     return <Tablet {...props} />;
    // }

    return <Desktop {...props}/>;
};

export default withAdaptive({ mapSizeToComponent });

