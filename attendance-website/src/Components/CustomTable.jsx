
import PropTypes from "prop-types";
// Import your custom CSS file for styling

const CustomTable = ({ header, children }) => {
  return (
    <div className="table-wrapper">
      <table id="table">
        <thead>
          <tr>
            {header?.map((title, index) => (
              <th key={index}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

CustomTable.propTypes = {
  header: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
};

export default CustomTable;
