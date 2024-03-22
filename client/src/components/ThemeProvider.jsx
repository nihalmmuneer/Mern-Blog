import { useSelector } from "react-redux";
import PropTypes from 'prop-types';
export const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.user.theme);
  console.log(theme,'theme')
  return (
    <div className={theme.theme}>
      <div className="bg-white text-gray-700 dark:text-gray-200  min-h-screen dark:bg-black">
        {children}
      </div>
    </div>
  );
};

ThemeProvider.propTypes = {
    children:PropTypes.node.isRequired //Ensures that children is provided and is a React node
}
export default ThemeProvider;
