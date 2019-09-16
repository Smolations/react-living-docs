import Story from 'storybook/lib/story';

const cardStory = new Story('Card');

cardStory.addChapter('Empty Card', {
  body: `
    function EmptyCard(props) {
      return (
        <Card>
          I am an empty Card.
        </Card>
      );
    }
  `,
});


export default cardStory;
