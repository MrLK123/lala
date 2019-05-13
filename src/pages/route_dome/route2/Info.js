import React from 'react';

export default (props)=>{
    return (
        <div>
            这是动态路由,动态数据为：{props.match.params.value}
        </div>
    )
}