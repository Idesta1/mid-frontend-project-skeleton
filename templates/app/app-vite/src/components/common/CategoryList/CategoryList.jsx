import styles from "./CategoryList.module.css";

const defaultCategories = [
  "All",
  "Music",
  "Nightlife",
  "Visual Arts",
  "Holidays",
  "Dating",
  "Hobbies",
  "Business",
  "Food & Drink",
];

function CategoryList({ categories = defaultCategories }) {
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

export default CategoryList;
