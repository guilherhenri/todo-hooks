import '@styles/components/_filters.scss'

import { useTask } from '@/contexts/task-context'

import { Checkbox } from './ui/checkbox'

export function Filters() {
  const { filter, updateFilter } = useTask()

  return (
    <div className="filters">
      <div className="filters__field">
        <Checkbox
          size="sm"
          checked={filter === 'all'}
          onCheckedChange={(checked) =>
            updateFilter('all', checked ? 'add' : 'remove')
          }
        />
        <label className="filters__label">Todas</label>
      </div>

      <div className="filters__field">
        <Checkbox
          size="sm"
          checked={filter === 'all' || filter.has('high')}
          onCheckedChange={(checked) =>
            updateFilter('high', checked ? 'add' : 'remove')
          }
        />
        <label className="filters__label">Alta</label>
      </div>

      <div className="filters__field">
        <Checkbox
          size="sm"
          checked={filter === 'all' || filter.has('regular')}
          onCheckedChange={(checked) =>
            updateFilter('regular', checked ? 'add' : 'remove')
          }
        />
        <label className="filters__label">Normal</label>
      </div>

      <div className="filters__field">
        <Checkbox
          size="sm"
          checked={filter === 'all' || filter.has('low')}
          onCheckedChange={(checked) =>
            updateFilter('low', checked ? 'add' : 'remove')
          }
        />
        <label className="filters__label">Baixa</label>
      </div>
    </div>
  )
}
