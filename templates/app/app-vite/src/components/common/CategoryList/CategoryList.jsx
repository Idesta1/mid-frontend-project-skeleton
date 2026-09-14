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

export default function CategoryList({
  categories = defaultCategories,
  selectedCategory = "All",
  onSelect,
}) {
  return (
    <div className={styles.categoryList} aria-label="Event categories">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            aria-pressed={isSelected}
            className={`${styles.categoryChip} ${isSelected ? styles.selected : ""}`.trim()}
            onClick={() => onSelect(category)}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
