type FeatureProps = {
  heading?: string
  features: Array<{
	title: string
	description?: string
	icon: 'users' | 'tools' | 'education'
  }>
}

// Icon components
const Icons = {
  users: (props: any) => (
	<svg
	  xmlns="http://www.w3.org/2000/svg"
	  fill="none"
	  viewBox="0 0 24 24"
	  stroke="currentColor"
	  {...props}
	>
	  <path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={2}
		d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
	  />
	</svg>
  ),
  tools: (props: any) => (
	<svg
	  xmlns="http://www.w3.org/2000/svg"
	  fill="none"
	  viewBox="0 0 24 24"
	  stroke="currentColor"
	  {...props}
	>
	  <path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={2}
		d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
	  />
	  <path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={2}
		d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
	  />
	</svg>
  ),
  education: (props: any) => (
	<svg
	  xmlns="http://www.w3.org/2000/svg"
	  fill="none"
	  viewBox="0 0 24 24"
	  stroke="currentColor"
	  {...props}
	>
	  <path
		strokeLinecap="round"
		strokeLinejoin="round"
		strokeWidth={2}
		d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
	  />
	</svg>
  ),
}

export const Features: React.FC<FeatureProps> = ({ heading, features }) => {
  return (
	<section className="py-16 bg-gray-50">
	  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		{heading && (
		  <div className="text-center">
			<h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
			  {heading}
			</h2>
		  </div>
		)}

		<div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
		  {features.map((feature, index) => {
			const Icon = Icons[feature.icon]

			return (
			  <div
				key={index}
				className="bg-white p-6 rounded-lg shadow-sm"
			  >
				<div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white mb-4">
				  <Icon className="h-6 w-6" />
				</div>
				<h3 className="text-lg font-medium text-gray-900 mb-2">
				  {feature.title}
				</h3>
				{feature.description && (
				  <p className="text-base text-gray-500">
					{feature.description}
				  </p>
				)}
			  </div>
			)
		  })}
		</div>
	  </div>
	</section>
  )
}