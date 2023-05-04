import React, { Component } from 'react';
import Section from './Section/Section';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import Statistics from './Statistics/Statistics';
import Notification from './Notification/Notification';

export class App extends Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };

  leaveFeedback = optionKey => {
    this.setState({ [optionKey]: this.state[optionKey] + 1 });
  };

  countTotalFeedback = () => {
    const values = Object.values({ ...this.state });
    const total = values.reduce((accumulator, currentValue) => accumulator + currentValue, 0);


    return total;
  };

  countPositiveFeedbackPercentage = () => {
    const { good } = this.state;
    return ((good / this.countTotalFeedback()) * 100).toFixed(1);
  };

  render() {
    const options = Object.keys(this.state);
    const { good, neutral, bad } = this.state;
    return (
      <div
        style={{
          margin: '40px',
          padding: '40px',
          width: 'fit-content',
          border: 'thick solid teal',
          backgroundColor: 'cyan'
        }}
      >
        <Section title="Please leave feedback">
          <FeedbackOptions
            options={options}
            onLeaveFeedback={this.leaveFeedback}
          />
        </Section>

        <Section title="Statistics">
          {this.countTotalFeedback() > 0 ? (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={this.countTotalFeedback()}
              positivePercentage={this.countPositiveFeedbackPercentage()}
            />
          ) : (
            <Notification message="There is no feedback" />
          )}
        </Section>
      </div>
    );
  }
}
