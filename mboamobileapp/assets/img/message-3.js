import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={20}
      height={20}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12.917 9.375H7.083a.63.63 0 01-.625-.625.63.63 0 01.625-.625h5.834a.63.63 0 01.625.625.63.63 0 01-.625.625z"
        fill="#2D9CDB"
      />
      <Path
        d="M13.333 18.6a1.48 1.48 0 01-.808-.242l-3.55-2.367H5.833c-2.866 0-4.791-1.925-4.791-4.791v-5c0-2.867 1.925-4.792 4.791-4.792h8.334c2.866 0 4.791 1.925 4.791 4.792v5c0 2.65-1.65 4.5-4.166 4.758v1.184c0 .541-.292 1.033-.767 1.283a1.47 1.47 0 01-.692.175zm-7.5-15.95c-2.15 0-3.541 1.392-3.541 3.542v5c0 2.15 1.391 3.541 3.541 3.541h3.334c.125 0 .241.034.35.108l3.708 2.467a.203.203 0 00.217.009.203.203 0 00.108-.184v-1.775a.63.63 0 01.625-.625c2.15 0 3.542-1.392 3.542-3.542v-5c0-2.15-1.392-3.541-3.542-3.541H5.833z"
        fill="#2D9CDB"
      />
    </Svg>
  )
}

export default SvgComponent
