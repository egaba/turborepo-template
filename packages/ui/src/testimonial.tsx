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
      className={`card border-l-4 border-primary bg-base-100 shadow-md ${className}`.trim()}
    >
      <div className="card-body">
        <blockquote className="text-base-content/80">
          &ldquo;{quote}&rdquo;
        </blockquote>
        <div className="mt-4 flex items-center gap-3">
          {avatar && (
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={avatar} alt={author} />
              </div>
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-base-content">{author}</p>
            <p className="text-sm text-base-content/60">
              {role}, {company}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
