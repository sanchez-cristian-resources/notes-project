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

  constructor(
    public id: string,
    public author: string,
    public title: string,
    public content: string,
    public tags: string[],
    public length: number,
    public createdAt: number,
    public lastEditAt: number,
  ) {}
}