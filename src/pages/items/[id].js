// Libs
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import ItemForm from "../../components/items/itemForm";

const EditItem = ({}) => {
  const router = useRouter();
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
    // Load item details here
    setTimeout(() => {
      if (mounted) {
        setinitValues({
          photos: [],
          title: "",
          description: "",
          price: "",
        });
        setPageState({ status: "loaded" });
      }
    }, 2000);
    return () => (mounted = false);
  }, []);

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
          handleSubmit={(formValues) => {
            console.log(formValues);
          }}
        />
      )}
    </div>
  );
};

export default EditItem;
