// Linear progress bar + optional percentage label.
export default function ProgressBar({ value, max = 100, label }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  const clamped = Math.max(0, Math.min(100, pct));
  return (
    <div className="so-progress">
      {label && (
        <div className="so-progress-label">
          <span>{label}</span>
          <span>{clamped}%</span>
        </div>
      )}
      <div
        className="so-progress-track"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <div className="so-progress-fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
