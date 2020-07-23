import {
  fetchRegions,
  fetchCategories,
  fetchRestaurants,
  fetchRestaurant,
  postLogin,
  postReview,
} from './services/api';

import { deleteItem, saveItem } from './services/storage';

export function setRegions(regions) {
  return {
    type: 'setRegions',
    payload: { regions },
  };
}

export function setCategories(categories) {
  return {
    type: 'setCategories',
    payload: { categories },
  };
}

export function setRestaurants(restaurants) {
  return {
    type: 'setRestaurants',
    payload: { restaurants },
  };
}

export function setRestaurant(restaurant) {
  return {
    type: 'setRestaurant',
    payload: { restaurant },
  };
}

export function selectRegion(regionId) {
  return {
    type: 'selectRegion',
    payload: { regionId },
  };
}

export function selectCategory(categoryId) {
  return {
    type: 'selectCategory',
    payload: { categoryId },
  };
}

export function loadInitialData() {
  return async (dispatch) => {
    const regions = await fetchRegions();
    dispatch(setRegions(regions));

    const categories = await fetchCategories();
    dispatch(setCategories(categories));
  };
}

export function loadRestaurants() {
  return async (dispatch, getState) => {
    const { selectedRegion: region, selectedCategory: category } = getState();

    if (!region || !category) {
      return;
    }

    const restaurants = await fetchRestaurants({
      regionName: region.name,
      categoryId: category.id,
    });
    dispatch(setRestaurants(restaurants));
  };
}

export function loadRestaurant({ restaurantId }) {
  return async (dispatch) => {
    dispatch(setRestaurant(null));

    const restaurant = await fetchRestaurant({ restaurantId });

    dispatch(setRestaurant(restaurant));
  };
}

export function changeLoginField({ name, value }) {
  return {
    type: 'changeLoginField',
    payload: { name, value },
  };
}

export function setAccessToken({ accessToken }) {
  return {
    type: 'setAccessToken',
    payload: { accessToken },
  };
}

export function requestLogin() {
  return async (dispatch, getState) => {
    const {
      loginFields: { email, password },
    } = getState();

    if (!email || !password) return;

    const { accessToken } = await postLogin({ email, password });

    saveItem({ key: 'accessToken', value: accessToken });

    dispatch(setAccessToken({ accessToken }));
  };
}

export function logout() {
  deleteItem({ key: 'accessToken' });

  return {
    type: 'logout',
  };
}

export function changeReviewField({ name, value }) {
  return {
    type: 'changeReviewField',
    payload: { name, value },
  };
}

export function setReviews(reviews) {
  return {
    type: 'setReviews',
    payload: { reviews },
  };
}

export function loadReviews(restaurantId) {
  return async (dispatch) => {
    const { reviews } = await fetchRestaurant({ restaurantId });
    dispatch(setReviews(reviews));
  };
}

export function clearReviewFields() {
  return {
    type: 'clearReviewFields',
  };
}

export function requestReview(restaurantId) {
  return async (dispatch, getState) => {
    const {
      accessToken,
      reviewFields: { score, description },
    } = getState();

    if (!score || !description) return;

    await postReview({
      accessToken,
      score,
      description,
      restaurantId,
    });

    dispatch(loadReviews(restaurantId));
    dispatch(clearReviewFields);
  };
}