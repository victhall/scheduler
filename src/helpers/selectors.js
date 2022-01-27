function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(item => item.name === day);
  if (filteredDays.length !== 0) {
    return filteredDays[0].appointments.map(id => state.appointments[id])
  } else {
    return [];
  }
};

function getInterviewersForDay(state, day) {
  const filteredDay = state.days.find(item => item.name === day);
  if (filteredDay && filteredDay.interviewers.length !== 0) {
    return filteredDay.interviewers.map(e => state.interviewers[e])
  } else {
    return [];
  }
};

function getInterview(state, interview) {
  const obj = {};
  if (!interview) {
    return null;
  } else {
    obj.student = interview.student;
    obj.interviewer = state.interviewers[interview.interviewer];
  }
  return obj;
};

export { getAppointmentsForDay, getInterview, getInterviewersForDay };
