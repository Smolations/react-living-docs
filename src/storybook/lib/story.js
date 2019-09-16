export default class Story {
  chapters = []


  constructor(id) {
    this.id = id;
  }


  addChapter(label, opts) {
    this.chapters.push({
      label,
      opts,
    });

    return this;
  }
}
