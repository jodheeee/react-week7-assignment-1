export async function fetchRegions() {
  return [];
}

export async function fetchCategories() {
  return [];
}

export async function fetchRestaurants() {
  return [];
}

export async function fetchRestaurant() {
  return {};
}

export async function postLogin({ email, password }) {
  return {
    email,
    password,
  };
}

export async function sendReview({ accessToken, score, description, restaurantId }) {
  return {
    accessToken,
    score,
    description,
    restaurantId,
  };
}
