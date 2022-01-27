import { useEffect, useState } from "react";
import { getAppointmentsForDay } from "helpers/selectors";
import axios from "axios";

export default function useApplicationData() {

  function updateSpots() {
    setState((prev) => {
      const appointForDays = getAppointmentsForDay(prev, prev.day);
      const emptySpots = appointForDays.filter((appoint) => !appoint.interview).length;
      const day = prev.days.find(dayObj => dayObj.name === prev.day);
      const dayItem = prev.days.indexOf(day);
      prev.days[dayItem] = { ...day, spots: emptySpots }
      return {
        ...prev,
        days: [...prev.days],
      }
    })
  }

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }))
    }
    )
  }, [])

  function setDay(dayName) {
    setState({ ...state, day: dayName })
  }

  function bookInterview(id, interview) {
    console.log(id, interview);

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        console.log(res);
        setState((prev) => ({ ...prev, appointments }));
        updateSpots()
      })
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }
    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    return axios.delete(`/api/appointments/${id}`, appointment)
      .then(() => { setState({ ...state, appointments })
      updateSpots(); })
      
  }
  return { state, setDay, bookInterview, cancelInterview };

}