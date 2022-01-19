import React from "react";
import "components/InterviewerList.scss"
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map(item => {
          return <InterviewerListItem
            key={item.id}
            name={item.name}
            id={item.id}
            avatar={item.avatar}
            setInterviewer={props.setInterviewer}
            selected={item.id === props.interviewer}
          />
        })}
      </ul>
    </section>
  );
}
