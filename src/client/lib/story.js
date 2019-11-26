export default class Story {
  chapters = []


  constructor(id, { globals }) {
    this.id = id;
    this.globals = globals;
  }


  addChapter(chapter) {
    this.chapters.push(chapter);

    return this;
  }

  findChapter(chapterId) {
    return this.chapters.find(chapter => chapter.id === chapterId);
  }
}
