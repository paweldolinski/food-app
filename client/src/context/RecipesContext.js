import React, { createContext, useState, useEffect } from "react";

export const RecipesContext = createContext();

const RecipesProvider = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [likeArr, setLikeArr] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [modalObj, setModalObj] = useState({
    label: "",
    healthLabels: "",
    ingredients: "",
    yield: "",
    totalNutrients: "",
  });
  const [isBackground, setIsBackground] = useState(true);
  const [isFirstSearch, setIsFirstSearch] = useState(false);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setIsFirstSearch(true);
  };

  const deleteLike = (obj) => {
    setLikeArr(likeArr.filter((item) => item.id !== obj.id));
    obj.bookmarked = false;
  };

  const sortByProteins = () => {
    setData(data.slice().sort((a, b) => (a.proteins < b.proteins ? 1 : -1)));
  };

  const sortByCarbs = () => {
    setData(data.slice().sort((a, b) => (a.carbs < b.carbs ? 1 : -1)));
  };

  const sortByFat = () => {
    setData(data.slice().sort((a, b) => (a.fat < b.fat ? 1 : -1)));
  };

  const openModal = (id) => {
    const item = data.filter((recipe) => recipe.id === id);
    const {
      label,
      totalNutrients,
      healthLabels,
      ingredientLines,
    } = item[0].recipe;

    setModalObj({
      label,
      totalNutrients,
      healthLabels,
      ingredients: ingredientLines,
      yield: item[0].recipe.yield,
    });
    document.body.classList.add("modal-open");
    setIsModal(true);
  };

  const closeModal = (e) => {
    if (e.target.getAttribute("data-type") !== "close") return;
    document.body.classList.remove("modal-open");
    setIsModal(false);
  };

  const getRecipes = async () => {
    const id = process.env.REACT_APP_API_ID;
    const key = process.env.REACT_APP_API_KEY;
    console.log("-------", process.env.REACT_APP_API_ID);
    const searchUrl = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${key}`;
    setIsLoading(true);
    try {
      const response = await fetch(searchUrl);
      const json = await response.json();
      const { hits } = json;
      if (response.status === 200) {
        setData(hits);
        setIsLoading(false);
        setIsBackground(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (query) getRecipes();
  }, [query]);

  return (
    <RecipesContext.Provider
      value={{
        data,
        search,
        query,
        likeArr,
        isModal,
        modalObj,
        isLoading,
        isFirstSearch,
        isBackground,
        onChange: onChange,
        onSubmit: onSubmit,
        deleteLike: deleteLike,
        openModal: openModal,
        closeModal: closeModal,
        sortByProteins: sortByProteins,
        sortByCarbs: sortByCarbs,
        sortByFat: sortByFat,
        setIsFirstSearch: setIsFirstSearch,
        setIsBackground,
      }}
    >
      {props.children}
    </RecipesContext.Provider>
  );
};

export default RecipesProvider;
