import { RichText } from '@/components/RichText'

type ContentProps = {
  content: any // The rich text content from Payload
}

export const Content: React.FC<ContentProps> = ({ content }) => {
  return (
	<section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
	  <RichText content={content} />
	</section>
  )
}