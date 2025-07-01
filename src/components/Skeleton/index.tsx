import { SkeletonBase } from './styles'

export function Skeleton({
  width,
  height,
  radius,
  style,
  ...props
}: {
  width?: string
  height?: string
  radius?: string
  style?: React.CSSProperties
}) {
  return (
    <SkeletonBase
      width={width}
      height={height}
      radius={radius}
      style={style}
      {...props}
    />
  )
}
