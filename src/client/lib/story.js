export default class Story {
  chapters = []


  constructor(id, { globals = {} }) {
    this.id = id;
    this.globals = globals;
  }


  addChapter(chapter) {
    // since mostly chapte4rs will go through the
    // transpilation process, let's give them access
    // to the globals they will need to render on
    // the stage
    Object.defineProperty(chapter, 'globals', { get: () => { return this.globals; } });

    this.chapters.push(chapter);

    return this;
  }

  findChapter(chapterId) {
    return this.chapters.find(chapter => chapter.id === chapterId);
  }
}
