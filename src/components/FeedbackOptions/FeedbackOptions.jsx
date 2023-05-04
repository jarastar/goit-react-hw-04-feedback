import PropTypes from 'prop-types';
import styles from './FeedbackOptions.module.css';
import capitalize from 'components/capitalize';

const FeedbackOptions = ({ options, onLeaveFeedback }) => (
    <div>
      {options.map(option => (
        <button
          type="button"
          key={option}
          onClick={() => onLeaveFeedback(option)}
          className={styles.button}
        >
          {capitalize(option)}
        </button>
      ))}
    </div>
  );
  
  FeedbackOptions.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string.isRequired),
    onLeaveFeedback: PropTypes.func.isRequired,
  };
  
  export default FeedbackOptions;