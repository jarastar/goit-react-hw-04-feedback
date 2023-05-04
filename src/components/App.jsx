import React, { useState, useEffect } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';
import styles from './App.module.css';

const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const leaveFeedback = optionKey => {
    setFeedback(prevFeedback => ({
      ...prevFeedback,
      [optionKey]: prevFeedback[optionKey] + 1,
    }));
  };

  const countTotalFeedback = () => {
    const values = Object.values({ ...feedback });
    const total = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good } = feedback;
    return ((good / countTotalFeedback()) * 100).toFixed(1);
  };

  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem('feedback'));
    if (storedFeedback) {
      setFeedback(storedFeedback);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const options = Object.keys(feedback);
  const { good, neutral, bad } = feedback;

  return (
    <div className={styles.feedback}>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={leaveFeedback} />
      </Section>

      <Section title="Statistics">
        {countTotalFeedback() > 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </div>
  );
};

export default App;
