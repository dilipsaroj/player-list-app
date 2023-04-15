import React from 'react'

const CustomButton = ({...props}) =>{
    const {...rest} = props;
    return(
    <button 
    className='btn btn-secondary' 
    onClick={props.onClick}
    >
       {rest.children}
    </button>
    )
    
}

export default CustomButton;