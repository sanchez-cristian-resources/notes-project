// {
//     "_id": "L0xyAdJ40U",
//     "author": "Afrika Bambaataa",
//     "title": "The Universal",
//     "content": "The Universal Zulu Nation stands to acknowledge wisdom, understanding, freedom, justice, and equality, peace, unity, love, and having fun, work, overcoming the negative through the positive, science, mathematics, faith, facts, and the wonders of God, whether we call him Allah, Jehovah, Yahweh, or Jah.",
//     "tags": [ "wisdom" ],
//     "length": 302,
//     "createdAt": "2021-03-08",
//     "lastEditAt": "2021-03-08"
// }
export class Note {
  id: string
  author: string
  title: string
  content: string
  tags: string[]
  length: number
  createdAt: number
  lastEditAt: number

  constructor() {
    this.id = ''
    this.author = ''
    this.title = ''
    this.content = ''
    this.tags = []
    this.length = 0
    this.createdAt = 0
    this.lastEditAt = 0
  }
}