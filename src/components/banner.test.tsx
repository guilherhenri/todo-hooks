import { render, screen } from '@testing-library/react'

import { Banner } from './banner'

describe('Banner Component', () => {
  it('should be able to render the banner container', () => {
    render(<Banner />)
    const bannerElement = screen.getByRole('banner')
    expect(bannerElement).toBeInTheDocument()
    expect(bannerElement).toHaveClass('banner')
  })

  it('should be able to render the logo image with correct attributes', () => {
    render(<Banner />)
    const logoImage = screen.getByLabelText('Company logo')

    expect(logoImage).toBeInTheDocument()
    expect(logoImage).toHaveClass('banner__logo')
    expect(logoImage).toHaveAttribute('src', '/logo.png')
    expect(logoImage).toHaveAttribute('width', '126')
    expect(logoImage).toHaveAttribute('height', '48')
  })

  it('should be able to have empty alt text for decorative logo image', () => {
    render(<Banner />)
    const logoImage = screen.getByLabelText('Company logo')
    expect(logoImage).toHaveAttribute('alt', '')
  })
})
