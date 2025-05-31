
# API Endpoint Documentation: Frolickering Flames (Xclouddrive)

**Version:** v1
**Base URL:** (Assuming local development) `http://localhost:2621`

## Table of Contents

1.  [General Information](#general-information)
    *   [Standard Response Format](#standard-response-format)
    *   [Authentication and Initialization](#authentication-and-initialization)
2.  [Status Endpoints](#status-endpoints)
    *   [GET /v1/status](#get-v1status)
    *   [POST /v1/initialize](#post-v1initialize)
3.  [Authentication Endpoints](#authentication-endpoints)
    *   [POST /v1/auth/authorize](#post-v1authauthorize)
4.  [Samba Service Management Endpoints](#samba-service-management-endpoints)
    *   [POST /v1/samba/routes/connect/\<id\>](#post-v1sambaroutesconnectid)
    *   [POST /v1/samba/routes/connect_all](#post-v1sambaroutesconnect_all)
    *   [POST /v1/samba/routes](#post-v1sambaroutes)
    *   [POST /v1/samba/routes/\<id\>](#post-v1sambaroutesid)
5.  [Samba File Operation Endpoints](#samba-file-operation-endpoints)
    *   [POST /v1/samba/files/dir](#post-v1sambafilesdir)
    *   [POST /v1/samba/files/delete](#post-v1sambafilesdelete)
    *   [POST /v1/samba/files/rename](#post-v1sambafilesrename)
    *   [POST /v1/samba/files/attrs](#post-v1sambafilesattrs)
    *   [POST /v1/samba/files/mkdir](#post-v1sambafilesmkdir)
    *   [POST /v1/samba/files/upload](#post-v1sambafilesupload)

---

## 1. General Information

### Standard Response Format

All API responses (unless otherwise specified) follow a standard JSON structure:

```json
{
  "status": "<boolean | string>", // Typically true for success, false for failure
  "data": "<any>" // Response data or error message
}
```

### Authentication and Initialization

Most endpoints require the application to be both initialized and the current session to be authorized.

1.  **Initialization Check:**
    *   If the database is not initialized, most endpoints will return:
        ```json
        {
          "status": false,
          "data": "Database not initialized"
        }
        ```
    *   Endpoints accessible without initialization: `/v1/initialize`, `/v1/status`.

2.  **Authorization Check:**
    *   If the session is not authorized, most endpoints will return:
        ```json
        {
          "status": false,
          "data": "Unauthorized access"
        }
        ```
    *   Endpoints accessible without authorization (but potentially requiring initialization): `/v1/auth/authorize`, `/v1/initialize`, `/v1/status`.

---

## 2. Status Endpoints

### GET /v1/status

Retrieves the current status of the API.

*   **Method:** `GET`
*   **Path:** `/v1/status`
*   **Request Body:** None
*   **Success Response (200 OK):**
    ```json
    {
      "status": true,
      "data": {
        "is_initialized": true, // boolean indicating if DataProvider.initialize() has been called
        "api_ver": "v1",
        "api_name": "frolickering_flames"
      }
    }
    ```
    or if not initialized:
    ```json
    {
      "status": true,
      "data": {
        "is_initialized": false,
        "api_ver": "v1",
        "api_name": "frolickering_flames"
      }
    }
    ```

### POST /v1/initialize

Initializes the application database with basic configuration. This endpoint can only be called if the database is not already initialized.

*   **Method:** `POST`
*   **Path:** `/v1/initialize`
*   **Request Body (JSON):**
    ```json
    {
      "title": "Xclouddrive", // Optional, string, default: "Xclouddrive"
      "description": "A simple multiple samba service management tool.", // Optional, string, default: "A simple multiple samba service management tool."
      "secret": "your_secret_password" // Required, string
    }
    ```
*   **Success Response (200 OK):**
    The code implies a successful initialization doesn't explicitly return a `makeResult` call. Flask will return an empty 200 OK response, or if we assume `dataProvider.DataProvider.initialize` is followed by a `makeResult(True, "Database initialized")`:
    ```json
    {
      "status": true,
      "data": "Database initialized" // Or null if no explicit return message is set
    }
    ```
*   **Error Responses:**
    *   If `secret` is not provided (400 Bad Request or as per `makeResult`):
        ```json
        {
          "status": false,
          "data": "Secret is required"
        }
        ```
    *   If already initialized, this endpoint might be blocked by application logic or lead to a database error. (The `checkIfInitialized` in `dataProvider.py` will prevent re-initialization based on `init.sql` table creation.)

---

## 3. Authentication Endpoints

### POST /v1/auth/authorize

Authorizes the current session by providing the master secret.

*   **Method:** `POST`
*   **Path:** `/v1/auth/authorize`
*   **Prerequisites:** Application must be initialized.
*   **Request Body (JSON):**
    ```json
    {
      "secret": "your_secret_password" // Required, string
    }
    ```
*   **Success Response (200 OK):**
    Sets `flask.session['authorized'] = True`.
    ```json
    {
      "status": true,
      "data": "Successfully authorized"
    }
    ```
*   **Error Responses:**
    *   If the secret is invalid (401 Unauthorized or as per `makeResult`):
        ```json
        {
          "status": false,
          "data": "Invalid secret"
        }
        ```
    *   If not initialized (as per `before_request`):
        ```json
        {
          "status": false,
          "data": "Database not initialized"
        }
        ```

---

## 4. Samba Service Management Endpoints

**Prerequisites for all endpoints in this section:** Application Initialized & Session Authorized.

### POST /v1/samba/routes/connect/\<id\>

Connects to a specific Samba service identified by its ID.

*   **Method:** `POST`
*   **Path:** `/v1/samba/routes/connect/<id>`
    *   `id` (integer): The ID of the Samba service to connect.
*   **Request Body:** None
*   **Success Response (200 OK):**
    ```json
    {
      "status": true,
      "data": "Samba service connected"
    }
    ```
*   **Error Responses:**
    *   If Samba service with the given ID is not found:
        ```json
        {
          "status": false,
          "data": "Samba service not found"
        }
        ```
    *   Other errors during connection will depend on the `sambaService.SambaConnectionManager`.

### POST /v1/samba/routes/connect_all

Connects to all configured Samba services.

*   **Method:** `POST`
*   **Path:** `/v1/samba/routes/connect_all`
*   **Request Body:** None
*   **Success Response (200 OK):**
    ```json
    {
      "status": true,
      "data": "All samba services connected"
    }
    ```
*   **Error Responses:** Errors during individual connections are handled internally and may not stop the process for other services. The overall response will be success if the loop completes.

### POST /v1/samba/routes

Retrieves a list of all configured Samba services.
*(Note: Conventionally, a GET request would be used for retrieving data.)*

*   **Method:** `POST`
*   **Path:** `/v1/samba/routes`
*   **Request Body:** None
*   **Success Response (200 OK):**
    Returns a direct list of Samba service objects.
    ```json
    [
      {
        "id": 1,
        "name": "Office NAS",
        "description": "Main office network attached storage",
        "service_name": "OFFICE-NAS", // e.g., NetBIOS name or IP
        "share_name": "documents",   // e.g., shared folder name
        "user_id": "nas_user",
        "password": "nas_password",  // Stored as configured in DB
        "use_ntlm_v2": true,         // boolean
        "is_direct_tcp": false       // boolean
      },
      // ... more samba services
    ]
    ```
*   **Error Responses:** Subject to general `before_request` checks.

### POST /v1/samba/routes/\<id\>

Retrieves details for a specific Samba service by its ID.
*(Note: Conventionally, a GET request would be used for retrieving data.)*

*   **Method:** `POST`
*   **Path:** `/v1/samba/routes/<id>`
    *   `id` (integer): The ID of the Samba service.
*   **Request Body:** None
*   **Success Response (200 OK):**
    Returns the direct Samba service object if found.
    ```json
    {
      "id": 1,
      "name": "Office NAS",
      "description": "Main office network attached storage",
      "service_name": "OFFICE-NAS",
      "share_name": "documents",
      "user_id": "nas_user",
      "password": "nas_password",
      "use_ntlm_v2": true,
      "is_direct_tcp": false
    }
    ```
*   **Error Responses:**
    *   If the Samba service is not found, `dataProvider.DataProvider.getSambaService(id)` returns `None`. Flask will return an empty body with a 200 OK status.
    *   Subject to general `before_request` checks.

---

## 5. Samba File Operation Endpoints

**Prerequisites for all endpoints in this section:** Application Initialized & Session Authorized.
For each operation, if the specified Samba service is not already connected, the API will attempt to connect it first.

### POST /v1/samba/files/dir

Lists the contents of a directory on a specified Samba share.

*   **Method:** `POST`
*   **Path:** `/v1/samba/files/dir`
*   **Request Body (JSON):**
    ```json
    {
      "path": "path/to/directory", // Optional, string, default: "" (root of the share)
      "samba_service_id": 1       // Required, integer
    }
    ```
*   **Success Response (200 OK):**
    Returns the direct output of `sambaConnectionManager.lsdir`. The exact format depends on the `sambaService.SambaConnectionManager.lsdir` implementation. Assuming it returns a list of file/folder information objects:
    ```json
    // Example structure, actual structure depends on sambaService.lsdir
    [
      { "name": "file1.txt", "is_dir": false, "size": 1024, "last_modified": "timestamp" },
      { "name": "subfolder", "is_dir": true, "size": 0, "last_modified": "timestamp" }
    ]
    ```
*   **Error Responses:**
    *   If Samba service ID is not found:
        ```json
        { "status": false, "data": "Samba service not found" }
        ```
    *   If `lsdir` operation fails (e.g., path not found, permissions error):
        ```json
        { "status": false, "data": "Error message from sambaService" }
        ```

### POST /v1/samba/files/delete

Deletes a file or directory on a specified Samba share.

*   **Method:** `POST`
*   **Path:** `/v1/samba/files/delete`
*   **Request Body (JSON):**
    ```json
    {
      "path": "path/to/file_or_directory_to_delete", // Required, string
      "samba_service_id": 1                          // Required, integer
    }
    ```
*   **Success Response (200 OK):**
    ```json
    { "status": true, "data": "File deleted" }
    ```
*   **Error Responses:**
    *   If Samba service ID is not found:
        ```json
        { "status": false, "data": "Samba service not found" }
        ```
    *   If delete operation fails:
        ```json
        { "status": false, "data": "Error message from sambaService" }
        ```

### POST /v1/samba/files/rename

Renames or moves a file or directory on a specified Samba share.

*   **Method:** `POST`
*   **Path:** `/v1/samba/files/rename`
*   **Request Body (JSON):**
    ```json
    {
      "old_path": "current/path/to/file_or_directory", // Required, string
      "new_path": "new/path/or_name",                // Required, string
      "samba_service_id": 1                          // Required, integer
    }
    ```
*   **Success Response (200 OK):**
    ```json
    { "status": true, "data": "File renamed" }
    ```
*   **Error Responses:**
    *   If Samba service ID is not found:
        ```json
        { "status": false, "data": "Samba service not found" }
        ```
    *   If rename operation fails:
        ```json
        { "status": false, "data": "Error message from sambaService" }
        ```

### POST /v1/samba/files/attrs

Retrieves attributes of a file or directory on a specified Samba share.

*   **Method:** `POST`
*   **Path:** `/v1/samba/files/attrs`
*   **Request Body (JSON):**
    ```json
    {
      "path": "path/to/file_or_directory", // Required, string
      "samba_service_id": 1                // Required, integer
    }
    ```
*   **Success Response (200 OK):**
    Returns the direct output of `sambaConnectionManager.attrs`. The exact format depends on the implementation.
    ```json
    // Example structure, actual structure depends on sambaService.attrs
    {
      "filename": "file1.txt",
      "file_size": 1024,
      "last_modified": 1678886400.0, // Unix timestamp or similar
      "is_directory": false,
      "is_readonly": false
      // ... other attributes
    }
    ```
*   **Error Responses:**
    *   If Samba service ID is not found:
        ```json
        { "status": false, "data": "Samba service not found" }
        ```
    *   If attrs operation fails:
        ```json
        { "status": false, "data": "Error message from sambaService" }
        ```

### POST /v1/samba/files/mkdir

Creates a new directory on a specified Samba share.

*   **Method:** `POST`
*   **Path:** `/v1/samba/files/mkdir`
*   **Request Body (JSON):**
    ```json
    {
      "path": "path/to/new_directory", // Required, string
      "samba_service_id": 1            // Required, integer
    }
    ```
*   **Success Response (200 OK):**
    ```json
    { "status": true, "data": "Directory created" }
    ```
*   **Error Responses:**
    *   If Samba service ID is not found:
        ```json
        { "status": false, "data": "Samba service not found" }
        ```
    *   If mkdir operation fails:
        ```json
        { "status": false, "data": "Error message from sambaService" }
        ```

### POST /v1/samba/files/upload

Uploads one or more files to a specified directory on a Samba share.
This endpoint uses a combination of query parameters, JSON body for path, and multipart/form-data for files.

*   **Method:** `POST`
*   **Path:** `/v1/samba/files/upload`
*   **Query Parameters:**
    *   `samba_service_id` (integer, required): The ID of the Samba service.
    *   `path` (string, optional): The path to the directory where the files should be uploaded. If not provided, the files will be uploaded to the root of the share.
      Example: `/v1/samba/files/upload?samba_service_id=1&path=path/to/directory`

*   **Success Response (200 OK):**
    ```json
    { "status": true, "data": "File uploaded" } // This is returned after all files in the request are processed.
    ```
*   **Error Responses:**
    *   If `samba_service_id` (from query parameter) is not provided or invalid, `getSambaService` will return `None`:
        ```json
        { "status": false, "data": "Samba service not found" }
        ```
    *   If `path` is not provided:
        ```json
        { "status": false, "data": "Path is required" }
        ```
    *   If `path` is invalid:
        ```json
        { "status": false, "data": "Invalid path" }
        ```