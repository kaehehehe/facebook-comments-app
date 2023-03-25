export interface Comment {
  id: string
  like: boolean
  replay: Reply[] | []
  comment: string
}

export interface Reply {
  id: string
  like: boolean
  comments: string
}
