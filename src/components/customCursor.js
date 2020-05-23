import React, { useEffect, useState, useRef } from "react"
//Context
import { useGlobalStateContext } from "../context/globalContext"
// Styled Components
import { Cursor } from "../styles/globalStyles"

const CustomCursor = ({ toggleMenu }) => {
  const { cursorType } = useGlobalStateContext()
  const cursor = useRef(null);

  const onMouseMove = event => {
    const { clientX, clientY } = event
    cursor.current.style.left = `${clientX}px`;
    cursor.current.style.top = `${clientY}px`;
  }
  const onMouseDown = () => {
    cursor.current.style.transform = `translate(-50%, -50%) scale(0.75)`
  }
  const onMouseUp = () => {
    cursor.current.style.transform = `translate(-50%, -50%)`
  }

  useEffect(() => {
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
    }
  }, [])
  return (
    <>
      <Cursor
        className={`${!!cursorType ? "hovered" : ""} ${cursorType} ${
          toggleMenu ? "nav-open" : ""
        }`}
        ref = {cursor}
      />
    </>
  )
}

export default CustomCursor
