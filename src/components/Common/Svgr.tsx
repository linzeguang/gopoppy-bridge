import { Icon } from '@/svgr'
import styled from '@emotion/styled'

export const Choose = styled(Icon.ChooseFilled)`
  width: 22px;
  height: 22px;
`

export const ArrowDown = styled(Icon.ArrowDownFilled)`
  width: 12px;
  height: 12px;
  fill: #fff;
  transition: all ${({ theme }) => theme.duration}s;
`
