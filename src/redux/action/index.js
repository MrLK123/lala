

// action类型
export const type={
    SWICH_MENU:"SWICH_MENU"
}


export const switchMenu=(menuName)=>({
    type:type.SWICH_MENU,
    menuName
})