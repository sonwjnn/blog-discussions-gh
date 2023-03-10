import {BlogPost} from '@/types/blog'
import React from 'react'
import BlogHeader from './BlogHeader'

const BlogPreview: React.FC<BlogPost> = (props) => {
  const {title, bodyText, author, createdAt, tags} = props
  const previewText: string = bodyText.substring(0, 150) + '...'
  return (
    <section>
      <BlogHeader createdAt={createdAt} author={author} />
      <section className="font-bold">{title}</section>
      <p className="mt-2">{previewText}</p>
      <div className="flex gap-3">
        {tags.map((tag, idx) => {
          return (
            <p
              className="bg-sky-600 px-2 mt-2 font-semibold rounded-xl text-zinc-800"
              key={idx}
            >
              {tag}
            </p>
          )
        })}
      </div>
    </section>
  )
}

export default BlogPreview
