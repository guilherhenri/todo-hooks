import '@styles/components/ui/_checkbox.scss'

import { CheckIcon } from '@phosphor-icons/react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import * as React from 'react'

interface CheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  variant?: 'square' | 'circle'
  size?: 'default' | 'sm'
}

function Checkbox({
  variant = 'square',
  size = 'default',
  ...props
}: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={`checkbox ${variant === 'circle' ? 'checkbox--circle' : ''} ${size === 'sm' ? 'checkbox--sm' : ''}`}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="checkbox__indicator"
      >
        <CheckIcon
          className="checkbox__indicator-icon"
          size={14}
          weight="bold"
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
