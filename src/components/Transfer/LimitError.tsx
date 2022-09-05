/*
 * @Author: linzeguang
 * @Date: 2022-09-05 00:56:14
 * @LastEditTime: 2022-09-05 01:11:40
 * @LastEditors: linzeguang
 * @Description:
 */
import React, { useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'

import { BridgeConfig } from '@/api/contract'

import { ErrorText } from './styled'

ErrorText.defaultProps = {
  initial: { height: 0, display: 'none' },
  animate: { height: 'auto', display: 'block' },
  exit: { height: 0, transitionEnd: { display: 'none' } },
}

interface Props {
  amount: string
  config: Record<keyof BridgeConfig, string>
}

const LimitError: React.FC<Props> = ({ amount, config }) => {
  const { minAmountPerTx, maxAmountPerTx } = config

  const overMin = useMemo(
    () => amount && Number(amount) < Number(minAmountPerTx),
    [amount, minAmountPerTx],
  )
  const overMax = useMemo(
    () => amount && Number(amount) > Number(maxAmountPerTx),
    [amount, maxAmountPerTx],
  )

  const message = useMemo(() => {
    if (overMin) return `Min per Tx: ${minAmountPerTx}`
    else if (overMax) return `Max per Tx: ${maxAmountPerTx}`
    return ''
  }, [maxAmountPerTx, minAmountPerTx, overMax, overMin])

  return (
    <AnimatePresence>{(overMin || overMax) && <ErrorText>{message}</ErrorText>}</AnimatePresence>
  )
}

export default LimitError
