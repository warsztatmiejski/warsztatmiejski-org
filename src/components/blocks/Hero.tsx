import Link from 'next/link'
import Image from 'next/image'

type HeroProps = {
  heading?: string
  subheading?: string
  image?: {
    url?: string
    alt?: string
    width?: number
    height?: number
  }
  buttons?: Array<{
    label?: string
    link?: string
    style?: 'primary' | 'secondary'
  }>
}

export const Hero: React.FC<HeroProps> = ({ 
  heading = '',
  subheading, 
  image, 
  buttons = [] 
}) => {
  // If no content provided, render minimal component
  if (!heading && !subheading && !image && (!buttons || buttons.length === 0)) {
    return (
      <section className="relative bg-white overflow-hidden py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500">No hero content available</p>
        </div>
      </section>
    )
  }

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Background image */}
      {image && image.url && (
        <div className="absolute inset-0">
          <Image
            src={image.url}
            alt={image.alt || ''}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50" />
        </div>
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        {heading && (
          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {heading}
          </h1>
        )}

        {subheading && (
          <p className="mt-6 text-xl text-gray-100 max-w-3xl">
            {subheading}
          </p>
        )}

        {buttons && buttons.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-4">
            {buttons.map((button, i) => {
              if (!button || !button.label || !button.link) return null;
              const style = button.style === 'secondary' ? 'secondary' : 'primary';
              
              return (
                <Link
                  key={i}
                  href={button.link}
                  className={`
                    inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm
                    ${style === 'primary'
                      ? 'text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
                      : 'text-blue-700 bg-white hover:bg-gray-50 focus:ring-blue-500'}
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                  `}
                >
                  {button.label}
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}