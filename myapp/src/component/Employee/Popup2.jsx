import React, { useState } from 'react';
import "./Popup2.css";

const Popup = ({ onClose }) => {
  const [note, setNote] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [selectedTask, setSelectedTask] = useState('');

  const handleNoteChange = (e) => {
    setNote(e.target.value);
  };

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleTaskChange = (e) => {
    setSelectedTask(e.target.value);
  };

  const handleSubmit = () => {
    // Here you can handle the submission of the note, project, and task
    // For now, let's just log them to the console
    console.log('Note:', note);
    console.log('Selected Project:', selectedProject);
    console.log('Selected Task:', selectedTask);
    onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <h2>Daily Work Progress</h2>
        <select value={selectedProject} onChange={handleProjectChange}>
          <option value="">Select Project</option>
          <option value="project1">Project 1</option>
          <option value="project2">Project 2</option>
          {/* Add more project options as needed */}
        </select>
        <select value={selectedTask} onChange={handleTaskChange}>
          <option value="">Select Task</option>
          <option value="task1">Task 1</option>
          <option value="task2">Task 2</option>
          {/* Add more task options as needed */}
        </select>
        <textarea
          value={note}
          onChange={handleNoteChange}
          placeholder="Enter your note here..."
        ></textarea>
        <div className="buttons">
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
