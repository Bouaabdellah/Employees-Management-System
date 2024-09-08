import React from "react";

const Container = ({ children } : {children : React.ReactNode}) => {
    return (
        <div className="mx-auto md:w-[750px] lg:w-[970px] xl:w-[1170px] px-[15px]">
            {children}
        </div>
    )
}

export default Container;