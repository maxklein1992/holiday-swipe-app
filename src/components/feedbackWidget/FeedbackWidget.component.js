import React from "react";
import { connect } from "react-redux";

import styles from "./FeedbackWidget.module.scss";
import * as feedbackActions from "../../redux/actions/feedback";
import Button from "../../elements/button";
import Input from "../../elements/input";

const FeedbackWidget = ({ userInfo, addFeedback, className }) => {
  const fullName = userInfo.full_name.split(" ");
  const firstName = fullName[0];

  const [feedbackIsSubmitting, setFeedbackIsSubmitting] = React.useState(false);
  const [feedback, setFeedback] = React.useState("");

  const submitFeedback = async ({ feedback, name }) => {
    setFeedbackIsSubmitting(true);
    const response = await addFeedback({ feedback, name });
    if (response) {
      setFeedback("");
      setFeedbackIsSubmitting(false);
      alert("I received your feedback, thanks! Ciao, Max!");
    }
  };

  const classNames = [styles.component, className].join(" ").trim();

  return (
    <div className={classNames}>
      <p className={styles.header}>Feedback</p>
      <p className={styles.title}>Please let me know, {firstName}:</p>
      <Input
        className={styles.input}
        placeholder="what do you like about the product and what do you miss?"
        value={feedback}
        name="feedback"
        onChange={(value) => setFeedback(value)}
      />
      <Button
        onClick={() => submitFeedback({ feedback, name: userInfo.full_name })}
        variant="primary"
        disabled={!feedback}
        size="big"
        loading={feedbackIsSubmitting}
      >
        Send
      </Button>
    </div>
  );
};

export default connect(
  (state) => ({
    userInfo: state.user.personal_data,
  }),
  (dispatch) => ({
    addFeedback: ({ feedback, name }) =>
      dispatch(feedbackActions.addFeedback({ feedback, name })),
  })
)(FeedbackWidget);
