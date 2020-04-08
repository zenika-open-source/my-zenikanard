import React, { FC, useState } from 'react'
import cn from 'classnames'

import styles from './Notification.module.css'

type NotificationProps = {
  actionLabel?: string
  onActionClick?: () => void
}

const Notification: FC<NotificationProps> = ({
  children,
  actionLabel = 'OK',
  onActionClick,
}) => {
  const [open, setOpen] = useState(true)

  const handleAction = () => {
    if (onActionClick) onActionClick()
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className={styles.notification}>
      <p>{children}</p>
      <button
        type="button"
        onClick={handleAction}
        className={cn(styles.button, styles.primary)}
        aria-label={actionLabel}
      >
        {actionLabel}
      </button>
    </div>
  )
}

export default Notification
