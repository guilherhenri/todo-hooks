import '@styles/components/_banner.scss'

export function Banner() {
  return (
    <div className="banner">
      <img
        className="banner__logo"
        src="/logo.png"
        alt=""
        width={126}
        height={48}
      />
    </div>
  )
}
