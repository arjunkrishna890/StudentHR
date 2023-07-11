import { useSelector } from 'react-redux';

function AnotherComponent() {
  const token = useSelector((state) => state.auth.token);

  console.log(token);
  return(
    <h1>{token}</h1>
  )
}
export default AnotherComponent