// Libs
import React, { useState, useEffect } from "react";
import Link from "next/link";

import Item from "../components/inventory/Item";

const Inventory = ({}) => {
  const [pageState, setPageState] = useState({ status: "idle" });

  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    // Load inventory details here
    setTimeout(() => {
      if (mounted) {
        setItems([""])
        setPageState({ status: "loaded" });
      }
    }, 2000);
    return () => (mounted = false);
  }, []);

  return (
    <div>
      <h1>Inventory</h1>
      <p>
        <Link href="/items/create">
          <a>Create new item +</a>
        </Link>
      </p>
      {pageState.status !== "loaded" && <div>Loading Inventory...</div>}

      {pageState.status === "loaded" && (
        <div>
          <h4>Your items ({items.length})</h4>
          {items.map((details, index) => (
            <Item key={index} details={details} id={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Inventory;
