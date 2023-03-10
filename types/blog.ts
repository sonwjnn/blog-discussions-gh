export interface BlogPost {
  id?: number
  title: string
  url?: string
  html?: string
  createdAt: string
  tags: string[]
  lastEdited?: string | null
  bodyText: string
  discussionUrl?: string
  author: {url: string; name: string; avatar: string}
}

export interface BlogDetail {
  title: string
  bodyHTML: string
  createdAt: string
  author: {url: string; name: string; avatar: string}
}
