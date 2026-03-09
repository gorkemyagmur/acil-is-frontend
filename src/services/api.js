const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

export const api = {
    async request(endpoint, options = {}) {
        const token = localStorage.getItem('accessToken');
        const headers = {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
            ...options.headers,
        };

        const res = await fetch(`${API_BASE}${endpoint}`, {
            ...options,
            headers,
        });

        if (res.status === 401) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            window.location.href = '/login';
            return;
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Bir hata oluştu');
        return data;
    },

    get: (url) => api.request(url),
    post: (url, body) => api.request(url, { method: 'POST', body: JSON.stringify(body) }),
    patch: (url, body) => api.request(url, { method: 'PATCH', body: JSON.stringify(body) }),
    delete: (url) => api.request(url, { method: 'DELETE' }),

    // Auth
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),

    // Jobs
    getJobs: (params = '') => api.get(`/jobs${params}`),
    getJob: (id) => api.get(`/jobs/${id}`),
    createJob: (data) => api.post('/jobs', data),
    getCategories: () => api.get('/jobs/categories'),
    getNearbyJobs: (lat, lng, radius) => api.get(`/jobs/nearby?latitude=${lat}&longitude=${lng}&radiusKm=${radius}`),

    // Workers
    getNearbyWorkers: (jobId) => api.get(`/matching/workers/${jobId}`),

    // Offers
    sendOffer: (data) => api.post('/offers', data),
    getOffers: () => api.get('/offers'),
    acceptOffer: (id) => api.patch(`/offers/${id}/accept`),
    rejectOffer: (id) => api.patch(`/offers/${id}/reject`),

    // Profile
    getMe: () => api.get('/users/me'),
    updateAvailability: (isAvailable) => api.patch('/workers/me/availability', { isAvailable }),
    updateLocation: (lat, lng) => api.patch('/workers/me/location', { latitude: lat, longitude: lng }),

    // Notifications
    getNotifications: () => api.get('/notifications'),
};
