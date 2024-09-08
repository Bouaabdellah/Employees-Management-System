import React from "react";

const Container = ({ children } : {children : React.ReactNode}) => {
    return (
        <div className="mx-auto px-[15px] lg:px-[20px]">
            {children}
        </div>
    )
}

export default Container;