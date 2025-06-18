import '@styles/components/_task-card.scss'

import { PencilIcon, TrashIcon } from '@phosphor-icons/react'

import { Checkbox } from './ui/checkbox'

export function TaskCard() {
  return (
    <div className="card">
      <div className="card__done">
        <Checkbox />
      </div>

      <div className="card__info">
        <p className="card__info-title">
          Integer urna interdum massa libero auctor neque turpis turpis semper.
          Duis vel sed fames integer.
        </p>
        <span className="card__info-priority" data-priority="high">
          Alta
        </span>
      </div>

      <div className="card__actions">
        <button className="card__actions-button card__actions-edit">
          <PencilIcon size={18} />
        </button>

        <span className="card__actions-separator" />

        <button className="card__actions-button card__actions-delete">
          <TrashIcon size={18} />
        </button>
      </div>
    </div>
  )
}
