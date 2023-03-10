import BlogPreview from '@/components/BlogPreview'
import {getBlogs} from '@/server/blog'
import {BlogPost} from '@/types/blog'
import {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {useEffect, useMemo, useState} from 'react'

const Home: NextPage = ({
  blogData,
  tags,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [selectedIdx, setSelectedIdx] = useState<number[]>([])
  const [selectedWord, setSelectedWord] = useState<string[]>([])
  const filterBlog: BlogPost[] = useMemo(() => {
    return selectedWord.length > 0
      ? blogData.filter(
          (blog: BlogPost) =>
            selectedWord.every((filter) => blog.tags.includes(filter)) // true return blog of blogs for filter, false no return
        )
      : blogData
  }, [selectedWord])
  const handleTags = (tag: any, idx: number) => {
    if (selectedIdx.includes(idx)) {
      setSelectedIdx(selectedIdx.filter((id) => id !== idx))
      setSelectedWord(selectedWord.filter((word) => word !== tag))
    } else {
      setSelectedIdx([...selectedIdx, idx])
      setSelectedWord([...selectedWord, tag])
    }
  }
  return (
    <>
      <main className="w-screen h-screen overflow-auto flex flex-col items-center bg-zinc-800 text-neutral-300">
        <title>Home page</title>
        <section>
          <div className="mt-3 text-center">
            <h1 className="text-[3rem]">Welcome to dev blog</h1>
            <p>
              A fullstack project make with tailwindcss, next.js, github graphQL
            </p>
          </div>
        </section>
        <section className="flex flex-col items-center mt-12 text-[1.1rem] ">
          <div className="flex gap-3 mb-12">
            {tags.map((tag: string, idx: number) => {
              return (
                <button
                  // className="label transition-all hover:bg-sky-400 duration-300 "
                  className={`${
                    selectedIdx.includes(idx)
                      ? 'label-selected transition-all hover:bg-sky-400 duration-300'
                      : 'label transition-all hover:bg-sky-400 duration-300'
                  }`}
                  key={idx}
                  onClick={() => handleTags(tag, idx)}
                >
                  {tag}
                </button>
              )
            })}
          </div>
          {filterBlog.map((blog: BlogPost) => {
            return (
              <div
                key={blog.id}
                className="max-w-[28em] max-h-[20em] overflow-hidden mx-6 mb-6 bg-neutral-300 text-zinc-800 rounded-lg p-4 hover:bg-neutral-500 hover:text-neutral-300 transition-all duration-300"
              >
                <a href={blog.url} target="_blank" rel="noreferrer">
                  <BlogPreview
                    title={blog.title}
                    bodyText={blog.bodyText}
                    createdAt={blog.createdAt}
                    author={blog.author}
                    tags={blog.tags}
                  />
                </a>
              </div>
            )
          })}
        </section>
      </main>
    </>
  )
}
export default Home

export const getServerSideProps: GetServerSideProps = async () => {
  let blogs: BlogPost[] = await getBlogs()
  let tags: string[] = []
  for (const blog of blogs) {
    for (const tag of blog.tags) {
      if (!tags.includes(tag)) tags.push(tag)
    }
  }

  return {
    props: {
      blogData: blogs,
      tags: tags,
    },
  }
}
