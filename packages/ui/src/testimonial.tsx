type TestimonialProps = Readonly<{
  quote: string
  author: string
  role: string
  company: string
  avatar?: string
  className?: string
}>

export function Testimonial({
  quote,
  author,
  role,
  company,
  avatar,
  className = '',
}: TestimonialProps) {
  return (
    <div
      className={`card border-base-300/50 border-l-primary bg-base-100 border border-l-4 ${className}`.trim()}
    >
      <div className="card-body">
        <blockquote className="text-base-content/80">&ldquo;{quote}&rdquo;</blockquote>
        <div className="mt-4 flex items-center gap-3">
          {avatar && (
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={avatar} alt={author} />
              </div>
            </div>
          )}
          <div>
            <p className="text-base-content text-sm font-semibold">{author}</p>
            <p className="text-base-content/60 text-sm">
              {role}, {company}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
