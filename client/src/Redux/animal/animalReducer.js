import { animalActionType } from "./animalType";

const INITIAL_STATE = {
  loading: true,
  name: [],
  error: {},
  animal: 'temp'
};
export const animalReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case animalActionType.GET_ANIMALS:
      return {
        ...state,
        name: payload,
        loading: false
      };
     case animalActionType.POST_DELETE: 
    case animalActionType.POST_SUCCESS:
      case animalActionType.SINGLE_ANM:
        case animalActionType.POST_UPDATE:
      return {
        ...state,
        animal: payload,
        loading: false
      };
    case animalActionType.ANIMAL_ERROR:
      case animalActionType.SINGLE_ERROR:
      case animalActionType.POST_ERROR:
      case animalActionType.POST_FAIL:
      case animalActionType.UPDATE_ERROR:
      return {
        ...state,
        error: payload,
        loading: true
      };

    default:
      return state;
  }
};
