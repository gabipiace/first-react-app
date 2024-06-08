import logo from "./logo.svg";
import { useState, useEffect } from "react";
import "./App.css";
import "./index.css";

export default function App() {
  const [items, setItems] = useState([]);

  function onClear() {
    //set list to empty
    setItems((items) => []);
  }

  function handleAddItem(item) {
    //add items to end of array
    setItems((items) => [...items, item]);
  }

  function handleToggleItem(id) {
    //returns a new list of items with the item with the id that
    //matches what is passed in the function with an updated property (in this case "done")
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item
      )
    );
  }

  return (
    <div className="bg-[#3b4a6b] max-w-sm mx-auto shadow-lg rounded-lg border border-black p-4">
      <h1 className="text-2xl text-white font-bold mb-4 text-center">
        To Do List
      </h1>
      <div className="text-center space-y-2">
        <button
          className="p-2 rounded-md bg-gray-400 text-white hover:bg-[#f8da5b]"
          onClick={onClear}
        >
          Clear List
        </button>
        <ItemList items={items} onToggleItem={handleToggleItem} />
        <AddItemForm onAddItem={handleAddItem} />
      </div>
    </div>
  );
}

function ItemList({ items, onToggleItem }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <Item item={item} onToggleItem={onToggleItem} key={item.id} />
      ))}
    </ul>
  );
}

function Item({ item, onToggleItem }) {
  const colorPalette = ["#c50d66", "#f07810", "#4f81c7", "#5be7a9", "#9d53c3"];

  // Generate and store the random color
  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    function getRandColor() {
      const randomIndex = Math.floor(Math.random() * colorPalette.length);
      return colorPalette[randomIndex];
    }
    setBgColor(getRandColor());
  }, []); // Empty dependency array ensures this runs only once

  return (
    <li
      className="p-4 flex justify-between items-center rounded-md"
      style={{ backgroundColor: bgColor }}
    >
      <input
        type="checkbox"
        checked={item.done}
        onChange={() => onToggleItem(item.id)}
        className="accent-[#fcff82]"
      />
      <span
        className="text-[#f5f4e8]"
        style={item.done ? { textDecoration: "line-through" } : {}}
      >
        {item.title}
      </span>
    </li>
  );
}

function AddItemForm({ onAddItem }) {
  const [title, setTitle] = useState("");
  function handleSubmit(event) {
    event.preventDefault();

    if (!title) return;
    const id = crypto.randomUUID();
    const newItem = { title, done: false, id };

    onAddItem(newItem); //passing item details to add item function
    setTitle("");
  }
  return (
    <form className="space-x-4" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="p-1 border border-white rounded-md focus:outline-none"
      ></input>
      <button className="p-2 rounded-md bg-gray-400 text-white hover:bg-[#f8da5b]">
        Add
      </button>
    </form>
  );
}
