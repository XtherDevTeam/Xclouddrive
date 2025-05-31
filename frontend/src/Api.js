import axios from 'axios';

axios.defaults.withCredentials = true;

// --- Authentication & Initialization Store ---
export function setSecret(secret) {
  window.localStorage.setItem("secret", secret);
}

export function getSecret() {
  return window.localStorage.getItem("secret");
}

// --- Status & Initialization Endpoints ---

/**
 * Retrieves the current status of the API.
 * GET /api/v1/status
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: {is_initialized: ..., api_ver: ..., api_name: ...}})
 */
export function getStatus() {
  return axios.get(`/api/v1/status`).then(r => r.data);
}

/**
 * Initializes the application database.
 * POST /api/v1/initialize
 * @param {string} secret - The master secret for the application.
 * @param {string} [title='Xclouddrive'] - Optional title for the application.
 * @param {string} [description='A simple multiple samba service management tool.'] - Optional description.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "Database initialized"})
 */
export function initialize(secret, title, description) {
  const payload = { secret };
  if (title !== undefined) payload.title = title;
  if (description !== undefined) payload.description = description;
  return axios.post(`/api/v1/initialize`, payload).then(r => r.data);
}

// --- Authentication Endpoints ---

/**
 * Authorizes the current session.
 * POST /api/v1/auth/authorize
 * @param {string} secret - The master secret.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "Successfully authorized"})
 */
export function authorize(secret) {
  return axios.post(`/api/v1/auth/authorize`, { secret }).then(r => r.data);
}

/**
 * Attempts to authorize using a stored secret.
 * Call this on application load.
 * @returns {Promise<Object|null>} Server response on success, or null if no secret stored.
 */
export function autoAuthenticate() {
  const secret = getSecret();
  if (secret) {
    return authorize(secret)
      .catch(error => {
        // Handle auth error, e.g. if secret is invalid
        console.error("Auto-authentication failed:", error.response ? error.response.data : error.message);
        return error.response ? error.response.data : { status: false, data: "Auto-authentication network or server error" };
      });
  } else {
    return Promise.resolve(null); // Or an object indicating not attempted: { status: false, data: "No secret stored" }
  }
}

// --- Samba Service Management Endpoints ---

/**
 * Connects to a specific Samba service.
 * POST /api/v1/samba/routes/connect/<id>
 * @param {number} id - The ID of the Samba service.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "Samba service connected"})
 */
export function sambaConnect(id) {
  return axios.post(`/api/v1/samba/routes/connect/${id}`).then(r => r.data);
}

/**
 * Disconnects from a specific Samba service.
 * POST /api/v1/samba/routes/disconnect/<id>
 * @param {number} id - The ID of the Samba service.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "Samba service disconnected"})
 */
export function sambaDisconnect(id) {
  return axios.post(`/api/v1/samba/routes/disconnect/${id}`).then(r => r.data);
}

/**
 * Connects to all configured Samba services.
 * POST /api/v1/samba/routes/connect_all
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "All samba services connected"})
 */
export function sambaConnectAll() {
  return axios.post(`/api/v1/samba/routes/connect_all`).then(r => r.data);
}

/**
 * Retrieves a list of all configured Samba services.
 * POST /api/v1/samba/routes
 * @returns {Promise<Array<Object>>} Server response, which is directly the array of samba services.
 */
export function getSambaRoutes() {
  return axios.post(`/api/v1/samba/routes`).then(r => r.data);
}

/**
 * Update a Samba service.
 * POST /api/v1/samba/routes/update
 * @param {number} id - The ID of the Samba service to update.
 * @param {string} name - The new name of the Samba service.
 * @param {string} description - The new description of the Samba service.
 * @param {string} service_name - The new name of the Samba service (e.g., "192.168.1.104").
 * @param {string} share_name - The new name of the Samba share (e.g., "share").
 * @param {number} user_id - The new ID of the user to authenticate as.
 * @param {string} password - The new password for the user.
 * @param {boolean} use_ntlm_v2 - Whether to use NTLMv2 authentication (default true).
 * @param {boolean} is_direct_tcp - Whether to use direct TCP/IP connections (default true).
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "Samba service updated"})
 */
