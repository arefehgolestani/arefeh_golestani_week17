import styles from "./Search.module.css";

function Search({ search, setSearch }) {
  return (
    <div className={styles.header}>
      <label> جستجو در مخاطبین : </label>
      <input
        type="text"
        value={search}
        onChange={(event) => setSearch(event.target.value.toLowerCase().trim())}
      />
    </div>
  );
}

export default Search;
