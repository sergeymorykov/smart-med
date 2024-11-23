import React, { useState } from "react";
import "./PatientAnalysisPage.css";

const PatientAnalysisPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    pulse: "",
    breathingRate: "",
    saturation: "",
    systolicPressure: "",
    diastolicPressure: "",
    heartRateECG: "",
  });

  const [emailInput, setEmailInput] = useState(""); // Для добавления email
  const [emails, setEmails] = useState([]); // Список добавленных email
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Добавление email в список
  const handleAddEmail = () => {
    if (emailInput.trim() === "") {
      setError("Email не может быть пустым.");
      return;
    }

    if (emails.includes(emailInput)) {
      setError("Этот email уже добавлен.");
      return;
    }

    setEmails((prev) => [...prev, emailInput]);
    setEmailInput("");
    setError("");
  };

  // Обработка изменений других полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Отправка формы
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email) {
      setError("Выберите email из списка.");
      return;
    }

    setError("");
    setSuccessMessage("Данные успешно отправлены!");
    console.log("Submitted Data:", formData);

    // Очистка формы (опционально)
    setFormData({
      email: "",
      pulse: "",
      breathingRate: "",
      saturation: "",
      systolicPressure: "",
      diastolicPressure: "",
      heartRateECG: "",
    });
  };

  return (
    <div className="patient-analysis-form">
      <h2>Заполнение данных анализов пациента</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {/* Блок добавления email */}
        <div className="form-field">
          <label>Выберите Email пациента:</label>
          <div className="email-input-group">
            <select
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="email-select"
            >
              <option value="">-- Выберите email --</option>
              {emails.map((email, index) => (
                <option key={index} value={email}>
                  {email}
                </option>
              ))}
            </select>            
          </div>
        </div>

        {/* Остальные поля */}
        <div className="form-field">
          <label>Пульс (уд/мин):</label>
          <input
            type="number"
            name="pulse"
            value={formData.pulse}
            onChange={handleChange}
            placeholder="Введите пульс"
          />
        </div>

        <div className="form-field">
          <label>Частота дыхательных движений (в мин):</label>
          <input
            type="number"
            name="breathingRate"
            value={formData.breathingRate}
            onChange={handleChange}
            placeholder="Введите частоту дыхания"
          />
        </div>

        <div className="form-field">
          <label>Сатурация (%):</label>
          <input
            type="number"
            name="saturation"
            value={formData.saturation}
            onChange={handleChange}
            placeholder="Введите сатурацию"
          />
        </div>

        <div className="form-field">
          <label>Систолическое давление (мм рт. ст.):</label>
          <input
            type="number"
            name="systolicPressure"
            value={formData.systolicPressure}
            onChange={handleChange}
            placeholder="Введите систолическое давление"
          />
        </div>

        <div className="form-field">
          <label>Диастолическое давление (мм рт. ст.):</label>
          <input
            type="number"
            name="diastolicPressure"
            value={formData.diastolicPressure}
            onChange={handleChange}
            placeholder="Введите диастолическое давление"
          />
        </div>

        <div className="form-field">
          <label>Частота сердечных сокращений из ЭКГ (уд/мин):</label>
          <input
            type="number"
            name="heartRateECG"
            value={formData.heartRateECG}
            onChange={handleChange}
            placeholder="Введите ЧСС из ЭКГ"
          />
        </div>

        <button type="submit" className="submit-button">
          Отправить данные
        </button>
      </form>
    </div>
  );
};

export default PatientAnalysisPage;
