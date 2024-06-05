import React, { useState } from 'react'

const useGetViewPort = () => {
    const [viewport, setViewport] = useState(window.innerWidth);
  
    
    const handleResize = () => {
        setViewport(window.innerWidth)
    }
    
    window.addEventListener("resize",handleResize);

    return viewport
}

export default useGetViewPort
