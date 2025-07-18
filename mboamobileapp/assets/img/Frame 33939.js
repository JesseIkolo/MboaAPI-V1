import * as React from "react"
import Svg, { Rect, Path } from "react-native-svg"

function SvgComponent(props) {
  return (
    <Svg
      width={44}
      height={44}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Rect width={44} height={44} rx={8} fill="#FEE9E9" />
      <Path
        d="M18 15.75c-.41 0-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75zM26 15.75c-.41 0-.75-.34-.75-.75v-3c0-.41.34-.75.75-.75s.75.34.75.75v3c0 .41-.34.75-.75.75zM30.5 19.84h-17c-.41 0-.75-.34-.75-.75s.34-.75.75-.75h17c.41 0 .75.34.75.75s-.34.75-.75.75z"
        fill="#F52424"
      />
      <Path
        d="M26 32.75h-8c-3.65 0-5.75-2.1-5.75-5.75v-8.5c0-3.65 2.1-5.75 5.75-5.75h8c3.65 0 5.75 2.1 5.75 5.75V27c0 3.65-2.1 5.75-5.75 5.75zm-8-18.5c-2.86 0-4.25 1.39-4.25 4.25V27c0 2.86 1.39 4.25 4.25 4.25h8c2.86 0 4.25-1.39 4.25-4.25v-8.5c0-2.86-1.39-4.25-4.25-4.25h-8z"
        fill="#F52424"
      />
      <Path
        d="M18.5 24.5c-.13 0-.26-.03-.38-.08s-.23-.12-.33-.21c-.09-.1-.16-.21-.21-.33a.995.995 0 01-.08-.38c0-.26.11-.52.29-.71.1-.09.21-.16.33-.21.18-.08.38-.1.58-.06.06.01.12.03.18.06.06.02.12.05.18.09l.15.12c.04.05.09.1.12.15.04.06.07.12.09.18.03.06.05.12.06.18.01.07.02.13.02.2 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29zM22 24.5c-.26 0-.52-.11-.71-.29l-.12-.15a.757.757 0 01-.09-.18.636.636 0 01-.06-.18c-.01-.07-.02-.13-.02-.2 0-.13.03-.26.08-.38s.12-.23.21-.33c.28-.28.73-.37 1.09-.21.13.05.23.12.33.21.18.19.29.45.29.71 0 .07-.01.13-.02.2-.01.06-.03.12-.06.18-.02.06-.05.12-.09.18l-.12.15c-.1.09-.2.16-.33.21-.12.05-.25.08-.38.08zM18.5 28c-.13 0-.26-.03-.38-.08s-.23-.12-.33-.21c-.09-.1-.16-.2-.21-.33a.995.995 0 01-.08-.38c0-.26.11-.52.29-.71.1-.09.21-.16.33-.21.37-.16.81-.07 1.09.21.04.05.09.1.12.15.04.06.07.12.09.18.03.06.05.12.06.19.01.06.02.13.02.19 0 .26-.11.52-.29.71-.19.18-.45.29-.71.29z"
        fill="#F52424"
      />
    </Svg>
  )
}

export default SvgComponent
