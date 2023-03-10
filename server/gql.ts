export function discussionGql(ghDiscussionCategoryId: string | undefined) {
  return `
    {
      repository(name: "devblog_fs", owner: "sonchymto1") {
        discussions(categoryId: "${ghDiscussionCategoryId}", first: 100) {
          nodes {
            bodyHTML
            bodyText
            author {
              login
              url
              avatarUrl
            }
            number
            createdAt
            lastEditedAt
            title
            url
            labels(first: 100) {
              nodes {
                name
              }
            }
          }
        }
      }
    }
    `
}

export function discussionDetailGql(postId: number | undefined) {
  return `
    {
      repository(name: "devblog_fs", owner: "sonchymto1") {
        discussion(number: ${postId}) {
          title
          bodyHTML
          createdAt
          author {
             login
             url
             avatarUrl
          }
        }
      }
    }
  `
}
