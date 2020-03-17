import { animalActionType } from "./animalType";
import axios from "axios";

export const getAllAnimals = () => async dispatch => {
  try {
    const res = await axios.get("/api/v1/animals");
    dispatch({
      type: animalActionType.GET_ANIMALS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: animalActionType.ANIMAL_ERROR,
      payload: { msg: "Something Wrong While Accessing API", error }
    });
  }
};

export const getAnimalById = id => async dispatch => {
  try {
    const res = await axios.get(`/api/v1/animals/${id}`);
    dispatch({
      type: animalActionType.SINGLE_ANM,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: animalActionType.SINGLE_ERROR,
      payload: { msg: "Something Wrong While Accessing API", error }
    });
  }
};

export const postAnimal = name => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name });
  try {
    const res = await axios.post("/api/v1/animals", body, config);
    dispatch({
      type: animalActionType.POST_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: animalActionType.POST_FAIL,
      payload: { error: "something wrong" }
    });
    window.alert(error.response.data.error);
  }
};
export const deleteAnimal = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/animals/${id}`);
    dispatch({
      type: animalActionType.POST_DELETE,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: animalActionType.POST_ERROR,
      payload: { error: "something wrong" }
    });
  }
};
export const updateAnimal = (id, name, history) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const body = JSON.stringify({ name });

  try {
    const res = await axios.put(`/api/v1/animals/${id}`, body, config);
    dispatch({
      type: animalActionType.POST_UPDATE,
      payload: res.data
    });

    history.push("/admin");
  } catch (error) {
    dispatch({
      type: animalActionType.UPDATE_ERROR,
      payload: { error: "something wrong" }
    });
  }
};
