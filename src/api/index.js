import createRequester from './createRequester';

const API_URL = process.env.REACT_APP_API_URL;

const requester = createRequester();

export const uploadImageAPI = (file, params) => {
  const formData = new FormData();
  formData.set('file', file);
  return requester.post(`${API_URL}/images`, formData, {
    headers: {'Content-Type': 'multipart/form-data'},
    params,
  });
};

export async function getCurrentUserAPI() {
  return requester.get(`${API_URL}/users/me`);
}

export async function updateCurrentUserAPI(data) {
  return requester.put(`${API_URL}/users/me`, data);
}

export async function getUserInfoAPI(id) {
  return requester.get(`${API_URL}/users/${id}`);
}

export async function getUsersAPI(params) {
  return requester.get(`${API_URL}/users`, {params});
}

export async function updateUserAPI(id, status) {
  return requester.put(`${API_URL}/users/${id}`, {status});
}

export async function deleteUserAPI(id) {
  return requester.delete(`${API_URL}/users/${id}`);
}

export async function loginAPI(data) {
  return requester.post(`${API_URL}/auth/login`, data);
}

export async function registerAPI(data) {
  return requester.post(`${API_URL}/auth/register`, data);
}

export async function getProvincesAPI() {
  return requester.get(`${API_URL}/locations/provinces`);
}

export async function getDistrictsByProvinceAPI(province_id) {
  return requester.get(`${API_URL}/locations/provinces/${province_id}/districts`);
}

export async function getWardsByDistrictAPI(district_id) {
  return requester.get(`${API_URL}/locations/districts/${district_id}/wards`);
}

export async function getAttributesAPI() {
  return requester.get(`${API_URL}/attributes`);
}

export async function addAttributeAPI(data) {
  return requester.post(`${API_URL}/attributes`, data);
}

export async function deleteAttributeAPI(id) {
  return requester.delete(`${API_URL}/attributes/${id}`);
}

export async function addRoomApi(data) {
  return requester.post(`${API_URL}/rooms`, data);
}

export async function updateRoomApprovedStatusAPI(id, approved_status) {
  return requester.put(`${API_URL}/rooms/${id}`, {approved_status});
}

export async function updateRoomStatusAPI(id, status) {
  return requester.put(`${API_URL}/rooms/${id}`, {status});
}

export async function getRoomsAPI(params) {
  return requester.get(`${API_URL}/rooms`, {params});
}

export async function getAvailableRoomsAPI(params) {
  return requester.get(`${API_URL}/rooms/available`, {params});
}

export async function getInvoicesAPI(params) {
  return requester.get(`${API_URL}/invoices`, {params});
}

export async function updateInvoiceAPI(id, status) {
  return requester.put(`${API_URL}/invoices/${id}`, {status});
}

export async function getRoomAPI(id) {
  return requester.get(`${API_URL}/rooms/${id}`);
}

export async function getIsFavoriteAPI(room_id) {
  return requester.get(`${API_URL}/interactions/favorites`, {params: {room_id}});
}

export async function favoriteAPI(room_id) {
  return requester.post(`${API_URL}/interactions/favorites`, null, {params: {room_id}});
}

export async function removeFavoriteAPI(room_id) {
  return requester.delete(`${API_URL}/interactions/favorites`, {params: {room_id}});
}

export async function createRatingAPI(data) {
  return requester.post(`${API_URL}/ratings`, data);
}

export async function getRatingAPI(id, params) {
  return requester.get(`${API_URL}/ratings/rooms/${id}`, {params});
}

export async function getRatingStatsAPI(id, params) {
  return requester.get(`${API_URL}/ratings/rooms/${id}/stats`, {params});
}

export async function getNotificationsAPI() {
  return requester.get(`${API_URL}/notifications`);
}

export async function getUnreadNotificationsAPI() {
  return requester.get(`${API_URL}/notifications/unread`);
}

export async function updateNotificationStatusAPI(id, data) {
  return requester.put(`${API_URL}/notifications/${id}/status`, data);
}