export function updateSambaRoute(id, name, description, service_name, share_name, user_id, password, use_ntlm_v2, is_direct_tcp) {
  return axios.post(`/api/v1/samba/routes/update/${id}`, {
    name,
    description,
    service_name,
    share_name,
    user_id,
    password,
    use_ntlm_v2,
    is_direct_tcp
  }).then(r => r.data);
}

/**
 * Delete a Samba service.
 * POST /api/v1/samba/routes/delete
 * @param {number} id - The ID of the Samba service to delete.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "Samba service deleted"})
 */
export function deleteSambaRoute(id) {
  return axios.post(`/api/v1/samba/routes/delete/${id}`).then(r => r.data);
}

/**
 * Create a new Samba service.
 * POST /api/v1/samba/routes/create
 * @param {string} name - The name of the Samba service.
 * @param {string} description - The description of the Samba service.
 * @param {string} service_name - The name of the Samba service (e.g., "192.168.1.104").
 * @param {string} share_name - The name of the Samba share (e.g., "share").
 * @param {number} user_id - The ID of the user to authenticate as.
 * @param {string} password - The password for the user.
 * @param {boolean} [use_ntlm_v2=true] - Whether to use NTLMv2 authentication (default true).
 * @param {boolean} [is_direct_tcp=true] - Whether to use direct TCP/IP connections (default true).
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "Samba service created"})
 */
export function createSambaRoute(name, description, service_name, share_name, user_id, password, use_ntlm_v2 = true, is_direct_tcp = true) {
  return axios.post(`/api/v1/samba/routes/create`, {
    name,
    description,
    service_name,
    share_name,
    user_id,
    password,
    use_ntlm_v2,
    is_direct_tcp
  }).then(r => r.data);
}

/**
 * Retrieves details for a specific Samba service by its ID.
 * POST /api/v1/samba/routes/<id>
 * @param {number} id - The ID of the Samba service.
 * @returns {Promise<Object>} Server response, which is directly the samba service object or null.
 */
export function getSambaRoute(id) {
  return axios.post(`/api/v1/samba/routes/${id}`).then(r => r.data);
}

// --- Samba File Operation Endpoints ---

/**
 * Lists the contents of a directory on a specified Samba share.
 * POST /api/v1/samba/files/dir
 * @param {number} sambaServiceId - The ID of the Samba service.
 * @param {string} [path=''] - The path to the directory (defaults to share root).
 * @returns {Promise<Array<Object>|Object>} Server response, array of file/folder info or error object.
 */
export function sambaListDirectory(sambaServiceId, path = '') {
  return axios.post(`/api/v1/samba/files/dir`, {
    samba_service_id: sambaServiceId,
    path: path
  }).then(r => r.data);
}

/**
 * Fetch a file from a specified Samba share.
 * POST /api/v1/samba/files/get
 * @param {number} sambaServiceId - The ID of the Samba service.
 * @param {string} path - The path to the file to fetch.
 * @returns {Promise<Object>} Server response, file content or error object.
 */
export function sambaFetchFile(sambaServiceId, path) {
  return axios.get(`/api/v1/samba/files/get?samba_service_id=${sambaServiceId}&path=${encodeURIComponent(path)}`).then(r => r);
}

/**
 * Get a file url for downloading a file from a specified Samba share.
 * POST /api/v1/samba/files/url
 * @param {number} sambaServiceId - The ID of the Samba service.
 * @param {string} path - The path to the file to fetch.
 * @returns {str} The file url.
 */
export function sambaGetFileUrl(sambaServiceId, path) {
  return `/api/v1/samba/files/get?samba_service_id=${sambaServiceId}&path=${encodeURIComponent(path)}`;
}

/**
 * Deletes a file or directory on a specified Samba share.
 * POST /api/v1/samba/files/delete
 * @param {number} sambaServiceId - The ID of the Samba service.
 * @param {string} path - The path to the file or directory to delete.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "File deleted"})
 */
