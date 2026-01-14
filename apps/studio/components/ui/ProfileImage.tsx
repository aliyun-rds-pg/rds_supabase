// Use native img to avoid next/image internal startsWith checks
import { ReactNode, useState } from 'react'

import { User } from 'icons'
import { cn } from 'ui'

interface ProfileImageProps {
  alt?: string
  src?: string
  placeholder?: ReactNode
  className?: string
}

export const ProfileImage = ({ alt, src, placeholder, className }: ProfileImageProps) => {
  const [hasInvalidImg, setHasInvalidImg] = useState(false)

  // 彻底兜底：无论如何只要不是非空字符串均降级
  if (typeof src !== 'string' || src.length === 0) {
    return (
      placeholder ?? (
        <figure className={cn('bg-foreground rounded-full flex items-center justify-center', className)}>
          <User size={18} strokeWidth={1.5} className="text-background" />
        </figure>
      )
    )
  }
  // 合法 src 检查（彻底移除任何 startsWith 调用）
  const isValidSrc = /^(https?:\/\/|\/|data:)/.test(src)

  return isValidSrc && !hasInvalidImg ? (
    <img
      alt={alt ?? ''}
      src={src}
      width={24}
      height={24}
      className={cn('aspect-square bg-foreground rounded-full object-cover', className)}
      onError={() => setHasInvalidImg(true)}
    />
  ) : (
    placeholder ?? (
      <figure className={cn('bg-foreground rounded-full flex items-center justify-center', className)}>
        <User size={18} strokeWidth={1.5} className="text-background" />
      </figure>
    )
  )
}
