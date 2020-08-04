import React, { createContext, useState, useEffect, useContext } from "react";
import uniqid from "uniqid";

export const MyRecipesContext = createContext();

export default function MyProvider(props) {
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
  const [firstSearch, setFirstSearch] = useState(false);

  const onChange = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setFirstSearch(true);
  };

  // const addToLike = (obj) => {
  //   if (!obj.bookmarked) {
  //     obj.bookmarked = true;
  //     obj.id = uniqid();
  //     setLikeArr([...likeArr, obj]);
  //   }
  //   console.log(obj);
  // };

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
    setModalObj({
      label: item[0].recipe.label,
      totalNutrients: item[0].recipe.totalNutrients,
      healthLabels: item[0].recipe.healthLabels,
      ingredients: item[0].recipe.ingredientLines,
      yield: item[0].recipe.yield,
    });
    document.body.classList.add("modal-open");
    setIsModal(true);
  };

  const closeModal = () => {
    document.body.classList.remove("modal-open");
    setIsModal(false);
  };

  useEffect(() => {
    const getRecipes = () => {
      const id = process.env.REACT_APP_ID;
      const key = process.env.REACT_APP_KEY;
      const searchUrl = `https://cors-anywhere.herokuapp.com/https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${key}`;
      setIsLoading(true);

      fetch(searchUrl)
        .then((response) => response.json())
        .then((recipes) => {
          const getProteins = (recipe) => {
            return (recipe.proteins = parseInt(
              recipe.recipe.totalNutrients.PROCNT.quantity,
              10
            ));
          };
          const getCarbs = (recipe) => {
            return (recipe.carbs = parseInt(
              recipe.recipe.totalNutrients.CHOCDF.quantity,
              10
            ));
          };
          const getFat = (recipe) => {
            return (recipe.fat = parseInt(
              recipe.recipe.totalNutrients.FAT.quantity,
              10
            ));
          };
          if (recipes.hits.length > 0) {
            recipes.hits.map((item) => {
              return getProteins(item), getCarbs(item), getFat(item);
            });
          }
          setData(recipes.hits);
          setIsLoading(false);
        });
    };
    getRecipes();
  }, [query]);

  return (
    <MyRecipesContext.Provider
      value={{
        data,
        search,
        query,
        likeArr,
        isModal,
        modalObj,
        isLoading,
        firstSearch,
        onChange: onChange,
        onSubmit: onSubmit,
        deleteLike: deleteLike,
        openModal: openModal,
        closeModal: closeModal,
        sortByProteins: sortByProteins,
        sortByCarbs: sortByCarbs,
        sortByFat: sortByFat,
        setFirstSearch: setFirstSearch,
      }}
    >
      {props.children}
    </MyRecipesContext.Provider>
  );
}
