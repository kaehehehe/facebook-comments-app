export interface Comment {
  id: string
  like: boolean
  replies: Reply[] | []
  text: string
}

export interface Reply {
  id: string
  like: boolean
  text: string
}
