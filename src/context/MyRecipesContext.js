import React, { createContext, useState, useEffect } from 'react';
import uniqid from "uniqid";
import RegisterAPI from '../RegisterAPI';


export const MyRecipesContext = createContext();

export default function MyProvider(props) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [likeArr, setLikeArr] = useState([]);
  const [isModal, setIsModal] = useState(false);
  const [modalObj, setModalObj] = useState({
    label: '',
    healthLabels: '',
    ingredients: '',
    yield: '',
    totalNutrients: ''
  })


  const [isLogin, setIsLogin] = useState(false)
  const [isRegister, setIsRegister] = useState(false)
  const [newUser, setNewUser] = useState({
    user:"",
    password:""
  });
  const [message, setMessage] = useState('');

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
    setLikeArr(likeArr.filter(item => item.id !== obj.id))
    obj.bookmarked = false
  }

  const sortByProteins = () => {
    setData(data.slice().sort((a, b) => (a.proteins < b.proteins) ? 1 : -1))
  }

  const sortByCarbs = () => {
    setData(data.slice().sort((a, b) => (a.carbs < b.carbs) ? 1 : -1))
  }

  const sortByFat = () => {
    setData(data.slice().sort((a, b) => (a.fat < b.fat) ? 1 : -1))
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

  const toggleLogin = () => {
    setIsLogin(!isLogin)
  }

  const toggleRegister = () => {
    setIsRegister(!isRegister)
  }

  const resetInput = ()=> {
    setNewUser({
      user: '',
      password: '',
    })
  }

  const setNewUserr =(e)=> {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    });
  }

  const  registerNewUser = async (e)=> {
    e.preventDefault();
    const addUser = await RegisterAPI.createNewUser(newUser);
    const message = addUser.message;

    if(message.msgError) {
        setMessage({message})
    } else {
      const data = await RegisterAPI.get
    }


    console.log(newUser)
  }

  useEffect(() => {
    const getRecipes = () => {
      const id = '9514057f'
      const key = "f72dc3e10937598d0f8a923a00094316"
      const searchUrl = `https://api.edamam.com/search?q=${query}&app_id=${id}&app_key=${key}`;
      setIsLoading(true)

      fetch(searchUrl)
        .then(response => response.json())
        .then(recipes => {
          const getProteins = (recipe) => {
            return recipe.proteins = parseInt(recipe.recipe.totalNutrients.PROCNT.quantity, 10)
          }
          const getCarbs = (recipe) => {
            return recipe.carbs = parseInt(recipe.recipe.totalNutrients.CHOCDF.quantity, 10)
          }
          const getFat = (recipe) => {
            return recipe.fat = parseInt(recipe.recipe.totalNutrients.FAT.quantity, 10)
          }

          recipes.hits.map(item => {
            return (
              getProteins(item),
              getCarbs(item),
              getFat(item)
            )
          })
          setData(recipes.hits)
          setIsLoading(false)
        })
    }
    getRecipes()

  }, [query])

  return (
    <MyRecipesContext.Provider value={{ data, search, query, likeArr, isModal, modalObj, isLoading, isRegister, isLogin, onChange: onChange, onSubmit: onSubmit, addToLike: addToLike, deleteLike: deleteLike, openModal: openModal, closeModal: closeModal, sortByProteins: sortByProteins, sortByCarbs: sortByCarbs, sortByFat: sortByFat, toggleIsLogin: toggleLogin, toggleIsRegister: toggleRegister, registerNewUser:registerNewUser, setNewUserr:setNewUserr }}>
      {props.children}
    </MyRecipesContext.Provider>
  )
}




