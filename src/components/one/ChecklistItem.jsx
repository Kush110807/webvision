import { Check } from 'lucide-react';

// A single tick-box in the Step 3 checklist. Stores a boolean only —
// no document numbers or files are ever collected.
export default function ChecklistItem({ item, checked, onToggle }) {
  return (
    <label className={`so-check-item${checked ? ' is-checked' : ''}`}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onToggle(item.id, e.target.checked)}
      />
      <span className="so-check-box" aria-hidden="true">
        {checked && <Check size={13} strokeWidth={3} />}
      </span>
      <span className="so-check-body">
        <span className="so-check-label">
          {item.label}
          {item.essential && <span className="so-badge so-badge-essential">Essential</span>}
        </span>
        <span className="so-check-hint">{item.hint}</span>
      </span>
    </label>
  );
}
