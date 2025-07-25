import * as React from "react"
import Svg, { Path } from "react-native-svg"

function PersonSvgComponent
(props) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 12.75c-3.17 0-5.75-2.58-5.75-5.75S8.83 1.25 12 1.25 17.75 3.83 17.75 7s-2.58 5.75-5.75 5.75zm0-10A4.26 4.26 0 007.75 7 4.26 4.26 0 0012 11.25 4.26 4.26 0 0016.25 7 4.26 4.26 0 0012 2.75zM20.59 22.75c-.41 0-.75-.34-.75-.75 0-3.45-3.52-6.25-7.84-6.25S4.16 18.55 4.16 22c0 .41-.34.75-.75.75s-.75-.34-.75-.75c0-4.27 4.19-7.75 9.34-7.75 5.15 0 9.34 3.48 9.34 7.75 0 .41-.34.75-.75.75z"
        fill="#3C4260"
      />
    </Svg>
  )
}

export default PersonSvgComponent
