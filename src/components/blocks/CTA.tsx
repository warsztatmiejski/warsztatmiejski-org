import Link from 'next/link'

type CTAProps = {
  heading: string
  subheading?: string
  button?: {
	label: string
	link: string
  }
  backgroundColor: 'blue' | 'gray' | 'white'
}

export const CTA: React.FC<CTAProps> = ({
  heading,
  subheading,
  button,
  backgroundColor = 'blue'
}) => {
  const bgClasses = {
	blue: 'bg-blue-700',
	gray: 'bg-gray-800',
	white: 'bg-white',
  }

  const textClasses = {
	blue: 'text-white',
	gray: 'text-white',
	white: 'text-gray-900',
  }

  const subheadingClasses = {
	blue: 'text-blue-200',
	gray: 'text-gray-300',
	white: 'text-gray-500',
  }

  const buttonClasses = {
	blue: 'bg-white text-blue-700 hover:bg-blue-50',
	gray: 'bg-white text-gray-700 hover:bg-gray-50',
	white: 'bg-blue-600 text-white hover:bg-blue-700',
  }

  return (
	<section className={bgClasses[backgroundColor]}>
	  <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
		<div>
		  <h2 className={`text-3xl font-extrabold tracking-tight ${textClasses[backgroundColor]} sm:text-4xl`}>
			<span className="block">{heading}</span>
		  </h2>
		  {subheading && (
			<p className={`mt-4 text-lg ${subheadingClasses[backgroundColor]}`}>
			  {subheading}
			</p>
		  )}
		</div>
		{button && (
		  <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
			<div className="inline-flex rounded-md shadow">
			  <Link
				href={button.link}
				className={`inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md ${buttonClasses[backgroundColor]}`}
			  >
				{button.label}
			  </Link>
			</div>
		  </div>
		)}
	  </div>
	</section>
  )
}