import api from './api';

// Informations sur l'API
export const getApiInfo = () => api.get('/');

// Ping
export const ping = () => api.get('/ping');

// Ajouter une checklist
export const addChecklist = (title, description, todo) => 
  api.post('/checklist/add', { title, description, todo });

// Récupérer toutes les checklists
export const getAllChecklists = () => api.get('/checklists');

// Récupérer une checklist spécifique
export const getChecklist = (id) => api.get(`/checklist?id=${id}`);

// Supprimer une checklist
export const deleteChecklist = (id) => api.get(`/checklist/delete?id=${id}`);

// Modifier une checklist
export const updateChecklist = (id, title, description, todo) => 
  api.post('/checklist/update', { id, title, description, todo });

// Modifier le statut d'une checklist
export const updateChecklistStatus = (id, status) => 
  api.get(`/checklist/statut?id=${id}&statut=${status}`);