export function sambaDeleteFile(sambaServiceId, path) {
  return axios.post(`/api/v1/samba/files/delete`, {
    samba_service_id: sambaServiceId,
    path: path
  }).then(r => r.data);
}

/**
 * Renames or moves a file or directory on a specified Samba share.
 * POST /api/v1/samba/files/rename
 * @param {number} sambaServiceId - The ID of the Samba service.
 * @param {string} oldPath - The current path of the file or directory.
 * @param {string} newPath - The new path or name for the file or directory.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "File renamed"})
 */
export function sambaRenameFile(sambaServiceId, oldPath, newPath) {
  return axios.post(`/api/v1/samba/files/rename`, {
    samba_service_id: sambaServiceId,
    old_path: oldPath,
    new_path: newPath
  }).then(r => r.data);
}

/**
 * Retrieves attributes of a file or directory on a specified Samba share.
 * POST /api/v1/samba/files/attrs
 * @param {number} sambaServiceId - The ID of the Samba service.
 * @param {string} path - The path to the file or directory.
 * @returns {Promise<Object>} Server response, attributes object or error object.
 */
export function sambaGetAttributes(sambaServiceId, path) {
  return axios.post(`/api/v1/samba/files/attrs`, {
    samba_service_id: sambaServiceId,
    path: path
  }).then(r => r.data);
}

/**
 * Creates a new directory on a specified Samba share.
 * POST /api/v1/samba/files/mkdir
 * @param {number} sambaServiceId - The ID of the Samba service.
 * @param {string} path - The path where the new directory should be created.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "Directory created"})
 */
export function sambaMakeDirectory(sambaServiceId, path) {
  return axios.post(`/api/v1/samba/files/mkdir`, {
    samba_service_id: sambaServiceId,
    path: path
  }).then(r => r.data);
}

/**
 * Uploads a file to a specified directory on a Samba share.
 * POST /api/v1/samba/files/upload
 * @param {number} sambaServiceId - The ID of the Samba service. (Sent as query parameter)
 * @param {string} path - The target remote directory path on the Samba share. (Sent as query parameter)
 * @param {File} fileObject - The File object to upload.
 * @param {function} [onUploadProgress=null] - Optional axios progress event handler.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "File uploaded"})
 */
export function sambaUploadFile(sambaServiceId, path, fileObject, onUploadProgress = null) {
  const formData = new FormData();
  formData.append('file', fileObject); // The backend iterates flask.request.files, 'file' is a common key name

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress: onUploadProgress
  };

  const uploadUrl = `/api/v1/samba/files/upload?samba_service_id=${sambaServiceId}&path=${encodeURIComponent(path)}`;

  return axios.post(uploadUrl, formData, config).then(r => r.data);
}

// Config set and get
/**
 * Retrieves the current configuration of the API.
 * POST /api/v1/config/get
 * @param {string} key - The key of the configuration to retrieve.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: {config: ...}})
 */
export function getConfig(key) {
  return axios.post(`/api/v1/config/get`, { key }).then(r => r.data);
}

/**
 * Updates the current configuration of the API.
 * POST /api/v1/config/set
 * @param {string} key - The key of the configuration to update.
 * @param {any} value - The new value for the configuration.
 * @returns {Promise<Object>} The server response (e.g., {status: true, data: "Config updated"})
 */
export function setConfig(key, value) {
  return axios.post(`/api/v1/config/set`, { key, value }).then(r => r.data);
}


// Export all functions to be used by other modules
export default {
  setSecret,
  getSecret,
  getStatus,
  initialize,
  authorize,
  autoAuthenticate,
  sambaConnect,
  sambaDisconnect,
  sambaConnectAll,
  getSambaRoutes,
  getSambaRoute,
  createSambaRoute,
  updateSambaRoute,
  deleteSambaRoute,
  sambaListDirectory,
  sambaDeleteFile,
  sambaRenameFile,
  sambaGetAttributes,
  sambaMakeDirectory,
  sambaUploadFile,
  sambaFetchFile,
  sambaGetFileUrl,
  getConfig,
  setConfig
};