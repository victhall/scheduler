function getAppointmentsForDay(state, day) {
  const filteredDays = state.days.filter(item => item.name === day);
  if (filteredDays.length !== 0) {
    return filteredDays[0].appointments.map(id => state.appointments[id])
  } else {
    return []; 
  }
};


export { getAppointmentsForDay };
