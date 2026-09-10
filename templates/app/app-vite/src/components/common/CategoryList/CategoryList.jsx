import styles from "./CategoryList.module.css";

const defaultCategories = [
  "All",
  "Music",
  "Sports",
  "Visual Arts",
  "Festivals",
  "Dating",
  "Community Events",
  "Conferences",
  "Food & Drink",
];

export default function CategoryList({ categories = defaultCategories }) {
  return (
    <div className={styles.categoryList} aria-label="Event categories">
      {categories.map((category) => (
        <button key={category} type="button" className={styles.categoryChip}>
          {category}
        </button>
      ))}
    </div>
  );
}
