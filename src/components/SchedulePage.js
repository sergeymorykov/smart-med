import React, { useState } from "react";
import "./SchedulePage.css";

// Исходные данные о записях пациентов
const initialSchedule = {
  Monday: [
    { time: "09:00", patient: null, email: null },
    { time: "10:00", patient: "Иванов И.И.", email: "ivanov@example.com" },
    { time: "11:00", patient: null, email: null },
    { time: "12:00", patient: null, email: null },
    { time: "13:00", patient: "Петров П.П.", email: "petrov@example.com" },
    { time: "14:00", patient: null, email: null },
    { time: "15:00", patient: "Сидоров С.С.", email: "sidorov@example.com" },
    { time: "16:00", patient: null, email: null },
    { time: "17:00", patient: null, email: null }
  ],
  Tuesday: [
    { time: "09:00", patient: "Петров П.П.", email: "petrov@example.com" },
    { time: "10:00", patient: null, email: null },
    { time: "11:00", patient: "Сидоров С.С.", email: "sidorov@example.com" },
    { time: "12:00", patient: null, email: null },
    { time: "13:00", patient: "Козлов К.К.", email: "kozlova@example.com" },
    { time: "14:00", patient: null, email: null },
    { time: "15:00", patient: null, email: null },
    { time: "16:00", patient: "Григорьев Г.Г.", email: "grigoryev@example.com" },
    { time: "17:00", patient: null, email: null }
  ],
  Wednesday: [
    { time: "09:00", patient: null, email: null },
    { time: "10:00", patient: "Михайлов М.М.", email: "mihailov@example.com" },
    { time: "11:00", patient: "Козлов К.К.", email: "kozlova@example.com" },
    { time: "12:00", patient: null, email: null },
    { time: "13:00", patient: null, email: null },
    { time: "14:00", patient: "Григорьев Г.Г.", email: "grigoryev@example.com" },
    { time: "15:00", patient: null, email: null },
    { time: "16:00", patient: null, email: null },
    { time: "17:00", patient: "Иванова И.И.", email: "ivanova@example.com" }
  ],
  Thursday: [
    { time: "09:00", patient: null, email: null },
    { time: "10:00", patient: "Григорьев Г.Г.", email: "grigoryev@example.com" },
    { time: "11:00", patient: "Петров П.П.", email: "petrov@example.com" },
    { time: "12:00", patient: null, email: null },
    { time: "13:00", patient: null, email: null },
    { time: "14:00", patient: null, email: null },
    { time: "15:00", patient: "Сидоров С.С.", email: "sidorov@example.com" },
    { time: "16:00", patient: null, email: null },
    { time: "17:00", patient: null, email: null }
  ],
  Friday: [
    { time: "09:00", patient: "Иванова И.И.", email: "ivanova@example.com" },
    { time: "10:00", patient: null, email: null },
    { time: "11:00", patient: "Михайлов М.М.", email: "mihailov@example.com" },
    { time: "12:00", patient: null, email: null },
    { time: "13:00", patient: "Сидоров С.С.", email: "sidorov@example.com" },
    { time: "14:00", patient: null, email: null },
    { time: "15:00", patient: null, email: null },
    { time: "16:00", patient: "Петров П.П.", email: "petrov@example.com" },
    { time: "17:00", patient: null, email: null }
  ]
};

// Компонент для записи пациентов
const AppointmentScheduler = () => {
  const [schedule, setSchedule] = useState(initialSchedule);

  const bookAppointment = (day, time) => {
    const patientName = prompt("Введите имя пациента:");
    const patientEmail = prompt("Введите email пациента:");

    if (patientName && patientEmail) {
      const updatedSchedule = { ...schedule };
      const daySchedule = updatedSchedule[day];
      const appointmentIndex = daySchedule.findIndex(
        (appointment) => appointment.time === time
      );

      if (appointmentIndex !== -1 && !daySchedule[appointmentIndex].patient) {
        daySchedule[appointmentIndex].patient = patientName;
        daySchedule[appointmentIndex].email = patientEmail;
        setSchedule(updatedSchedule);
      } else {
        alert("В это время уже есть запись!");
      }
    }
  };

  return (
    <div className="container">
      <h1>Запись на прием - SmartMed</h1>
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Время</th>
            <th>Понедельник</th>
            <th>Вторник</th>
            <th>Среда</th>
            <th>Четверг</th>
            <th>Пятница</th>
          </tr>
        </thead>
        <tbody>
          {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
            <tr key={time}>
              <td>{time}</td>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                <td key={day}>
                  {schedule[day].find((slot) => slot.time === time).patient ? (
                    <>
                      <div>{schedule[day].find((slot) => slot.time === time).patient}</div>
                      <div>{schedule[day].find((slot) => slot.time === time).email}</div>
                    </>
                  ) : (
                    <button onClick={() => bookAppointment(day, time)}>Записаться</button>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentScheduler;
