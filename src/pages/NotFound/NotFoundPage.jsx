import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <h1>Not found page</h1>
      <Link to="/">Go to home page</Link>
    </>
  );
};

export default NotFoundPage;
