import React, { createContext, useState, useEffect } from 'react';
import uniqid from "uniqid";


export const MyRecipesContext = createContext();

export default function MyProvider(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [likeArr, setLikeArr] = useState([]);
  const [isModal, setIsModal] = useState(false)
  const [modalObj, setModalObj] = useState({
    label: '',
    healthLabels: '',
    ingredients: '',
    yield: '',
    totalNutrients: ''
  })


  const onChange = (e) => {
    setSearch(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
  }

  const addToLike = (obj) => {
    if (!obj.bookmarked) {
      obj.bookmarked = true;
      obj.id = uniqid();
      setLikeArr([...likeArr, obj]);
    }
  }

  const deleteLike = (obj) => {
    obj.bookmarked = false;
    const newArr = likeArr.filter(item => item.id !== obj.id)
    setLikeArr(newArr)
  }

  const openModal = (id) => {
    const item = data.filter(recipe => recipe.id === id)
    setModalObj({
      label: item[0].recipe.label,
      totalNutrients: item[0].recipe.totalNutrients,
      healthLabels: item[0].recipe.healthLabels,
      ingredients: item[0].recipe.ingredientLines,
      yield: item[0].recipe.yield,
    })
    document.body.classList.add('modal-open');
    setIsModal(true)
  }

  const closeModal = () => {
    document.body.classList.remove('modal-open');
    setIsModal(false)
  }

  useEffect(() => {
    const getRecipes = () => {
      const id = '9514057f'
      const key = "f72dc3e10937598d0f8a923a00094316"
      const searchUrl = `https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${key}&count=100`;
      setIsLoading(true)

      fetch(searchUrl)
        .then(response => response.json())
        .then(recipes => {
          const getProteins = (recipe) => {
            return recipe.proteins = parseInt(recipe.recipe.totalNutrients.PROCNT.quantity, 10)
          }

          recipes.hits.map(item => {
            return getProteins(item)
          })
          setData(recipes.hits)
          setIsLoading(false)
        })
    }
    getRecipes()

  }, [query])

  return (
    <MyRecipesContext.Provider value={{ data, search, query, likeArr, isModal, modalObj, isLoading, onChange: onChange, onSubmit: onSubmit, addToLike: addToLike, deleteLike: deleteLike, openModal: openModal, closeModal: closeModal }}>
      {props.children}
    </MyRecipesContext.Provider>
  )
}




