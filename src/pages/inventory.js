// Libs
import React, { useState, useEffect } from "react";
import Link from "next/link";
import matchSorter from "match-sorter";

import { useUser } from "../context/user";
import Item from "../components/inventory/Item";
import withAppTemplate from "../templates/withApp";
import Search from "../components/inventory/Search";

import Firebase from "../firebase/app";

const Inventory = ({}) => {
  const user = useUser();
  const [pageState, setPageState] = useState({ status: "loading" });
  const [searchState, setSearchState] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    let mounted = true;
    // Load inventory details here
    if (user.status === "loading" || !user.uid) return;
    Firebase.firestore
      .collection(`users/${user.uid}/items`)
      .get()
      .then((res) => {
        if (!mounted) return;
        setItems(
          res.docs.map((snap) => {
            return {
              ...snap.data(),
              id: snap.id,
            };
          })
        );
        setPageState({ status: "loaded" });
      });
    return () => (mounted = false);
  }, [user.uid, user.status]);

  const searchedItems = matchSorter(items, searchState, { keys: ["title"] });

  return (
    <div>
      <h1>Inventory</h1>
      <p>
        <Link href="/items/create">
          <a>Create new item +</a>
        </Link>
      </p>
      {pageState.status === "loading" && <div>Loading Inventory...</div>}
      {pageState.status === "error" && <div>An Error Occured</div>}
      {pageState.status === "loaded" && (
        <div>
          <Search state={[searchState, setSearchState]} />
          <h4>Your items ({searchedItems.length + "/" + items.length})</h4>
          {searchedItems.map((details) => (
            <Item key={details.id} details={details} />
          ))}
        </div>
      )}
    </div>
  );
};

export default withAppTemplate(Inventory);
