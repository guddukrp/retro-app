import React, { useEffect, useState } from "react";
import "./Home.css";
import { apiHandler } from "../services/ApiHandler";
import { TableTypes } from "../common/constant";

export default function Home() {
  const [items, setItems] = useState<TableTypes<'retro'>[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    "Went Well": "",
    "To Improve": "",
    "Action Items": "",
  });

  const categories = ["Went Well", "To Improve", "Action Items"];

  // Load items
  const loadItems = async () => {
    const data = await apiHandler.getAll();
    setItems(data);
  };

  // Add new item
  const handleAddItem = async (category: string) => {
    const content = inputs[category].trim();
    if (!content) return;

    const success = await apiHandler.add(content, category);
    if (success) {
      setInputs((prev) => ({ ...prev, [category]: "" }));
      loadItems();
    }
  };

  // Toggle theme
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
    loadItems();
  }, []);

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">Team Retrospective</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Kanban Board */}
      <div className="board">
        {categories.map((cat) => (
          <div key={cat} className="column">
            <h2 className="category-title">{cat}</h2>

            {/* Column input */}
            <div className="column-form">
              <input
                className="column-input"
                placeholder={`Add a comment to "${cat}"`}
                value={inputs[cat]}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, [cat]: e.target.value }))
                }
              />
              <button className="button small" onClick={() => handleAddItem(cat)}>
                Add
              </button>
            </div>

            <ul className="item-list">
              {items
                .filter((i) => i.category === cat)
                .map((i) => (
                  <li key={i.id} className="card">
                    {i.content}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
