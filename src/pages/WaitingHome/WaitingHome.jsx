import { useState, useEffect } from "react";
import Maintitle from "../../components/title/Maintitle";
import FilterGroup from "./FilterGroup";
import "./waitingHome.scss";
import HomeCatCard from "../../components/card/HomeCatCard";
import catList from "../../components/card/catList.js";
import { useLocation } from "react-router-dom";
import HomeCatCardSmall from "../../components/card/HomeCatCardSmaill.jsx";

function WaitingHome() {
  const location = useLocation();

  const initialFilters = {
    name: "",
    sex: "",
    color: "",
    old: "",
    hashtag: [],
    catFriendly: "",
    experienced: "",
  };

  const [filters, setFilters] = useState(initialFilters);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newFilters = { ...initialFilters };

    if (searchParams.get("name")) newFilters.name = searchParams.get("name");
    if (searchParams.get("sex")) newFilters.sex = searchParams.get("sex");
    if (searchParams.get("color")) newFilters.color = searchParams.get("color");
    if (searchParams.get("old")) newFilters.old = searchParams.get("old");
    if (searchParams.get("catFriendly"))
      newFilters.catFriendly = searchParams.get("catFriendly");
    if (searchParams.get("experienced"))
      newFilters.experienced = searchParams.get("experienced");

    const hashtags = searchParams.getAll("hashtag");
    if (hashtags.length > 0) newFilters.hashtag = hashtags;

    setFilters(newFilters);
  }, [location.search]);

  const handleHashtagSelect = (tag) => {
    setFilters((prev) => {
      const isSelected = prev.hashtag.includes(tag);
      return {
        ...prev,
        hashtag: isSelected
          ? prev.hashtag.filter((t) => t !== tag)
          : [...prev.hashtag, tag],
      };
    });
  };

  const handleSearch = () => {
    setFilters({ ...initialFilters, name: searchInput });
    setSearchInput("");
  };

  const handleReset = () => {
    setFilters(initialFilters);
    setSearchInput("");
  };

  const toggleSingle = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: prev[field] === value ? "" : value,
    }));
  };

  const filteredCats = catList.filter((cat) => {
    if (filters.name && !cat.name.includes(filters.name)) return false;
    if (filters.sex && cat.sex !== filters.sex) return false;
    if (filters.color && cat.color !== filters.color) return false;
    if (filters.old && cat.old !== filters.old) return false;

    if (
      filters.hashtag.length > 0 &&
      !filters.hashtag.every((tag) => cat.hashtag.includes(tag))
    )
      return false;

    if (filters.catFriendly === "沒有貓咪" && cat.CatFriendly) return false;
    if (filters.catFriendly === "有其他貓" && !cat.CatFriendly) return false;

    if (filters.experienced === "沒養過貓" && cat.needExperienced) return false;
    if (filters.experienced === "有養過貓" && !cat.needExperienced)
      return false;

    return true;
  });

  return (
    <section className="waiting">
      <Maintitle en="Waiting For Home" cn="帶我回家" />
      <div className="waiting-main">
        <div className="cat-filter-section">
          <div className="filter-reset">
            <button className="reset-button" onClick={handleReset}>
              清除全部條件
            </button>
          </div>

          <div className="filter-group">
            <label>名字</label>
            <div className="input-row">
              <input
                type="text"
                placeholder="貓咪名字"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button onClick={handleSearch}>搜尋</button>
            </div>
          </div>

          <FilterGroup
            title="性別"
            options={["弟弟", "妹妹"]}
            selected={filters.sex}
            onSelect={(v) => toggleSingle("sex", v)}
          />
          <FilterGroup
            title="花色"
            options={["白", "橘", "虎斑", "黑"]}
            selected={filters.color}
            onSelect={(v) => toggleSingle("color", v)}
          />
          <FilterGroup
            title="年齡"
            options={["0~1歲", "1~3歲", "3~5歲", "5歲以上"]}
            selected={filters.old}
            onSelect={(v) => toggleSingle("old", v)}
          />
          <FilterGroup
            title="貓咪個性（可複選）"
            options={["穩定", "慢熱", "黏人", "獨立", "話多", "撒嬌"]}
            selectedList={filters.hashtag}
            isMulti
            onSelect={handleHashtagSelect}
          />
          <FilterGroup
            title="適合家庭"
            options={["沒有貓咪", "有其他貓"]}
            selected={filters.catFriendly}
            onSelect={(v) => toggleSingle("catFriendly", v)}
          />
          <FilterGroup
            title="養貓經驗"
            options={["沒養過貓", "有養過貓"]}
            selected={filters.experienced}
            onSelect={(v) => toggleSingle("experienced", v)}
          />
        </div>

        <div className="waiting-card">
          {filteredCats.length === 0 ? (
            <div className="no-result">好可惜!沒有符合的貓咪，還是有其他貓咪在等著你唷~</div>
          ) : (
            filteredCats.map((cat) => (
              <HomeCatCardSmall
                key={cat.id}
                cat={cat}
                years={cat.years}
                name={cat.name}
                png={cat.png}
                hashtag={cat.hashtag}
                sex={cat.sex}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default WaitingHome;
