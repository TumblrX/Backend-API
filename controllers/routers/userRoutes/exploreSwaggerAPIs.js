/* eslint-disable max-len */
/**
* @swagger
* paths:
*   /api/user/explore/{startIndex}/trending:
*     get:
*       tags: [Explore]
*       summary: trending
*       parameters:
*         - name: Authorization
*           in: header
*           schema:
*             type: string
*           example: >-
*             eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTk5NjM5Mjc0MmYxMjRkZTAzOTdiZmYiLCJwcmltYXJ5QmxvZyI6IjYxOTk2MzkyNzQyZjEyNGRlMDM5N2MwMiIsImlhdCI6MTYzODk5Nzc0NH0.DdYJclrwxm39rxo0Bz6m7PuPaCh4SRlR6Y6dc9taAX0
*         - name: startIndex
*           in: path
*           schema:
*             type: string
*           required: true
*           example: 0
*       responses:
*         200:
*          $ref: '#/components/responses/200OKPost'
*         500:
*          $ref: '#/components/responses/500ServerError'
*   /api/user/explore/{startIndex}/for-you:
*     get:
*       tags: [Explore]
*       summary: for-you
*       parameters:
*         - name: Authorization
*           in: header
*           schema:
*             type: string
*           example: >-
*             eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMyNjQ4YTZiODI3YTdlMTQ0NDcwNzIiLCJwcmltYXJ5QmxvZyI6IjYxYzI2NDhhNmI4MjdhN2UxNDQ0NzA3NSIsImlhdCI6MTY0MDg2NDU2OH0.xIvbvLADteqRa7MrUM87w9TDSlLS5Keg7yKlnojV6Vs
*         - name: startIndex
*           in: path
*           schema:
*             type: string
*           required: true
*           example: 0
*       responses:
*         200:
*          $ref: '#/components/responses/200OKPost'
*         500:
*          $ref: '#/components/responses/500ServerError'
*   /api/user/explore/{startIndex}/text:
*     get:
*       tags: [Explore]
*       summary: explore-text
*       parameters:
*         - name: Authorization
*           in: header
*           schema:
*             type: string
*           example: >-
*             eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMyNjQ4YTZiODI3YTdlMTQ0NDcwNzIiLCJwcmltYXJ5QmxvZyI6IjYxYzI2NDhhNmI4MjdhN2UxNDQ0NzA3NSIsImlhdCI6MTY0MDg2NDU2OH0.xIvbvLADteqRa7MrUM87w9TDSlLS5Keg7yKlnojV6Vs
*         - name: startIndex
*           in: path
*           schema:
*             type: string
*           required: true
*           example: 0
*       responses:
*         200:
*          $ref: '#/components/responses/200OKPost'
*         500:
*          $ref: '#/components/responses/500ServerError'
*   /api/user/explore/{startIndex}/video:
*     get:
*       tags: [Explore]
*       summary: explore-video
*       parameters:
*         - name: Authorization
*           in: header
*           schema:
*             type: string
*           example: >-
*             eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMyNjQ4YTZiODI3YTdlMTQ0NDcwNzIiLCJwcmltYXJ5QmxvZyI6IjYxYzI2NDhhNmI4MjdhN2UxNDQ0NzA3NSIsImlhdCI6MTY0MDg2NDU2OH0.xIvbvLADteqRa7MrUM87w9TDSlLS5Keg7yKlnojV6Vs
*         - name: startIndex
*           in: path
*           schema:
*             type: string
*           required: true
*           example: 0
*       responses:
*         200:
*          $ref: '#/components/responses/200OKPost'
*         500:
*          $ref: '#/components/responses/500ServerError'
*   /api/user/explore/{startIndex}/audio:
*     get:
*       tags: [Explore]
*       summary: explore-audio
*       parameters:
*         - name: Authorization
*           in: header
*           schema:
*             type: string
*           example: >-
*             eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMyNjQ4YTZiODI3YTdlMTQ0NDcwNzIiLCJwcmltYXJ5QmxvZyI6IjYxYzI2NDhhNmI4MjdhN2UxNDQ0NzA3NSIsImlhdCI6MTY0MDg2NDU2OH0.xIvbvLADteqRa7MrUM87w9TDSlLS5Keg7yKlnojV6Vs
*         - name: startIndex
*           in: path
*           schema:
*             type: string
*           required: true
*           example: 0
*       responses:
*         200:
*          $ref: '#/components/responses/200OKPost'
*         500:
*          $ref: '#/components/responses/500ServerError'
*   /api/user/explore/{startIndex}/ask:
*     get:
*       tags: [Explore]
*       summary: explore-ask
*       parameters:
*         - name: Authorization
*           in: header
*           schema:
*             type: string
*           example: >-
*             eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMyNjQ4YTZiODI3YTdlMTQ0NDcwNzIiLCJwcmltYXJ5QmxvZyI6IjYxYzI2NDhhNmI4MjdhN2UxNDQ0NzA3NSIsImlhdCI6MTY0MDg2NDU2OH0.xIvbvLADteqRa7MrUM87w9TDSlLS5Keg7yKlnojV6Vs
*         - name: startIndex
*           in: path
*           schema:
*             type: string
*           required: true
*           example: 0
*       responses:
*         200:
*          $ref: '#/components/responses/200OKPost'
*         500:
*          $ref: '#/components/responses/500ServerError'
*   /api/user/explore/{startIndex}/image:
*     get:
*       tags: [Explore]
*       summary: explore-image
*       parameters:
*         - name: Authorization
*           in: header
*           schema:
*             type: string
*           example: >-
*             eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWMyNjQ4YTZiODI3YTdlMTQ0NDcwNzIiLCJwcmltYXJ5QmxvZyI6IjYxYzI2NDhhNmI4MjdhN2UxNDQ0NzA3NSIsImlhdCI6MTY0MDg2NDU2OH0.xIvbvLADteqRa7MrUM87w9TDSlLS5Keg7yKlnojV6Vs
*         - name: startIndex
*           in: path
*           schema:
*             type: string
*           required: true
*           example: 0
*       responses:
*         200:
*          $ref: '#/components/responses/200OKPost'
*         500:
*          $ref: '#/components/responses/500ServerError'
*/
