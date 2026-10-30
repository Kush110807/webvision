import { Info, TriangleAlert, CircleCheck, OctagonAlert, X } from 'lucide-react';

const STYLES = {
  info: { Icon: Info, className: 'so-notice-info' },
  success: { Icon: CircleCheck, className: 'so-notice-success' },
  warning: { Icon: TriangleAlert, className: 'so-notice-warning' },
  error: { Icon: OctagonAlert, className: 'so-notice-error' },
};

// Inline message banner: errors, success messages and informational notes.
export default function NoticeBanner({ type = 'info', title, children, onDismiss }) {
  const { Icon, className } = STYLES[type] || STYLES.info;
  return (
    <div className={`so-notice ${className}`} role={type === 'error' ? 'alert' : 'status'}>
      <Icon size={18} aria-hidden="true" className="so-notice-icon" />
      <div className="so-notice-body">
        {title && <strong className="so-notice-title">{title}</strong>}
        <div className="so-notice-content">{children}</div>
      </div>
      {onDismiss && (
        <button type="button" className="so-notice-dismiss" onClick={onDismiss} aria-label="Dismiss message">
          <X size={15} />
        </button>
      )}
    </div>
  );
}
