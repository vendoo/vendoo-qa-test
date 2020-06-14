// Libs
import React from "react";
import Link from "next/link";

// Components
import ItemForm from "../../components/items/itemForm";

const CreateItem = ({}) => {
  return (
    <div>
      <Link href="/inventory">
        <a>Back to Inventory</a>
      </Link>
      <h1>Create Item</h1>
      <ItemForm
        formType="create"
        handleSubmit={(formValues) => {
          console.log(formValues);
        }}
      />
    </div>
  );
  a;
};

export default CreateItem;
