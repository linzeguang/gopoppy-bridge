import type { ZewideTheme } from 'zewide'

import '@emotion/react'

declare module '@emotion/react' {
  /* eslint-disable @typescript-eslint/no-empty-interface */
  export interface Theme extends ZewideTheme {
    layout: {
      header: {
        backgroundColor: string
      }
    }
  }
}
