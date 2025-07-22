import * as React from "react"
import Svg, { Rect } from "react-native-svg"

function OnboardIndicator({ actived }) {
    if (actived) {
        return (
            <Svg width={64} height={8} viewBox="0 0 64 8" fill="none">
                <Rect width={64} height={8} rx={4} fill="white" />
            </Svg>
        )
    } else {
        return (
            <Svg width={8} height={8} viewBox="0 0 8 8" fill="none">
                <Rect width={8} height={8} rx={4} fill="#767A90" />
            </Svg>
        )
    }
}

export default OnboardIndicator
