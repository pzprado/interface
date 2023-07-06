import type { IconProps } from '@tamagui/helpers-icon'
import { forwardRef, memo } from 'react'
import { Path, Svg } from 'react-native-svg'
import { getTokenValue, isWeb, useTheme } from 'tamagui'

const Icon = forwardRef<Svg, IconProps>((props, ref) => {
  // isWeb currentColor to maintain backwards compat a bit better, on native uses theme color
  const {
    color: colorProp = isWeb ? 'currentColor' : undefined,
    size: sizeProp = '$true',
    strokeWidth: strokeWidthProp,
    ...restProps
  } = props
  const theme = useTheme()

  const size = typeof sizeProp === 'string' ? getTokenValue(sizeProp, 'size') : sizeProp

  const strokeWidth =
    typeof strokeWidthProp === 'string' ? getTokenValue(strokeWidthProp, 'size') : strokeWidthProp

  const color =
    // @ts-expect-error its fine to access colorProp undefined
    theme[colorProp]?.get() ?? colorProp ?? theme.color.get()

  const svgProps = {
    ...restProps,
    size,
    strokeWidth,
    color,
  }

  return (
    <Svg ref={ref} fill="none" height={size} viewBox="0 0 24 24" width={size} {...svgProps}>
      <Path
        d="M3.00097 11.8C2.97397 11.8 2.94602 11.799 2.91802 11.796C2.50602 11.751 2.20902 11.38 2.25402 10.969C2.61702 7.65199 4.619 4.79503 7.609 3.32703C7.842 3.21303 8.11699 3.22701 8.33599 3.36401C8.55599 3.50101 8.68999 3.74198 8.68999 4.00098V7.05103C8.68999 7.46503 8.35399 7.80103 7.93999 7.80103C7.52599 7.80103 7.18999 7.46503 7.18999 7.05103V5.31006C5.26699 6.64806 4.00596 8.74896 3.74596 11.132C3.70396 11.515 3.37797 11.8 3.00097 11.8ZM16.391 20.673C19.381 19.206 21.383 16.349 21.745 13.031C21.791 12.619 21.493 12.249 21.081 12.204C20.673 12.16 20.3 12.456 20.255 12.868C19.994 15.251 18.734 17.3519 16.81 18.6899V16.949C16.81 16.535 16.474 16.199 16.06 16.199C15.646 16.199 15.31 16.535 15.31 16.949V19.999C15.31 20.258 15.444 20.499 15.664 20.636C15.785 20.711 15.922 20.749 16.06 20.749C16.173 20.75 16.286 20.725 16.391 20.673ZM12 7C12 9.209 13.791 11 16 11C18.209 11 20 9.209 20 7C20 4.791 18.209 3 16 3C13.791 3 12 4.791 12 7ZM3.99999 17C3.99999 19.209 5.79099 21 7.99999 21C10.209 21 12 19.209 12 17C12 14.791 10.209 13 7.99999 13C5.79099 13 3.99999 14.791 3.99999 17Z"
        fill={color}
      />
    </Svg>
  )
})

Icon.displayName = 'CoinConvert'

export const CoinConvert = memo<IconProps>(Icon)
