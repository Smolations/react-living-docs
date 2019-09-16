const defaultJsx = `
function Demo(props) {
  const [greeting, setGreeting] = useState('Hey');

  function handleChangeGreeting() {
    setGreeting('Sup');
  }

  return (
    <Card>
      <p>{greeting} {props.name}, I am a demo!</p>
      <button type="button" onClick={handleChangeGreeting}>Change Greeting</button>
    </Card>
  );
}
`;

export default {
  jsx: defaultJsx,
  jsxProps: '{ "name": "Smola" }',
  transpiledJsx: null,
};
