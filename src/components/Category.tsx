import { useState } from "react";
import styled from "styled-components";
import { useCategoryStore, useSearchStore } from "../store";
import categories from "../data/categoryData";

const Category = () => {
  const store = useCategoryStore();
  const searchStore = useSearchStore();
  const [text, setText] = useState<string>("");

  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <h2>Category</h2>
      {categories.map((cat: string) => (
        <H3
          style={{
            color: text === cat ? "black" : "#616161",
            fontSize: text === cat ? "18px" : "",
          }}
          onClick={() => {
            setText(cat);
            searchStore.setSearch("");
            store.setCategory(cat);
          }}
          key={cat}
        >
          {cat}
        </H3>
      ))}
    </div>
  );
};

export default Category;

const H3 = styled.h3`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
