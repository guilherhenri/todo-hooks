import '@styles/components/_banner.scss'

export function Banner() {
  return (
    <div className="banner" role="banner">
      <img
        className="banner__logo"
        src="/logo.png"
        alt=""
        width={126}
        height={48}
        aria-label="Company logo"
      />
    </div>
  )
}
