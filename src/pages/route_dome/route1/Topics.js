import React from 'react';

export default (props)=>{
    return (
        <div>
            this topics:{props.match.params.name}
        </div>
    )
}