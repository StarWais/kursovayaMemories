import { React, createContext, useState } from 'react';
import axios from 'axios';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [posts, setPosts] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedPosts, setSelectedPosts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [maxLikesCount, setMaxLikesCount] = useState(0);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [isLoggedIn, setIsLoggedIn] = useState(
    authToken !== null && authToken !== undefined && authToken !== ''
  );
  const [isLoading, setIsLoading] = useState(true);

  const getPostsData = (params = {}) => {
    console.log(params);
    getMaxLikesCount();
    setIsLoading(true);
    axios
      .get('http://localhost:8000/posts/', {
        headers: {
          authToken: authToken,
        },
        params: params,
      })
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.log(response);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const getMaxLikesCount = () => {
    axios
      .get('http://localhost:8000/posts/getMaxLikes', {
        headers: {
          authToken: authToken,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setMaxLikesCount(response.data.maxLikes);
        } else {
          console.log(response);
        }
      })
      .catch((error) => console.log(error));
  };

  const deletePosts = () => {
    setIsLoading(true);
    axios
      .post(
        'http://localhost:8000/posts/deletePosts',
        { ids: selectedPosts },
        {
          headers: {
            authToken,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          setPosts(response.data);
        } else {
          console.log(response);
        }
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  return (
    <GlobalContext.Provider
      value={{
        posts: [posts, setPosts],
        firstName: [firstName, setFirstName],
        lastName: [lastName, setLastName],
        email: [email, setEmail],
        authToken: [authToken, setAuthToken],
        isLoggedIn: [isLoggedIn, setIsLoggedIn],
        userId: [userId, setUserId],
        isAdmin: [isAdmin, setIsAdmin],
        isLoading,
        getPostsData,
        deletePosts,
        maxLikesCount,
        selectedPosts: [selectedPosts, setSelectedPosts],
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
