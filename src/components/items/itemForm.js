// Libs
import React, { useState } from "react";

const ItemForm = ({ handleSubmit, formType, initValues }) => {
  const [formValues, setFormValues] = useState(
    () =>
      initValues || {
        photos: [],
        title: "",
        description: "",
        price: "",
      }
  );
  const [fileUploader, setFileUploader] = useState({ status: "idle" });

  const handleOnChange = (value) => (evt) =>
    setFormValues({ ...formValues, [value]: evt.currentTarget.value });

  const handleOnFileChange = (evt) => {
    console.log();
    const file = evt.currentTarget.files[0];
    if (formValues.photos.length + 1 > 8) return;
    setFileUploader({ status: "uploading" });

    // Upload to storage here
    setTimeout(() => {
      setFileUploader({ status: "idle" });
    }, 3000);
  };

  return (
    <form
      onSubmit={(evt) => {
        evt.preventDefault();
        handleSubmit(formValues);
      }}
    >
      {fileUploader.status === "idle" && (
        <div style={{ marginBottom: 10 }}>
          <label>Photos ({formValues.photos.length})</label>
          {formValues.photos.map((url) => (
            <div
              key={url}
              style={{
                width: 100,
                height: 100,
                background: `url(${url})`,
                backgroundSize: "cover",
                border: "1px solid gray",
              }}
            />
          ))}
          <div>
            <input type="file" onChange={handleOnFileChange} />
          </div>
        </div>
      )}
      {fileUploader.status === "uploading" && <div>Uploading Photo...</div>}
      <div>
        <input
          type="text"
          id="title"
          placeholder="Title"
          onChange={handleOnChange("title")}
          value={formValues.title}
        />
      </div>
      <div>
        <textarea
          id="description"
          placeholder="Description"
          onChange={handleOnChange("description")}
          value={formValues.description}
        />
      </div>
      <div>
        <input
          type="text"
          id="price"
          placeholder="Price $$$"
          onChange={handleOnChange("price")}
          value={formValues.price}
        />
      </div>
      <button>{formType === "edit" ? "Save" : "Create"}</button>
    </form>
  );
};

export default ItemForm;
