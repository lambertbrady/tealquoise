import { readdirSync, readFileSync } from 'fs'
import { basename, extname, join } from 'path'
import matter from 'gray-matter'
import { postsDirectory, postsFileExtension } from './constants'

export function removeFileExtension(path) {
  return basename(path, extname(path))
}

export function getPostBySlug(slug, fields = []) {
  const path = join(postsDirectory, `${slug}${postsFileExtension}`)
  const { data, content } = matter(readFileSync(path, 'utf8'))
  const post = {}

  fields.forEach((field) => {
    if (field === 'slug') {
      post[field] = slug
    } else if (field === 'content') {
      post[field] = content
    } else if (data[field]) {
      post[field] = data[field]
    }
  })

  return post
}

export function getAllPosts(fields = []) {
  const slugs = readdirSync(join(process.cwd(), postsDirectory))
  const posts = slugs
    .map((slug) => getPostBySlug(removeFileExtension(slug), fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
