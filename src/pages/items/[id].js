// Libs
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import withAppTemplate from "../../templates/withApp";

// Components
import ItemForm from "../../components/items/itemForm";
import Firebase from "../../firebase/app";
import { useUser } from "../../context/user";

const EditItem = ({}) => {
  const router = useRouter();
  const user = useUser();
  const { id } = router.query;
  const [pageState, setPageState] = useState({ status: "idle" });
  const [initValues, setinitValues] = useState({
    photos: [],
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    let mounted = true;
    // Load inventory details here
    if (user.status === "loading") return;
    if(!id) return;
    if (user.uid) {
      Firebase.firestore
        .doc(`users/${user.uid}/items/${id}`)
        .get()
        .then((snap) => {
          if (!mounted) return;
          setinitValues(snap.data());
          setPageState({ status: "loaded" });
        });
    } else {
      setPageState({ status: "error" });
    }
    return () => (mounted = false);
  }, [user.uid, user.status, id]);

  return (
    <div>
      <Link href="/inventory">
        <a>Back to Inventory</a>
      </Link>
      <h1>Edit Item</h1>
      {pageState.status !== "loaded" && <div>Loading Item...</div>}
      {pageState.status === "loaded" && (
        <ItemForm
          formType="edit"
          initValues={initValues}
          handleSubmit={async (formValues) => {
            await Firebase.actions.updateItem(id, {
              photos: formValues.photos,
              title: formValues.title,
              price: formValues.price,
              description: formValues.description,
            });
          }}
        />
      )}
    </div>
  );
};

export default withAppTemplate(EditItem);
