import { useState, useEffect } from "react";
import "./styles.css";

function GoalTracker() {
  const [goal, setGoal] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("Personal");
  const [goals, setGoals] = useState(() => {
    try {
      const saved = localStorage.getItem("goals");
      if (saved) {
        const parsedGoals = JSON.parse(saved);
        return parsedGoals.map(g => ({
          ...g,
          category: g.category || "Personal",
          isArchived: g.isArchived || false,
          subTasks: g.subTasks || []
        }));
      }
    } catch (e) {
      console.error("Failed to parse goals from localStorage:", e);
    }
    return [];
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [theme, setTheme] = useState("light");
  const [sortKey, setSortKey] = useState("priority");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterCategory, setFilterCategory] = useState("All");
  const [showArchived, setShowArchived] = useState(false);

  const [subTaskInput, setSubTaskInput] = useState({});
  const [editMode, setEditMode] = useState(null);
  const [editingSubtask, setEditingSubtask] = useState(null);
  const [subtaskEditText, setSubtaskEditText] = useState("");

  useEffect(() => {
    if ("Notification" in window && Notification.permission !== "denied") {
      Notification.requestPermission();
    }
    const today = new Date().toISOString().split("T")[0];
    goals.forEach(g => {
      if (g.dueDate === today && !g.completed && !g.isArchived && Notification.permission === "granted") {
        new Notification("Goal Due Today!", {
          body: `Don't forget: "${g.text}"!`,
        });
      }
    });
  }, [goals]);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    document.body.className = theme === "dark" ? "dark" : "";
  }, [theme]);

  const handleAddGoal = () => {
    if (!goal.trim()) return;
    const newGoal = {
      id: Date.now(),
      text: goal,
      dueDate,
      priority,
      category,
      completed: false,
      subTasks: [],
      isArchived: false,
    };
    setGoals([newGoal, ...goals]);
    setGoal("");
    setDueDate("");
    setPriority("Medium");
    setCategory("Personal");
  };

  const toggleComplete = (id) => {
    setGoals(
      goals.map((g) => {
        if (g.id === id) {
          const newCompletedStatus = !g.completed;
          const updatedSubTasks = (g.subTasks || []).map(st => ({
            ...st,
            completed: newCompletedStatus
          }));
          return { ...g, completed: newCompletedStatus, subTasks: updatedSubTasks };
        }
        return g;
      })
    );
  };

  const confirmDelete = (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this goal?");
    if (isConfirmed) {
      deleteGoal(id);
    }
  };

  const deleteGoal = (id) => {
    setGoals(goals.filter((g) => g.id !== id));
  };

  const handleAddSubTask = (goalId) => {
    const text = subTaskInput[goalId];
    if (!text || !text.trim()) return;

    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          const subTasks = g.subTasks || [];
          return {
            ...g,
            subTasks: [
              ...subTasks,
              { id: Date.now(), text, completed: false },
            ],
          };
        }
        return g;
      })
    );
    setSubTaskInput({ ...subTaskInput, [goalId]: "" });
  };

  const toggleSubTaskComplete = (goalId, subTaskId) => {
    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          const updatedSubTasks = (g.subTasks || []).map((st) =>
            st.id === subTaskId ? { ...st, completed: !st.completed } : st
          );
          const allCompleted = updatedSubTasks.length > 0 && updatedSubTasks.every((st) => st.completed);
          return { ...g, subTasks: updatedSubTasks, completed: allCompleted };
        }
        return g;
      })
    );
  };

  const deleteSubTask = (goalId, subTaskId) => {
    setGoals(
      goals.map((g) => {
        if (g.id === goalId) {
          const updatedSubTasks = (g.subTasks || []).filter((st) => st.id !== subTaskId);
          const allCompleted = updatedSubTasks.length > 0 && updatedSubTasks.every((st) => st.completed);
          return { ...g, subTasks: updatedSubTasks, completed: allCompleted };
        }
        return g;
      })
    );
  };

  const editSubtask = (goalId, subtaskId, text) => {
    setEditingSubtask({ goalId, subtaskId });
    setSubtaskEditText(text);
  };

  const saveSubtask = () => {
    if (!editingSubtask || !subtaskEditText.trim()) return;
    setGoals(
      goals.map((g) => {
        if (g.id === editingSubtask.goalId) {
          const updatedSubTasks = (g.subTasks || []).map((st) =>
            st.id === editingSubtask.subtaskId
              ? { ...st, text: subtaskEditText }
              : st
          );
          return { ...g, subTasks: updatedSubTasks };
        }
        return g;
      })
    );
    setEditingSubtask(null);
    setSubtaskEditText("");
  };

  const setReminder = (goalText, dueDate) => {
    const message = `Reminder set for goal: ${goalText}${
      dueDate ? ` (Due: ${dueDate})` : ""
    }`;
    alert(message);
  };

  const editGoal = (goal) => {
    setEditMode(goal.id);
  };

  const saveGoal = (id, newText, newDueDate, newPriority) => {
    setGoals(
      goals.map((g) =>
        g.id === id
          ? { ...g, text: newText, dueDate: newDueDate, priority: newPriority }
          : g
      )
    );
    setEditMode(null);
  };

  const archiveGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, isArchived: true } : g));
  };

  const restoreGoal = (id) => {
    setGoals(goals.map(g => g.id === id ? { ...g, isArchived: false } : g));
  };

  const exportGoals = () => {
    const dataStr = JSON.stringify(goals, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "goals_export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importGoals = (event) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      try {
        const importedGoals = JSON.parse(e.target.result);
        if (Array.isArray(importedGoals)) {
          setGoals(importedGoals);
          alert("Goals imported successfully!");
        } else {
          alert("Invalid JSON file format.");
        }
      } catch (error) {
        alert("Failed to read and parse file.");
      }
    };
    if (event.target.files[0]) {
      fileReader.readAsText(event.target.files[0]);
    }
  };

  const filteredGoals = goals.filter((g) => {
    const isMatchingSearch = g.text.toLowerCase().includes(searchTerm.toLowerCase());
    const isMatchingCategory = filterCategory === "All" || g.category === filterCategory;
    const isArchivedStatus = showArchived ? g.isArchived : !g.isArchived;

    return isMatchingSearch && isMatchingCategory && isArchivedStatus;
  });

  const sortedGoals = [...filteredGoals].sort((a, b) => {
    if (sortKey === "priority") {
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      const aValue = priorityOrder[a.priority];
      const bValue = priorityOrder[b.priority];
      return sortOrder === "desc" ? bValue - aValue : aValue - bValue;
    }

    if (sortKey === "dueDate") {
      if (!a.dueDate && !b.dueDate) return 0;
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      const comparison = dateA.getTime() - dateB.getTime();
      return sortOrder === "desc" ? -comparison : comparison;
    }

    const textA = a.text.toLowerCase();
    const textB = b.text.toLowerCase();
    const comparison = textA.localeCompare(textB);
    return sortOrder === "desc" ? -comparison : comparison;
  });

  const priorityLabels = {
    High: "🔥 High",
    Medium: "⚡ Medium",
    Low: "💧 Low",
  };

  const getPriorityStyle = (p) => {
    if (p === "High") return "high-priority";
    if (p === "Medium") return "medium-priority";
    if (p === "Low") return "low-priority";
    return "";
  };

  const totalGoals = goals.filter(g => !g.isArchived).length;
  const completedGoals = goals.filter(g => g.completed && !g.isArchived).length;
  const pendingGoals = totalGoals - completedGoals;
  const completionPercentage = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;
  
  const getProgress = (subTasks) => {
    const tasks = subTasks || [];
    if (tasks.length === 0) return 0;
    const completed = tasks.filter((st) => st.completed).length;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="container">
      <div className="theme-toggle">
        <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
          {theme === "light" ? "🌙 Dark Mode" : "🌞 Light Mode"}
        </button>
      </div>

      <h1 className="title">🎯 Goal Tracker</h1>

      <div className="stats-dashboard">
        <div className="stat-card">
          <h4>Total Goals</h4>
          <p>{totalGoals}</p>
        </div>
        <div className="stat-card completed">
          <h4>Completed</h4>
          <p>{completedGoals}</p>
        </div>
        <div className="stat-card pending">
          <h4>Pending</h4>
          <p>{pendingGoals}</p>
        </div>
        <div className="stat-card percentage">
          <h4>Completion</h4>
          <p>{completionPercentage}%</p>
        </div>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter your goal..."
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Personal</option>
            <option>Work</option>
            <option>Study</option>
            <option>Health</option>
        </select>
        <button className="add-btn" onClick={handleAddGoal}>
          ➕ Add Goal
        </button>
      </div>

      <div className="search-sort-filter">
        <input
          type="text"
          placeholder="🔍 Search goals..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select onChange={(e) => setSortKey(e.target.value)} value={sortKey}>
          <option value="priority">Sort by Priority</option>
          <option value="dueDate">Sort by Due Date</option>
          <option value="text">Sort Alphabetically</option>
        </select>
        <button className="sort-btn" onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}>
          {sortOrder === "asc" ? "⬇️ Asc" : "⬆️ Desc"}
        </button>
        <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
            <option>All</option>
            <option>Personal</option>
            <option>Work</option>
            <option>Study</option>
            <option>Health</option>
        </select>
        <button className="archive-toggle-btn" onClick={() => setShowArchived(!showArchived)}>
          {showArchived ? "↩️ Show Active" : "📦 Show Archived"}
        </button>
      </div>

      <div className="goal-list">
        {sortedGoals.length === 0 && (
          <p className="no-goals-message">{showArchived ? "No archived goals." : "No active goals. Add a new goal to get started!"}</p>
        )}
        {sortedGoals.map((g) => (
          <div
            key={g.id}
            className={`goal-item ${g.completed ? "completed" : ""}`}
          >
            <div className="goal-content">
              {editMode === g.id ? (
                <div className="edit-goal-form">
                  <input
                    type="text"
                    value={g.text}
                    onChange={(e) => setGoals(goals.map(goal => goal.id === g.id ? {...goal, text: e.target.value} : goal))}
                  />
                  <input
                    type="date"
                    value={g.dueDate}
                    onChange={(e) => setGoals(goals.map(goal => goal.id === g.id ? {...goal, dueDate: e.target.value} : goal))}
                  />
                  <select
                    value={g.priority}
                    onChange={(e) => setGoals(goals.map(goal => goal.id === g.id ? {...goal, priority: e.target.value} : goal))}
                  >
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                  </select>
                  <button className="save-btn" onClick={() => saveGoal(g.id, g.text, g.dueDate, g.priority)}>
                    💾 Save
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="goal-text">{g.text}</h3>
                  <div className="goal-meta">
                    {g.dueDate && (
                      <span className="goal-date">📅 {g.dueDate}</span>
                    )}
                    <span className={`goal-priority ${getPriorityStyle(g.priority)}`}>
                      {priorityLabels[g.priority]}
                    </span>
                    <span className="goal-category">
                        📂 {g.category}
                    </span>
                  </div>
                  <div className="progress-container">
                    <div
                      className="progress-bar"
                      style={{ width: `${getProgress(g.subTasks)}%` }}
                    ></div>
                    <div className="progress-text">
                      {getProgress(g.subTasks)}% Complete
                    </div>
                  </div>
                  <div className="sub-tasks-list">
                    {(g.subTasks || []).map((st) => (
                      <div key={st.id} className="sub-task-item">
                        {editingSubtask?.subtaskId === st.id ? (
                          <>
                            <input
                              type="text"
                              value={subtaskEditText}
                              onChange={(e) => setSubtaskEditText(e.target.value)}
                            />
                            <button className="save-subtask-btn" onClick={saveSubtask}>
                              💾
                            </button>
                          </>
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              checked={st.completed}
                              onChange={() => toggleSubTaskComplete(g.id, st.id)}
                              disabled={g.completed}
                            />
                            <span className={st.completed ? "completed-task" : ""}>{st.text}</span>
                            <button className="edit-subtask-btn" onClick={() => editSubtask(g.id, st.id, st.text)}>
                              ✏️
                            </button>
                            <button className="delete-sub-task-btn" onClick={() => deleteSubTask(g.id, st.id)}>
                              🗑️
                            </button>
                          </>
                        )}
                      </div>
                    ))}
                    <div className="add-sub-task-group">
                      <input
                        type="text"
                        placeholder="Add a sub-task..."
                        value={subTaskInput[g.id] || ""}
                        onChange={(e) =>
                          setSubTaskInput({ ...subTaskInput, [g.id]: e.target.value })
                        }
                        onKeyPress={(e) => e.key === "Enter" && handleAddSubTask(g.id)}
                      />
                      <button onClick={() => handleAddSubTask(g.id)}>
                        ➕
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="goal-actions">
              {showArchived ? (
                <button className="restore-btn" onClick={() => restoreGoal(g.id)}>↩️ Restore</button>
              ) : (
                <>
                  {editMode !== g.id && (
                    <button className="edit-btn" onClick={() => editGoal(g)}>✏️ Edit</button>
                  )}
                  <button className="complete-btn" onClick={() => toggleComplete(g.id)}>
                    {g.completed ? "✅ Undo" : "✅ Complete"}
                  </button>
                  <button className="archive-btn" onClick={() => archiveGoal(g.id)}>📦 Archive</button>
                  <button className="delete-btn" onClick={() => confirmDelete(g.id)}>🗑️ Delete</button>
                  <button
                    className="reminder-btn"
                    onClick={() => setReminder(g.text, g.dueDate)}
                  >
                    🔔 Reminder
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="export-import-group">
        <button className="export-btn" onClick={exportGoals}>📤 Export Goals</button>
        <label className="import-btn">
            📥 Import Goals
            <input type="file" accept=".json" onChange={importGoals} className="file-input" />
        </label>
      </div>
    </div>
  );
}

export default GoalTracker;