import {useState, useEffect, useRef, MutableRefObject} from 'react'

export function useElementSize(): [{ height: number, width: number }, MutableRefObject<any>] {
  const ref = useRef(null)
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  })

  useEffect(() => {
    const updateSize = () => {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      })
    }

    window.addEventListener("resize", updateSize)
    updateSize()

    return () => window.removeEventListener("resize", updateSize)
  }, [])

  console.log(size)

  return [size, ref]
}
