import React from "react";

export const Product = ({
  name,
  description,
  category,
  price,
  discount,
  id,
}) => {
  return (
    <div>
      <div>
        <h4>{name}</h4>
        <h5>{category}</h5>
        <p>{description}</p>
        <p>Price: {price}, Discount: {discount}</p>
      </div>
        <button>
            Update
        </button>
        <button className="btn">
          Delete
        </button>
      </div>
  );
};